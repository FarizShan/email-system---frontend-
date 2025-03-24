// import React from "react";
// import { Link } from "react-router-dom";
// import { Inbox, Send, AlertOctagon, Trash } from "lucide-react";
// import "./menu.css";

// export default function MenuPage() {
//   return (
//     <div className="menu-container">
//       {/* Header */}
//       <header className="menu-header">
//         <span className="menu-logo">InVision</span>
//         <Link to="/logout" className="menu-logout">Logout</Link>
//       </header>

//       {/* Main Content */}
//       <main className="menu-main">
//         <h1 className="menu-title">MENU PAGE</h1>
//         <p className="menu-subtitle">What would you like to do?</p>

//         {/* Buttons */}
//         <div className="menu-buttons">
//           <Link to="/inbox" className="menu-btn">
//             <Inbox className="icon" /> Inbox
//           </Link>
//           <Link to="/compose" className="menu-btn">
//             <Send className="icon" /> Compose
//           </Link>
//           <Link to="/spam" className="menu-btn">
//             <AlertOctagon className="icon" /> Spam
//           </Link>
//           <Link to="/trash" className="menu-btn">
//             <Trash className="icon" /> Trash
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }




// old working code 

  // import React from "react";
  // import { Link, useNavigate } from "react-router-dom";
  // import { Inbox, Send, AlertOctagon, Trash } from "lucide-react";
  // import "./menu.css";

  // export default function MenuPage() {
  //   const navigate = useNavigate(); // Initialize useNavigate for routing

  //   const handleLogout = () => {
  //     // Perform any necessary logout logic here, such as clearing session or authentication data
  //     navigate("/"); // Redirect to login page
  //   };

  //   return (
  //     <div className="menu-container">
  //       {/* Header */}
  //       <header className="menu-header">
  //         <span className="menu-logo">InVision</span>
  //         <button onClick={handleLogout} className="menu-logout">
  //           Logout
  //         </button>
  //       </header>

  //       {/* Main Content */}
  //       <main className="menu-main">
  //         <h1 className="menu-title">MENU PAGE</h1>
  //         <p className="menu-subtitle">What would you like to do?</p>

  //         {/* Buttons */}
  //         <div className="menu-buttons">
  //           <Link to="/inbox" className="menu-btn">
  //             <Inbox className="icon" /> Inbox
  //           </Link>
  //           <Link to="/compose" className="menu-btn">
  //             <Send className="icon" /> Compose
  //           </Link>
  //           <Link to="/spam" className="menu-btn">
  //             <AlertOctagon className="icon" /> Spam
  //           </Link>
  //           <Link to="/trash" className="menu-btn">
  //             <Trash className="icon" /> Trash
  //           </Link>
  //         </div>
  //       </main>
  //     </div>
  //   );
  // } 


//latest code before integrating voice

// import { Inbox, Send, AlertOctagon, Trash, Mail, Bell } from "lucide-react"
// import { Link, useNavigate } from "react-router-dom";
// import "./menu.css"

// export default function MenuPage() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Add actual logout logic here (e.g., clear tokens, session)
//     localStorage.removeItem('authToken') // Example token removal
//     navigate("/"); // Redirect to login page
//   }

//   return (
//     <div className="menu-container">
//       <header className="app-header">
//         <div className="header-content">
//           <div className="brand-wrapper">
//             <Mail className="brand-icon" />
//             <span className="brand-name">InVision</span>
//           </div>
//           <div className="header-controls">
//             <Bell className="notifications-icon" />
//             <button 
//               onClick={handleLogout}
//               className="logout-button"
//               aria-label="Log out of account"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="content-wrapper">
//           <h1 className="main-title">Welcome to InVision Mail</h1>
//           <p className="menu-subtitle">What would you like to do?</p>

//           <div className="menu-grid">
//             <Link to="/inbox" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Inbox className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Inbox</h2>
//                 </div>
//                 <p className="card-description">View and manage your incoming messages</p>
//               </div>
//             </Link>

//             <Link to="/compose" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Send className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Compose</h2>
//                 </div>
//                 <p className="card-description">Create and send new messages</p>
//               </div>
//             </Link>

//             <Link to="/spam" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <AlertOctagon className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Spam</h2>
//                 </div>
//                 <p className="card-description">Review filtered spam messages</p>
//               </div>
//             </Link>

//             <Link to="/trash" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Trash className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Trash</h2>
//                 </div>
//                 <p className="card-description">Manage deleted messages</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }


//wroking code latest

// import { useEffect } from 'react';
// import { Inbox, Send, AlertOctagon, Trash, Mail, Bell } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import "./menu.css";

// export default function MenuPage() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Remove token as an example
//     navigate("/"); // Redirect to login page
//   };

//   useEffect(() => {
//     // Check for browser support and speak the available options once the page loads
//     if ('speechSynthesis' in window) {
//       const message = "Welcome to InVision Mail. Your available options are Inbox, Compose, Spam, and Trash. Please choose one.";
//       const utterance = new SpeechSynthesisUtterance(message);
//       // Optional: adjust utterance properties like rate, pitch, and language
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.lang = 'en-US';
//       window.speechSynthesis.speak(utterance);
//     } else {
//       console.warn("Speech synthesis is not supported on this browser.");
//     }

//     return () => {
//       if ('speechSynthesis' in window) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   return (
//     <div className="menu-container">
//       <header className="app-header">
//         <div className="header-content">
//           <div className="brand-wrapper">
//             <Mail className="brand-icon" />
//             <span className="brand-name">InVision</span>
//           </div>
//           <div className="header-controls">
//             <Bell className="notifications-icon" />
//             <button 
//               onClick={handleLogout}
//               className="logout-button"
//               aria-label="Log out of account"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="content-wrapper">
//           <h1 className="main-title">Welcome to InVision Mail</h1>
//           <p className="menu-subtitle">What would you like to do?</p>

//           <div className="menu-grid">
//             <Link to="/inbox" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Inbox className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Inbox</h2>
//                 </div>
//                 <p className="card-description">View and manage your incoming messages</p>
//               </div>
//             </Link>

//             <Link to="/compose" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Send className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Compose</h2>
//                 </div>
//                 <p className="card-description">Create and send new messages</p>
//               </div>
//             </Link>

//             <Link to="/spam" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <AlertOctagon className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Spam</h2>
//                 </div>
//                 <p className="card-description">Review filtered spam messages</p>
//               </div>
//             </Link>

//             <Link to="/trash" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Trash className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Trash</h2>
//                 </div>
//                 <p className="card-description">Manage deleted messages</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { Inbox, Send, AlertOctagon, Trash, Mail, Bell } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import "./menu.css";

// export default function MenuPage() {
//   const navigate = useNavigate();
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate("/");
//   };

//   useEffect(() => {
//     if ('speechSynthesis' in window) {
//       const message = "Welcome to InVision Mail. For best results, speak clearly in a quiet place. Your options are Inbox, Compose, Spam, and Trash. Say one now.";
//       const utterance = new SpeechSynthesisUtterance(message);
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.lang = 'en-US';
//       utterance.onend = () => {
//         startListening();
//       };
//       window.speechSynthesis.speak(utterance);
//     } else {
//       console.warn("Speech synthesis not supported.");
//       startListening();
//     }

//     return () => {
//       if ('speechSynthesis' in window) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   const startListening = () => {
//     if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       setTranscript("Speech recognition not supported in this browser. Try Chrome.");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
//     recognition.continuous = true;

//     // Define grammar with possible keywords
//     const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
//     if (SpeechGrammarList) {
//       const grammar = '#JSGF V1.0; grammar commands; public <command> = inbox | compose | spam | trash ;';
//       const speechRecognitionList = new SpeechGrammarList();
//       speechRecognitionList.addFromString(grammar, 1);
//       recognition.grammars = speechRecognitionList;
//     } else {
//       console.warn("SpeechGrammarList not supported.");
//     }

//     recognition.onstart = () => {
//       setIsListening(true);
//       setTranscript("Listening for your command...");
//       setTimeout(() => recognition.stop(), 5000); // 5-second window
//     };
//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript.toLowerCase().trim();
//       setTranscript(text);
//       handleVoiceCommand(text);
//     };
//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       switch (event.error) {
//         case 'no-speech':
//           setTranscript("No speech detected.");
//           promptRepeat();
//           break;
//         case 'audio-capture':
//           setTranscript("Microphone issue. Check your audio input.");
//           break;
//         case 'permission-denied':
//           setTranscript("Microphone access denied. Please allow it.");
//           break;
//         case 'not-allowed':
//           setTranscript("Permission not granted. Check browser settings.");
//           break;
//         case 'network':
//           setTranscript("Network error. Check your connection and refresh.");
//           break;
//         default:
//           setTranscript(`Error: ${event.error}. Try refreshing.`);
//       }
//       setIsListening(false);
//     };
//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     try {
//       recognition.start();
//     } catch (error) {
//       console.error("Failed to start recognition:", error);
//       setTranscript("Failed to start. Check permissions or refresh.");
//       setIsListening(false);
//     }
//   };

//   const promptRepeat = () => {
//     if ('speechSynthesis' in window) {
//       const repeatMessage = "Command not recognized. Please try again with Inbox, Compose, Spam, or Trash.";
//       const utterance = new SpeechSynthesisUtterance(repeatMessage);
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.lang = 'en-US';
//       utterance.onend = () => {
//         startListening(); // Restart STT after TTS
//       };
//       window.speechSynthesis.speak(utterance);
//     } else {
//       setTranscript("Command not recognized. Try again.");
//       setTimeout(() => startListening(), 1000); // Fallback delay
//     }
//   };

//   const handleVoiceCommand = (text) => {
//     const commands = {
//       "inbox": "/inbox",
//       "compose": "/compose",
//       "spam": "/spam",
//       "trash": "/trash",
//     };
//     const matchedCommand = Object.keys(commands).find((cmd) => text.includes(cmd));
//     if (matchedCommand) {
//       navigate(commands[matchedCommand]);
//       setTranscript(`Navigating to ${matchedCommand}`);
//     } else {
//       setTranscript("Processing...");
//       promptRepeat(); // Ask user to repeat if no match
//     }
//   };

//   return (
//     <div className="menu-container">
//       <header className="app-header">
//         <div className="header-content">
//           <div className="brand-wrapper">
//             <Mail className="brand-icon" />
//             <span className="brand-name">InVision</span>
//           </div>
//           <div className="header-controls">
//             <Bell className="notifications-icon" />
//             <button onClick={handleLogout} className="logout-button" aria-label="Log out">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="content-wrapper">
//           <h1 className="main-title">Welcome to InVision Mail</h1>
//           <p className="menu-subtitle">What would you like to do?</p>
//           <p id="result">{transcript}</p>

//           <div className="menu-grid">
//             <Link to="/inbox" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Inbox className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Inbox</h2>
//                 </div>
//                 <p className="card-description">View and manage your incoming messages</p>
//               </div>
//             </Link>

//             <Link to="/compose" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Send className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Compose</h2>
//                 </div>
//                 <p className="card-description">Create and send new messages</p>
//               </div>
//             </Link>

//             <Link to="/spam" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <AlertOctagon className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Spam</h2>
//                 </div>
//                 <p className="card-description">Review filtered spam messages</p>
//               </div>
//             </Link>

//             <Link to="/trash" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Trash className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Trash</h2>
//                 </div>
//                 <p className="card-description">Manage deleted messages</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


//working code

// import { useEffect, useRef } from 'react';
// import { Inbox, Send, AlertOctagon, Trash, Mail, Bell } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import "./menu.css";

// export default function MenuPage() {
//   const navigate = useNavigate();
//   const recognitionRef = useRef(null);
//   const transcriptRef = useRef(""); // Use ref to avoid re-renders
//   const isDoneRef = useRef(false); // Single flag to stop everything

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate("/");
//   };

//   useEffect(() => {
//     console.log("useEffect: Starting TTS/STT sequence");
//     if (isDoneRef.current) {
//       console.log("useEffect: Blocked, isDone true");
//       return;
//     }

//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance("Welcome to InVision Mail. Say Inbox, Compose, Spam, or Trash when ready.");
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.lang = 'en-US';
//       utterance.onend = () => {
//         console.log("TTS: Welcome ended, starting STT");
//         startListening();
//       };
//       console.log("TTS: Starting welcome");
//       window.speechSynthesis.speak(utterance);
//     } else {
//       console.warn("TTS: Not supported");
//       startListening();
//     }

//     return () => {
//       console.log("useEffect: Cleaning up");
//       if ('speechSynthesis' in window) {
//         window.speechSynthesis.cancel();
//         console.log("TTS: Canceled in cleanup");
//       }
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//         recognitionRef.current = null;
//         console.log("STT: Aborted in cleanup");
//       }
//     };
//   }, []); // Run once on mount, no dependencies

//   const startListening = () => {
//     if (isDoneRef.current) {
//       console.log("STT: Blocked, isDone true");
//       return;
//     }

//     if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       transcriptRef.current = "Speech recognition not supported. Try Chrome or Brave.";
//       updateTranscript();
//       console.log("STT: Not supported");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
//     recognition.continuous = false;

//     recognition.onstart = () => {
//       transcriptRef.current = "Listening for your command...";
//       updateTranscript();
//       console.log("STT: Started");
//       setTimeout(() => {
//         recognition.stop();
//         console.log("STT: Timeout triggered");
//       }, 5000);
//     };

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript.toLowerCase().trim();
//       transcriptRef.current = text;
//       updateTranscript();
//       console.log("STT: Result:", text);
//       recognition.stop();
//       handleVoiceCommand(text);
//     };

//     recognition.onerror = (event) => {
//       console.error("STT: Error:", event.error);
//       if (isDoneRef.current) {
//         console.log("STT: Ignoring error post-navigation");
//         return;
//       }
//       if (event.error === 'no-speech') {
//         promptRepeat();
//       } else {
//         transcriptRef.current = `Error: ${event.error}. Try refreshing.`;
//         updateTranscript();
//       }
//     };

//     recognition.onend = () => {
//       console.log("STT: Ended");
//       if (!isDoneRef.current) {
//         promptRepeat();
//       }
//     };

//     try {
//       recognition.start();
//     } catch (error) {
//       console.error("STT: Failed to start:", error);
//       transcriptRef.current = "Failed to start. Check permissions.";
//       updateTranscript();
//     }
//   };

//   const promptRepeat = () => {
//     if (isDoneRef.current) {
//       console.log("TTS: Blocked repeat, isDone true");
//       return;
//     }
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance("Command not recognized. Please try again with Inbox, Compose, Spam, or Trash.");
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.lang = 'en-US';
//       utterance.onend = () => {
//         console.log("TTS: Repeat ended, restarting STT");
//         startListening();
//       };
//       transcriptRef.current = "No speech detected.";
//       updateTranscript();
//       console.log("TTS: Prompting repeat");
//       window.speechSynthesis.speak(utterance);
//     } else {
//       transcriptRef.current = "Command not recognized. Try again.";
//       updateTranscript();
//       setTimeout(() => startListening(), 1000);
//     }
//   };

//   const handleVoiceCommand = (text) => {
//     const commands = {
//       "inbox": "/inbox",
//       "compose": "/compose",
//       "spam": "/spam",
//       "trash": "/trash",
//     };
//     const matchedCommand = Object.keys(commands).find((cmd) => text.includes(cmd));
//     if (matchedCommand) {
//       isDoneRef.current = true;
//       console.log("Command: Recognized:", matchedCommand);
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//         recognitionRef.current = null;
//         console.log("STT: Aborted after command");
//       }
//       if ('speechSynthesis' in window) {
//         window.speechSynthesis.cancel();
//         console.log("TTS: Canceled before navigation");
//       }
//       transcriptRef.current = `Navigating to ${matchedCommand}`;
//       updateTranscript();
//       navigate(commands[matchedCommand]);
//       console.log("Command: Navigated to:", commands[matchedCommand]);
//     } else {
//       transcriptRef.current = "Processing...";
//       updateTranscript();
//       promptRepeat();
//     }
//   };

//   const updateTranscript = () => {
//     const resultElement = document.getElementById("result");
//     if (resultElement) {
//       resultElement.textContent = transcriptRef.current;
//     }
//   };

//   return (
//     <div className="menu-container">
//       <header className="app-header">
//         <div className="header-content">
//           <div className="brand-wrapper">
//             <Mail className="brand-icon" />
//             <span className="brand-name">InVision</span>
//           </div>
//           <div className="header-controls">
//             <Bell className="notifications-icon" />
//             <button onClick={handleLogout} className="logout-button" aria-label="Log out">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="content-wrapper">
//           <h1 className="main-title">Welcome to InVision Mail</h1>
//           <p className="menu-subtitle">What would you like to do?</p>
//           <p id="result">{transcriptRef.current}</p>

//           <div className="menu-grid">
//             <Link to="/inbox" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Inbox className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Inbox</h2>
//                 </div>
//                 <p className="card-description">View and manage your incoming messages</p>
//               </div>
//             </Link>

//             <Link to="/compose" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Send className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Compose</h2>
//                 </div>
//                 <p className="card-description">Create and send new messages</p>
//               </div>
//             </Link>

//             <Link to="/spam" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <AlertOctagon className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Spam</h2>
//                 </div>
//                 <p className="card-description">Review filtered spam messages</p>
//               </div>
//             </Link>

//             <Link to="/trash" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Trash className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Trash</h2>
//                 </div>
//                 <p className="card-description">Manage deleted messages</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


// import { useEffect, useRef, useState, useCallback } from 'react';
// import { Inbox, Send, AlertOctagon, Trash, Mail, Bell } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import "./menu.css";

// export default function MenuPage() {
//   const navigate = useNavigate();
//   const recognitionRef = useRef(null);
//   const transcriptRef = useRef("");
//   const isDoneRef = useRef(false);
//   const mountedRef = useRef(false);
//   const [permissionError, setPermissionError] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate("/");
//   };

//   const checkMicPermissionAndStart = useCallback(async () => {
//     if (!mountedRef.current) {
//       console.log("STT: Skipped permission check, component unmounted");
//       return;
//     }
//     try {
//       console.log("Checking microphone permissions...");
//       const permissionStatus = await navigator.permissions.query({ name: "microphone" });
//       console.log("Mic permission status:", permissionStatus.state);
//       if (permissionStatus.state === "denied") {
//         setPermissionError("Microphone access denied. Please allow it in browser settings.");
//         speak("Microphone access denied. Please allow it in your browser settings.");
//       } else if (permissionStatus.state === "prompt" || permissionStatus.state === "granted") {
//         startListening();
//       }
//     } catch (err) {
//       console.error("Permission check error:", err);
//       setPermissionError("Error checking microphone permissions.");
//     }
//   }, []);

//   useEffect(() => {
//     console.log("useEffect: Starting TTS/STT sequence");
//     if (isDoneRef.current) return;

//     mountedRef.current = true;

//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance("Welcome to InVision Mail. Say Inbox, Compose, Spam, or Trash when ready.");
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.lang = 'en-US';
//       utterance.onend = () => {
//         if (!mountedRef.current) {
//           console.log("TTS: onend skipped, component unmounted");
//           return;
//         }
//         console.log("TTS: Welcome ended, starting STT");
//         checkMicPermissionAndStart();
//       };
//       console.log("TTS: Starting welcome");
//       window.speechSynthesis.speak(utterance);
//     } else {
//       console.warn("TTS: Not supported");
//       checkMicPermissionAndStart();
//     }

//     return () => {
//       console.log("useEffect: Cleaning up");
//       mountedRef.current = false;
//       window.speechSynthesis.cancel();
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//         recognitionRef.current = null;
//         console.log("STT: Aborted in cleanup");
//       }
//     };
//   }, [checkMicPermissionAndStart]);

//   const startListening = () => {
//     if (isDoneRef.current || !mountedRef.current) {
//       console.log("STT: Blocked, isDone or unmounted");
//       return;
//     }

//     if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       transcriptRef.current = "Speech recognition not supported. Try Chrome or Brave.";
//       updateTranscript();
//       console.log("STT: Not supported");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
//     recognition.continuous = false;

//     recognition.onstart = () => {
//       transcriptRef.current = "Listening for your command...";
//       updateTranscript();
//       console.log("STT: Started");
//       setTimeout(() => {
//         recognition.stop();
//         console.log("STT: Timeout triggered");
//       }, 5000);
//     };

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript.toLowerCase().trim();
//       transcriptRef.current = text;
//       updateTranscript();
//       console.log("STT: Result:", text);
//       recognition.stop();
//       handleVoiceCommand(text);
//     };

//     recognition.onerror = (event) => {
//       console.error("STT: Error:", event.error);
//       if (isDoneRef.current || !mountedRef.current) return;
//       if (event.error === 'no-speech') {
//         promptRepeat();
//       } else if (event.error === 'not-allowed') {
//         setPermissionError("Microphone access denied. Check permissions.");
//         speak("Microphone access denied. Please check permissions.");
//       } else {
//         transcriptRef.current = `Error: ${event.error}. Try refreshing.`;
//         updateTranscript();
//       }
//     };

//     recognition.onend = () => {
//       console.log("STT: Ended");
//       if (!isDoneRef.current && mountedRef.current) promptRepeat();
//     };

//     try {
//       console.log("STT: Attempting to start...");
//       recognition.start();
//     } catch (error) {
//       console.error("STT: Failed to start:", error);
//       setPermissionError("Failed to start speech recognition. Check permissions.");
//     }
//   };

//   const promptRepeat = () => {
//     if (isDoneRef.current || !mountedRef.current) return;
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance("Command not recognized. Please try again with Inbox, Compose, Spam, or Trash.");
//       utterance.onend = () => {
//         if (!mountedRef.current) return;
//         console.log("TTS: Repeat ended, restarting STT");
//         startListening();
//       };
//       transcriptRef.current = "No speech detected.";
//       updateTranscript();
//       window.speechSynthesis.speak(utterance);
//     } else {
//       transcriptRef.current = "Command not recognized. Try again.";
//       updateTranscript();
//       setTimeout(() => startListening(), 1000);
//     }
//   };

//   const handleVoiceCommand = (text) => {
//     const commands = {
//       "inbox": "/inbox",
//       "compose": "/compose",
//       "send": "/send",
//       "trash": "/trash",
//     };
//     const matchedCommand = Object.keys(commands).find((cmd) => text.includes(cmd));
//     if (matchedCommand) {
//       isDoneRef.current = true;
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//         recognitionRef.current = null;
//       }
//       window.speechSynthesis.cancel();
//       transcriptRef.current = `Navigating to ${matchedCommand}`;
//       updateTranscript();
//       navigate(commands[matchedCommand]);
//     } else {
//       promptRepeat();
//     }
//   };

//   const speak = (text) => {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const updateTranscript = () => {
//     const resultElement = document.getElementById("result");
//     if (resultElement) resultElement.textContent = transcriptRef.current;
//   };

//   return (
//     <div className="menu-container">
//       <header className="app-header">
//         <div className="header-content">
//           <div className="brand-wrapper">
//             <Mail className="brand-icon" />
//             <span className="brand-name">InVision</span>
//           </div>
//           <div className="header-controls">
//             <Bell className="notifications-icon" />
//             <button onClick={handleLogout} className="logout-button" aria-label="Log out">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>
//       <main className="main-content">
//         <div className="content-wrapper">
//           <h1 className="main-title">Welcome to InVision Mail</h1>
//           <p className="menu-subtitle">What would you like to do?</p>
//           {permissionError && <p className="error-text">{permissionError}</p>}
//           <p id="result">{transcriptRef.current}</p>
//           <div className="menu-grid">
//             <Link to="/inbox" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Inbox className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Inbox</h2>
//                 </div>
//                 <p className="card-description">View and manage your incoming messages</p>
//               </div>
//             </Link>
//             <Link to="/compose" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Send className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Compose</h2>
//                 </div>
//                 <p className="card-description">Create and send new messages</p>
//               </div>
//             </Link>
//             <Link to="/sent" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <AlertOctagon className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Sent</h2>
//                 </div>
//                 <p className="card-description">View and manage your sent messages</p>
//               </div>
//             </Link>
//             <Link to="/trash" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Trash className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Trash</h2>
//                 </div>
//                 <p className="card-description">Manage deleted messages</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


//latest working code


// import { useEffect, useRef, useState, useCallback } from 'react';
// import { Inbox, Send, AlertOctagon, Trash, Mail, Bell } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import "./menu.css";

// export default function MenuPage() {
//   const navigate = useNavigate();
//   const recognitionRef = useRef(null);
//   const transcriptRef = useRef("");
//   const isDoneRef = useRef(false);
//   const mountedRef = useRef(false);
//   const [permissionError, setPermissionError] = useState(null);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate("/");
//   };

//   const checkMicPermissionAndStart = useCallback(async () => {
//     if (!mountedRef.current) {
//       console.log("STT: Skipped permission check, component unmounted");
//       return;
//     }
//     try {
//       console.log("Checking microphone permissions...");
//       const permissionStatus = await navigator.permissions.query({ name: "microphone" });
//       console.log("Mic permission status:", permissionStatus.state);
//       if (permissionStatus.state === "denied") {
//         setPermissionError("Microphone access denied. Please allow it in browser settings.");
//         speak("Microphone access denied. Please allow it in your browser settings.");
//       } else if (permissionStatus.state === "prompt" || permissionStatus.state === "granted") {
//         startListening();
//       }
//     } catch (err) {
//       console.error("Permission check error:", err);
//       setPermissionError("Error checking microphone permissions.");
//     }
//   }, []);

//   useEffect(() => {
//     console.log("useEffect: Starting TTS/STT sequence");
//     if (isDoneRef.current) return;

//     mountedRef.current = true;

//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance("Welcome to InVision Mail. Say Inbox, Compose, Sent, or Trash when ready.");
//       utterance.rate = 1;
//       utterance.pitch = 1;
//       utterance.lang = 'en-US';
//       utterance.onend = () => {
//         if (!mountedRef.current) {
//           console.log("TTS: onend skipped, component unmounted");
//           return;
//         }
//         console.log("TTS: Welcome ended, starting STT");
//         checkMicPermissionAndStart();
//       };
//       console.log("TTS: Starting welcome");
//       window.speechSynthesis.speak(utterance);
//     } else {
//       console.warn("TTS: Not supported");
//       checkMicPermissionAndStart();
//     }

//     return () => {
//       console.log("useEffect: Cleaning up");
//       mountedRef.current = false;
//       window.speechSynthesis.cancel();
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//         recognitionRef.current = null;
//         console.log("STT: Aborted in cleanup");
//       }
//     };
//   }, [checkMicPermissionAndStart]);

//   const startListening = () => {
//     if (isDoneRef.current || !mountedRef.current) {
//       console.log("STT: Blocked, isDone or unmounted");
//       return;
//     }

//     if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
//       transcriptRef.current = "Speech recognition not supported. Try Chrome or Brave.";
//       updateTranscript();
//       console.log("STT: Not supported");
//       return;
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;
//     recognition.continuous = false;

//     recognition.onstart = () => {
//       transcriptRef.current = "Listening for your command...";
//       updateTranscript();
//       console.log("STT: Started");
//       setTimeout(() => {
//         recognition.stop();
//         console.log("STT: Timeout triggered");
//       }, 5000);
//     };

//     recognition.onresult = (event) => {
//       const text = event.results[0][0].transcript.toLowerCase().trim();
//       transcriptRef.current = text;
//       updateTranscript();
//       console.log("STT: Result:", text);
//       recognition.stop();
//       handleVoiceCommand(text);
//     };

//     recognition.onerror = (event) => {
//       console.error("STT: Error:", event.error);
//       if (isDoneRef.current || !mountedRef.current) return;
//       if (event.error === 'no-speech') {
//         promptRepeat();
//       } else if (event.error === 'not-allowed') {
//         setPermissionError("Microphone access denied. Check permissions.");
//         speak("Microphone access denied. Please check permissions.");
//       } else {
//         transcriptRef.current = `Error: ${event.error}. Try refreshing.`;
//         updateTranscript();
//       }
//     };

//     recognition.onend = () => {
//       console.log("STT: Ended");
//       if (!isDoneRef.current && mountedRef.current) promptRepeat();
//     };

//     try {
//       console.log("STT: Attempting to start...");
//       recognition.start();
//     } catch (error) {
//       console.error("STT: Failed to start:", error);
//       setPermissionError("Failed to start speech recognition. Check permissions.");
//     }
//   };

//   const promptRepeat = () => {
//     if (isDoneRef.current || !mountedRef.current) return;
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance("Command not recognized. Please try again with Inbox, Compose, Sent, or Trash.");
//       utterance.onend = () => {
//         if (!mountedRef.current) return;
//         console.log("TTS: Repeat ended, restarting STT");
//         startListening();
//       };
//       transcriptRef.current = "No speech detected.";
//       updateTranscript();
//       window.speechSynthesis.speak(utterance);
//     } else {
//       transcriptRef.current = "Command not recognized. Try again.";
//       updateTranscript();
//       setTimeout(() => startListening(), 1000);
//     }
//   };

//   const handleVoiceCommand = (text) => {
//     const commands = {
//       "inbox": "/inbox",
//       "compose": "/compose",
//       "sent": "/sent",  // Navigate to /sent for "sent"
//       "send": "/sent",  // Also navigate to /sent for "send" (mispronunciation)
//       "trash": "/trash",
//     };
//     const matchedCommand = Object.keys(commands).find((cmd) => text.includes(cmd));
//     if (matchedCommand) {
//       isDoneRef.current = true;
//       if (recognitionRef.current) {
//         recognitionRef.current.abort();
//         recognitionRef.current = null;
//       }
//       window.speechSynthesis.cancel();
//       transcriptRef.current = `Navigating to ${matchedCommand === "send" ? "sent" : matchedCommand}`;
//       updateTranscript();
//       navigate(commands[matchedCommand]);
//     } else {
//       promptRepeat();
//     }
//   };

//   const speak = (text) => {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel();
//       const utterance = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const updateTranscript = () => {
//     const resultElement = document.getElementById("result");
//     if (resultElement) resultElement.textContent = transcriptRef.current;
//   };

//   return (
//     <div className="menu-container">
//       <header className="app-header">
//         <div className="header-content">
//           <div className="brand-wrapper">
//             <Mail className="brand-icon" />
//             <span className="brand-name">InVision</span>
//           </div>
//           <div className="header-controls">
//             <Bell className="notifications-icon" />
//             <button onClick={handleLogout} className="logout-button" aria-label="Log out">
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>
//       <main className="main-content">
//         <div className="content-wrapper">
//           <h1 className="main-title">Welcome to InVision Mail</h1>
//           <p className="menu-subtitle">What would you like to do?</p>
//           {permissionError && <p className="error-text">{permissionError}</p>}
//           <p id="result">{transcriptRef.current}</p>
//           <div className="menu-grid">
//             <Link to="/inbox" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Inbox className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Inbox</h2>
//                 </div>
//                 <p className="card-description">View and manage your incoming messages</p>
//               </div>
//             </Link>
//             <Link to="/compose" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Send className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Compose</h2>
//                 </div>
//                 <p className="card-description">Create and send new messages</p>
//               </div>
//             </Link>
//             <Link to="/sent" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <AlertOctagon className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Sent</h2>
//                 </div>
//                 <p className="card-description">View and manage your sent messages</p>
//               </div>
//             </Link>
//             <Link to="/trash" className="menu-card-link">
//               <div className="menu-card">
//                 <div className="card-header">
//                   <div className="icon-wrapper">
//                     <Trash className="menu-icon" />
//                   </div>
//                   <h2 className="card-title">Trash</h2>
//                 </div>
//                 <p className="card-description">Manage deleted messages</p>
//               </div>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }



import { useEffect, useRef, useState, useCallback } from 'react';
import { Inbox, Send, AlertOctagon, Trash, Mail, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./menu.css";

export default function MenuPage() {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");
  const isDoneRef = useRef(false);
  const mountedRef = useRef(false);
  const [permissionError, setPermissionError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail'); // Clear user email as well
    navigate("/");
  };

  const checkMicPermissionAndStart = useCallback(async () => {
    if (!mountedRef.current) {
      console.log("STT: Skipped permission check, component unmounted");
      return;
    }
    try {
      console.log("Checking microphone permissions...");
      const permissionStatus = await navigator.permissions.query({ name: "microphone" });
      console.log("Mic permission status:", permissionStatus.state);
      if (permissionStatus.state === "denied") {
        setPermissionError("Microphone access denied. Please allow it in browser settings.");
        speak("Microphone access denied. Please allow it in your browser settings.");
      } else if (permissionStatus.state === "prompt" || permissionStatus.state === "granted") {
        startListening();
      }
    } catch (err) {
      console.error("Permission check error:", err);
      setPermissionError("Error checking microphone permissions.");
    }
  }, []);

  useEffect(() => {
    console.log("useEffect: Starting TTS/STT sequence");
    if (isDoneRef.current) return;

    mountedRef.current = true;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Welcome to InVision Mail. Say Inbox, Compose, Sent, Trash, or Logout when ready.");
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.lang = 'en-US';
      utterance.onend = () => {
        if (!mountedRef.current) {
          console.log("TTS: onend skipped, component unmounted");
          return;
        }
        console.log("TTS: Welcome ended, starting STT");
        checkMicPermissionAndStart();
      };
      console.log("TTS: Starting welcome");
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("TTS: Not supported");
      checkMicPermissionAndStart();
    }

    return () => {
      console.log("useEffect: Cleaning up");
      mountedRef.current = false;
      window.speechSynthesis.cancel();
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
        console.log("STT: Aborted in cleanup");
      }
    };
  }, [checkMicPermissionAndStart]);

  const startListening = () => {
    if (isDoneRef.current || !mountedRef.current) {
      console.log("STT: Blocked, isDone or unmounted");
      return;
    }

    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      transcriptRef.current = "Speech recognition not supported. Try Chrome or Brave.";
      updateTranscript();
      console.log("STT: Not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => {
      transcriptRef.current = "Listening for your command...";
      updateTranscript();
      console.log("STT: Started");
      setTimeout(() => {
        recognition.stop();
        console.log("STT: Timeout triggered");
      }, 5000);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase().trim();
      transcriptRef.current = text;
      updateTranscript();
      console.log("STT: Result:", text);
      recognition.stop();
      handleVoiceCommand(text);
    };

    recognition.onerror = (event) => {
      console.error("STT: Error:", event.error);
      if (isDoneRef.current || !mountedRef.current) return;
      if (event.error === 'no-speech') {
        promptRepeat();
      } else if (event.error === 'not-allowed') {
        setPermissionError("Microphone access denied. Check permissions.");
        speak("Microphone access denied. Please check permissions.");
      } else {
        transcriptRef.current = `Error: ${event.error}. Try refreshing.`;
        updateTranscript();
      }
    };

    recognition.onend = () => {
      console.log("STT: Ended");
      if (!isDoneRef.current && mountedRef.current) promptRepeat();
    };

    try {
      console.log("STT: Attempting to start...");
      recognition.start();
    } catch (error) {
      console.error("STT: Failed to start:", error);
      setPermissionError("Failed to start speech recognition. Check permissions.");
    }
  };

  const promptRepeat = () => {
    if (isDoneRef.current || !mountedRef.current) return;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Command not recognized. Please try again with Inbox, Compose, Sent, Trash, or Logout.");
      utterance.onend = () => {
        if (!mountedRef.current) return;
        console.log("TTS: Repeat ended, restarting STT");
        startListening();
      };
      transcriptRef.current = "No speech detected.";
      updateTranscript();
      window.speechSynthesis.speak(utterance);
    } else {
      transcriptRef.current = "Command not recognized. Try again.";
      updateTranscript();
      setTimeout(() => startListening(), 1000);
    }
  };

  const handleVoiceCommand = (text) => {
    const commands = {
      "inbox": "/inbox",
      "compose": "/compose",
      "sent": "/sent",
      "send": "/sent", // Handles mispronunciation
      "trash": "/trash",
      "logout": "logout", // Added logout command
      "log out": "logout", // Added variation
    };
    const matchedCommand = Object.keys(commands).find((cmd) => text.includes(cmd));
    if (matchedCommand) {
      isDoneRef.current = true;
      if (recognitionRef.current) {
        recognitionRef.current.abort();
        recognitionRef.current = null;
      }
      window.speechSynthesis.cancel();
      if (matchedCommand === "logout" || matchedCommand === "log out") {
        transcriptRef.current = "Logging out.";
        updateTranscript();
        speak("Logging out.", handleLogout); // Speak and then logout
      } else {
        transcriptRef.current = `Navigating to ${matchedCommand === "send" ? "sent" : matchedCommand}`;
        updateTranscript();
        navigate(commands[matchedCommand]);
      }
    } else {
      promptRepeat();
    }
  };

  const speak = (text, onEnd) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (onEnd) utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
    }
  };

  const updateTranscript = () => {
    const resultElement = document.getElementById("result");
    if (resultElement) resultElement.textContent = transcriptRef.current;
  };

  return (
    <div className="menu-container">
      <header className="app-header">
        <div className="header-content">
          <div className="brand-wrapper">
            <Mail className="brand-icon" />
            <span className="brand-name">InVision</span>
          </div>
          <div className="header-controls">
            <Bell className="notifications-icon" />
            <button onClick={handleLogout} className="logout-button" aria-label="Log out">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="main-content">
        <div className="content-wrapper">
          <h1 className="main-title">Welcome to InVision Mail</h1>
          <p className="menu-subtitle">What would you like to do?</p>
          {permissionError && <p className="error-text">{permissionError}</p>}
          <p id="result">{transcriptRef.current}</p>
          <div className="menu-grid">
            <Link to="/inbox" className="menu-card-link">
              <div className="menu-card">
                <div className="card-header">
                  <div className="icon-wrapper">
                    <Inbox className="menu-icon" />
                  </div>
                  <h2 className="card-title">Inbox</h2>
                </div>
                <p className="card-description">View and manage your incoming messages</p>
              </div>
            </Link>
            <Link to="/compose" className="menu-card-link">
              <div className="menu-card">
                <div className="card-header">
                  <div className="icon-wrapper">
                    <Send className="menu-icon" />
                  </div>
                  <h2 className="card-title">Compose</h2>
                </div>
                <p className="card-description">Create and send new messages</p>
              </div>
            </Link>
            <Link to="/sent" className="menu-card-link">
              <div className="menu-card">
                <div className="card-header">
                  <div className="icon-wrapper">
                    <AlertOctagon className="menu-icon" />
                  </div>
                  <h2 className="card-title">Sent</h2>
                </div>
                <p className="card-description">View and manage your sent messages</p>
              </div>
            </Link>
            <Link to="/trash" className="menu-card-link">
              <div className="menu-card">
                <div className="card-header">
                  <div className="icon-wrapper">
                    <Trash className="menu-icon" />
                  </div>
                  <h2 className="card-title">Trash</h2>
                </div>
                <p className="card-description">Manage deleted messages</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}