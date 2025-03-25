import React, { useState, useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./sent.css";

const Sent = () => {
  const navigate = useNavigate();
  const [sentEmails, setSentEmails] = useState(null);
  const [selectedSentEmail, setSelectedSentEmail] = useState(null);
  const [currentSentEmailIndex, setCurrentSentEmailIndex] = useState(0);
  const recognitionRef = useRef(null);
  const abortControllerRef = useRef(null);
  const phaseRef = useRef("main");

  const formatDate = (rawDate) => {
    if (!rawDate) return "Unknown Date";
    const parts = rawDate.split(" ");
    if (parts.length > 5) {
      parts.pop();
    }
    return parts.join(" ");
  };

  const speak = (text, onEnd) => {
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
    return utterance;
  };

  const speakLongContent = (text, onEnd) => {
    stopSpeech();
    const maxLength = 200;
    const chunks = [];
    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.slice(i, i + maxLength));
    }
    console.log(`Speaking ${chunks.length} chunks for content length ${text.length}`);

    let currentChunk = 0;
    const speakNextChunk = () => {
      if (currentChunk >= chunks.length) {
        console.log("All chunks spoken, calling onEnd");
        if (onEnd) onEnd();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
      utterance.lang = "en-US";
      utterance.onend = () => {
        console.log(`Chunk ${currentChunk + 1}/${chunks.length} completed`);
        currentChunk++;
        speakNextChunk();
      };
      utterance.onerror = (event) => {
        console.error(`Speech error on chunk ${currentChunk}:`, event.error);
        if (event.error === "interrupted" || event.error === "canceled") {
          speakNextChunk();
        }
      };
      console.log(`Speaking chunk ${currentChunk + 1}/${chunks.length}: ${chunks[currentChunk].substring(0, 30)}...`);
      window.speechSynthesis.speak(utterance);
    };

    speakNextChunk();
  };

  const startRecognition = (onResult) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported.");
      speak("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
        .toLowerCase()
        .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        .trim();
      console.log(`Recognized in ${phaseRef.current} phase: ${transcript}`);
      onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      speak("Sorry, I couldn't understand. Please try again.", () => startRecognition(onResult));
    };

    recognition.onend = () => {
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  const fetchSentEmails = async () => {
    try {
      const response = await fetch("http://localhost:5001/get-sent-emails");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      console.log("Fetched emails:", data);
  
      const mappedEmails = data.map((email) => ({
        id: email.id,
        to: email.to || "Unknown Recipient", // Fallback for missing 'to'
        subject: email.subject || "No Subject",
        preview: email.content ? email.content.slice(0, 100) + "..." : "No content...",
        content: email.content || "No content available",
        date: email.date,
        read: true,
      }));
  
      setSentEmails(mappedEmails);
      return mappedEmails;
    } catch (error) {
      console.error("Error fetching sent emails:", error);
      setSentEmails([]);
      return [];
    }
  };

  const handleSentEmailCommands = (command, emailList, index) => {
    switch (command) {
      case "read":
        phaseRef.current = "content";
        setSelectedSentEmail(emailList[index]);
        speakLongContent(emailList[index].content, () => {
          speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () =>
            startRecognition((cmd) => handleSentContentCommands(cmd, emailList[index], emailList, index))
          );
        });
        break;
      case "next":
        readSentEmail(emailList, index + 1);
        break;
      case "stop":
        phaseRef.current = "main";
        speak("Returning to main menu.", () => startRecognition(handleMainSentCommands));
        break;
      default:
        speak("Command not recognized. Say 'read', 'next', or 'stop'.", () =>
          startRecognition((cmd) => handleSentEmailCommands(cmd, emailList, index))
        );
    }
  };

  const handleSentContentCommands = (command, email, emailList, index) => {
    switch (command) {
      case "next":
        phaseRef.current = "reading";
        readSentEmail(emailList, index + 1);
        break;
      case "back":
        phaseRef.current = "reading";
        readSentEmail(emailList, index);
        break;
      case "repeat":
        speakLongContent(email.content, () => {
          speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () =>
            startRecognition((cmd) => handleSentContentCommands(cmd, email, emailList, index))
          );
        });
        break;
      default:
        speak("Command not recognized. Say 'next', 'back', or 'repeat'.", () =>
          startRecognition((cmd) => handleSentContentCommands(cmd, email, emailList, index))
        );
    }
  };

  const readSentEmail = (emailList, index) => {
    if (index >= emailList.length) {
      speak("No more emails to read. Returning to main menu.", () => {
        phaseRef.current = "main";
        startRecognition(handleMainSentCommands);
      });
      return;
    }

    const email = emailList[index];
    setCurrentSentEmailIndex(index);
    const text = `Subject: ${email.subject}. To: ${email.to}. Say 'read' to hear the full content, 'next' for the next email, or 'stop' to return to main commands.`;
    speak(text, () => startRecognition((command) => handleSentEmailCommands(command, emailList, index)));
  };

  useEffect(() => {
    const initialize = () => {
      const welcomeMessage = "Welcome to InVision Sent Emails. Available commands: 'go to sent', 'menu', 'logout', or 'help' for command list.";
      speak(welcomeMessage, () => {
        phaseRef.current = "main";
        startRecognition(handleMainSentCommands);
      });
    };
    initialize();

    return () => stopSpeech();
  }, []);

  const handleMainSentCommands = (command) => {
    const normalizedCommand = command.toLowerCase().replace(/\s+/g, " ").trim();
    console.log("Normalized command:", normalizedCommand);
    const includesAny = (str, terms) => terms.some((term) => str.includes(term));

    switch (true) {
      case includesAny(normalizedCommand, ["go to sent", "go to send"]):
        phaseRef.current = "reading";
        fetchSentEmails()
          .then((fetchedEmails) => {
            if (fetchedEmails && fetchedEmails.length > 0) {
              readSentEmail(fetchedEmails, 0);
            } else {
              speak("No emails found in sent. Returning to main menu.", () => {
                phaseRef.current = "main";
                startRecognition(handleMainSentCommands);
              });
            }
          })
          .catch(() => {
            speak("Error fetching sent emails. Returning to main menu.", () => {
              phaseRef.current = "main";
              startRecognition(handleMainSentCommands);
            });
          });
        break;
      case normalizedCommand === "menu":
        stopSpeech();
        speak("Navigating to menu.", () => navigate("/menu"));
        break;
      case includesAny(normalizedCommand, ["logout", "log out", "sign out", "signout"]):
        stopSpeech();
        speak("Logging out.", () => {
          localStorage.removeItem("authToken");
          navigate("/");
        });
        break;
      case normalizedCommand === "help":
        speak(
          "Available commands: 'go to sent', 'menu', 'logout'",
          () => startRecognition(handleMainSentCommands)
        );
        break;
      default:
        speak("Command not recognized. Say 'help' for options.", () => startRecognition(handleMainSentCommands));
    }
  };

  const getInitial = (name) => {
    if (!name || typeof name !== "string") return "?"; // Fallback for undefined/null/non-string
    const namePart = name.split("<")[0].trim();
    return namePart.charAt(0).toUpperCase();
  };

  return (
    <div className="sent-app">
      <div className="sent-navbar">
        <span className="sent-logo">InVision</span>
        <button className="sent-logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </div>
      <div className="sent-main-content">
        <div className="sent-sidebar">
          <button className="sent-nav-btn active" onClick={() => fetchSentEmails()}>
            <Mail size={16} /> Sent
          </button>
        </div>
        <div className="sent-email-list">
          <ul>
            {sentEmails && sentEmails.length > 0 ? (
              sentEmails.map((email) => (
                <li
                  key={email.id}
                  className={`sent-email-item ${email.read ? "read" : "unread"} ${
                    selectedSentEmail?.id === email.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSentEmail(email)}
                >
                  <div className="sent-email-header">
                    <div className="sent-email-recipient-wrapper">
                      <span className="sent-email-initial">{getInitial(email.to)}</span>
                      <span className="sent-email-recipient">{email.to}</span>
                    </div>
                    <span className="sent-email-date">{email.date}</span>
                  </div>
                  <div className="sent-email-subject">{email.subject}</div>
                  <div className="sent-email-preview">{email.preview}</div>
                </li>
              ))
            ) : (
              <li className="sent-email-item">No emails loaded yet</li>
            )}
          </ul>
        </div>
        <div className="sent-email-content">
          {selectedSentEmail ? (
            <div className="sent-email-detail">
              <div className="sent-email-detail-header">
                <h2 className="sent-email-detail-subject">{selectedSentEmail.subject}</h2>
                <span className="sent-email-detail-date">{selectedSentEmail.date}</span>
              </div>
              <p>
                <strong>To:</strong> {selectedSentEmail.to}
              </p>
              <div className="sent-email-detail-content">
                {selectedSentEmail.content.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          ) : (
            <p className="sent-empty-state">Select an email to view its contents</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sent;