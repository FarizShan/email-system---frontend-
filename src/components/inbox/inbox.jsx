//working inbox code 

// import React, { useState, useEffect } from "react"
// import { ArrowLeft, Star, Trash, X } from "lucide-react"
// import "./inbox.css"

// function EmailModal({ email, onClose }) {
//   if (!email) return null

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>{email.subject}</h2>
//           <button className="modal-close" onClick={onClose}>
//             <X size={24} />
//           </button>
//         </div>
//         <div className="modal-content">
//           <div className="email-details">
//             <p>
//               <strong>From:</strong> {email.from}
//             </p>
//             <p>
//               <strong>Date:</strong> {email.date}
//             </p>
//           </div>
//           <div className="email-body">
//             <p>{email.snippet}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function EmailItem({ id, from, subject, snippet, date, onClick }) {
//   return (
//     <div className="email-item" onClick={onClick}>
//       <div className="email-content">
//         <div className="email-header">
//           <h3 className="sender">{from}</h3>
//           <span className="date">{date}</span>
//         </div>
//         <div className="subject">{subject}</div>
//         <p className="preview">{snippet}</p>
//       </div>
//       <div className="email-actions">
//         <button
//           className="action-button star-button"
//           onClick={(e) => {
//             e.stopPropagation()
//             // Star functionality would go here
//           }}
//         >
//           <Star size={20} />
//         </button>
//         <button
//           className="action-button trash-button"
//           onClick={(e) => {
//             e.stopPropagation()
//             // Delete functionality would go here
//           }}
//         >
//           <Trash size={20} />
//         </button>
//       </div>
//     </div>
//   )
// }

// function InboxPage() {
//   const [emails, setEmails] = useState([])
//   const [selectedEmail, setSelectedEmail] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     // fetch("http://localhost:5001/get-emails")
//     fetch("http://localhost:5001/get-inbox-emails")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok")
//         }
//         return response.json()
//       })
//       .then((data) => {
//         setEmails(data)
//         setIsLoading(false)
//       })
//       .catch((error) => {
//         setError(error.message)
//         setIsLoading(false)
//       })
//   }, [])

//   return (
//     <div className="inbox-page">
//       <header>
//         <div className="header-content">
//           <div className="header-left">
//             <button className="back-button">
//               <ArrowLeft size={24} />
//             </button>
//             <h1 className="header-title">Inbox</h1>
//           </div>
//           <button className="logout-button">Logout</button>
//         </div>
//       </header>

//       <main>
//         <div className="inbox-container">
//           <h2 className="page-title">Inbox Messages</h2>
//           {isLoading ? (
//             <p>Loading emails...</p>
//           ) : error ? (
//             <p>Error: {error}</p>
//           ) : (
//             <div className="email-list">
//               {emails.map((email) => (
//                 <EmailItem key={email.id} {...email} onClick={() => setSelectedEmail(email)} />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>

//       <EmailModal email={selectedEmail} onClose={() => setSelectedEmail(null)} />
//     </div>
//   )
// }

// export default InboxPage


//Latest code before adding TTS and STT 

// import React, { useState, useEffect } from "react";
// import { Mail, Star } from "lucide-react";
// import "./inbox.css";

// const Inbox = () => {
//   const [emails, setEmails] = useState([
//     {
//       id: 1,
//       from: "John Doe",
//       subject: "Project Update",
//       preview: "I wanted to share the latest updates on our project...",
//       date: "10:30 AM",
//       read: false,
//       starred: true,
//       important: true,
//       content: `Hi there,\nI wanted to share the latest updates on our project. We've made significant progress on the frontend implementation and are now ready to move to the next phase.\n\nThe team has completed all the required components and they're now fully accessible. We've also addressed all the feedback from the last review.\n\nLet me know if you have any questions or concerns.\nBest regards,`,
//     },
//     {
//       id: 2,
//       from: "Jane Smith",
//       subject: "Meeting Reminder",
//       preview: "Just a reminder about our meeting tomorrow at 2 PM...",
//       date: "Yesterday",
//       read: true,
//       starred: false,
//       important: true,
//       content: `Hello,\nJust a reminder about our meeting tomorrow at 2 PM...`,
//     },
//     {
//       id: 3,
//       from: "Alex Johnson",
//       subject: "Design Feedback",
//       preview: "I've reviewed the latest designs and have some feedback...",
//       date: "Jul 15",
//       read: true,
//       starred: false,
//       important: false,
//       content: `Hi,\nI've reviewed the latest designs and have some feedback...`,
//     },
//     {
//       id: 4,
//       from: "Sarah Williams",
//       subject: "New Feature Request",
//       preview: "I wanted to discuss a new feature request...",
//       date: "Jul 14",
//       read: true,
//       starred: false,
//       important: false,
//       content: `Hi,\nI wanted to discuss a new feature request...`,
//     },
//   ]);

//   const [activeFilter, setActiveFilter] = useState("inbox");
//   const [selectedEmail, setSelectedEmail] = useState(emails[0]);

//   const filteredEmails = () => {
//     if (activeFilter === "starred") return emails.filter((email) => email.starred);
//     if (activeFilter === "important") return emails.filter((email) => email.important);
//     if (activeFilter === "sent") return emails.filter((email) => email.sent);
//     return emails;
//   };

//   const getInitial = (name) => name.charAt(0).toUpperCase();

//   return (
//     <div className="inbox-app">
//       <div className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn">Logout</button>
//       </div>
//       <div className="main-content">
//         <div className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "inbox" ? "active" : ""}`}
//             onClick={() => setActiveFilter("inbox")}
//           >
//             <Mail size={16} /> Inbox
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "starred" ? "active" : ""}`}
//             onClick={() => setActiveFilter("starred")}
//           >
//             <Star size={16} /> Starred
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "important" ? "active" : ""}`}
//             onClick={() => setActiveFilter("important")}
//           >
//             <Star size={16} /> Important
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "sent" ? "active" : ""}`}
//             onClick={() => setActiveFilter("sent")}
//           >
//             <Mail size={16} /> Sent
//           </button>
//         </div>
//         <div className="email-list">
//           <ul>
//             {filteredEmails().map((email) => (
//               <li
//                 key={email.id}
//                 className={`email-item ${email.read ? "read" : "unread"} ${
//                   selectedEmail?.id === email.id ? "selected" : ""
//                 }`}
//                 onClick={() => setSelectedEmail(email)}
//               >
//                 <div className="email-header">
//                   <div className="email-sender-wrapper">
//                     <span className="email-initial">{getInitial(email.from)}</span>
//                     <span className="email-sender">{email.from}</span>
//                   </div>
//                   <span className="email-date">{email.date}</span>
//                 </div>
//                 <div className="email-subject">{email.subject}</div>
//                 <div className="email-preview">{email.preview}</div>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="email-content">
//           {selectedEmail ? (
//             <div className="email-detail">
//               <div className="email-detail-header">
//                 <h2 className="email-detail-subject">{selectedEmail.subject}</h2>
//                 <span className="email-detail-date">{selectedEmail.date}</span>
//               </div>
//               <p>
//                 <strong>From:</strong> {selectedEmail.from}
//               </p>
//               <div className="email-detail-content">
//                 {selectedEmail.content.split("\n").map((line, index) => (
//                   <p key={index}>{line}</p>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="empty-state">Select an email to view its contents</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inbox;








// import React, { useState, useEffect } from "react";
// import { Mail, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./inbox.css";

// const Inbox = () => {
//   const navigate = useNavigate();
//   const [emails, setEmails] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("inbox");
//   const [selectedEmail, setSelectedEmail] = useState(null);

//   // Format date by removing timezone offset
//   const formatDate = (rawDate) => {
//     if (!rawDate) return "Unknown Date";
//     const parts = rawDate.split(" ");
//     if (parts.length > 5) {
//       parts.pop();
//     }
//     return parts.join(" ");
//   };

//   // Fetch emails from backend
//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         let endpoint;
//         switch (activeFilter) {
//           case "spam":
//             endpoint = "get-spam-emails";
//             break;
//           case "starred":
//             endpoint = "get-starred-emails";
//             break;
//           case "important":
//             endpoint = "get-important-emails";
//             break;
//           default:
//             endpoint = "get-inbox-emails";
//         }
//         console.log(`Starting fetch from ${endpoint}`);
//         setEmails([]);
//         setSelectedEmail(null);
//         const response = await fetch(`http://localhost:5001/${endpoint}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         console.log(`Fetched ${data.length} emails for ${activeFilter}:`, data);

//         const mappedEmails = data.map((email) => ({
//           id: email.id,
//           from: email.from,
//           subject: email.subject || "No Subject",
//           preview: email.snippet || "No preview available",
//           date: formatDate(email.date),
//           read: false,
//           starred: activeFilter === "starred", // Mark as starred if from starred endpoint
//           important: activeFilter === "important", // Mark as important if from important endpoint
//           content: email.snippet || "No content available",
//           folder: activeFilter === "spam" ? "spam" : "inbox", // Default to inbox unless spam
//         }));

//         setEmails(mappedEmails);
//         setSelectedEmail(mappedEmails[0] || null);
//         console.log(`Updated emails state with ${mappedEmails.length} emails`);
//       } catch (error) {
//         console.error(`Error fetching emails from ${activeFilter}:`, error);
//         setEmails([]);
//         setSelectedEmail(null);
//       }
//     };

//     fetchEmails();
//   }, [activeFilter]);

//   const filteredEmails = () => {
//     console.log(`Filtering emails for ${activeFilter}, total emails: ${emails.length}`, emails);
//     if (activeFilter === "starred") return emails.filter((email) => email.starred);
//     if (activeFilter === "important") return emails.filter((email) => email.important);
//     if (activeFilter === "sent") return [];
//     if (activeFilter === "spam") return emails.filter((email) => email.folder === "spam");
//     return emails.filter((email) => email.folder === "inbox");
//   };

//   const getInitial = (name) => {
//     const namePart = name.split("<")[0].trim();
//     return namePart.charAt(0).toUpperCase();
//   };

//   return (
//     <div className="inbox-app">
//       <div className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
//       </div>
//       <div className="main-content">
//         <div className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "inbox" ? "active" : ""}`}
//             onClick={() => setActiveFilter("inbox")}
//           >
//             <Mail size={16} /> Inbox
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "starred" ? "active" : ""}`}
//             onClick={() => setActiveFilter("starred")}
//           >
//             <Star size={16} /> Starred
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "important" ? "active" : ""}`}
//             onClick={() => setActiveFilter("important")}
//           >
//             <Star size={16} /> Important
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "sent" ? "active" : ""}`}
//             onClick={() => setActiveFilter("sent")}
//           >
//             <Mail size={16} /> Sent
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "spam" ? "active" : ""}`}
//             onClick={() => setActiveFilter("spam")}
//           >
//             <Mail size={16} /> Spam
//           </button>
//         </div>
//         <div className="email-list">
//           <ul>
//             {filteredEmails().length > 0 ? (
//               filteredEmails().map((email) => (
//                 <li
//                   key={email.id}
//                   className={`email-item ${email.read ? "read" : "unread"} ${
//                     selectedEmail?.id === email.id ? "selected" : ""
//                   }`}
//                   onClick={() => setSelectedEmail(email)}
//                 >
//                   <div className="email-header">
//                     <div className="email-sender-wrapper">
//                       <span className="email-initial">{getInitial(email.from)}</span>
//                       <span className="email-sender">{email.from}</span>
//                     </div>
//                     <span className="email-date">{email.date}</span>
//                   </div>
//                   <div className="email-subject">{email.subject}</div>
//                   <div className="email-preview">{email.preview}</div>
//                 </li>
//               ))
//             ) : (
//               <li className="email-item">No emails found</li>
//             )}
//           </ul>
//         </div>
//         <div className="email-content">
//           {selectedEmail ? (
//             <div className="email-detail">
//               <div className="email-detail-header">
//                 <h2 className="email-detail-subject">{selectedEmail.subject}</h2>
//                 <span className="email-detail-date">{selectedEmail.date}</span>
//               </div>
//               <p>
//                 <strong>From:</strong> {selectedEmail.from}
//               </p>
//               <div className="email-detail-content">
//                 {selectedEmail.content.split("\n").map((line, index) => (
//                   <p key={index}>{line}</p>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="empty-state">Select an email to view its contents</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inbox;


//before integrating stt and tts


// import React, { useState, useEffect } from "react";
// import { Mail, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./inbox.css";

// const Inbox = () => {
//   const navigate = useNavigate();
//   const [emails, setEmails] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("inbox");
//   const [selectedEmail, setSelectedEmail] = useState(null);

//   // Format date by removing timezone offset
//   const formatDate = (rawDate) => {
//     if (!rawDate) return "Unknown Date";
//     const parts = rawDate.split(" ");
//     if (parts.length > 5) {
//       parts.pop();
//     }
//     return parts.join(" ");
//   };

//   // Fetch emails from backend
//   useEffect(() => {
//     const fetchEmails = async () => {
//       try {
//         let endpoint;
//         switch (activeFilter) {
//           case "spam":
//             endpoint = "get-spam-emails";
//             break;
//           case "starred":
//             endpoint = "get-starred-emails";
//             break;
//           case "important":
//             endpoint = "get-important-emails";
//             break;
//           default:
//             endpoint = "get-inbox-emails";
//         }
//         console.log(`Starting fetch from ${endpoint}`);
//         setEmails([]);
//         setSelectedEmail(null);
//         const response = await fetch(`http://localhost:5001/${endpoint}`);
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         console.log(`Fetched ${data.length} emails for ${activeFilter}:`, data);

//         const mappedEmails = data.map((email) => ({
//           id: email.id,
//           from: email.from,
//           subject: email.subject || "No Subject",
//           preview: email.content || "No preview available", // Use full content for preview
//           content: email.content || "No content available", // Full content for detailed view
//           date: formatDate(email.date),
//           read: false,
//           starred: activeFilter === "starred",
//           important: activeFilter === "important",
//           folder: activeFilter === "spam" ? "spam" : "inbox",
//         }));

//         setEmails(mappedEmails);
//         setSelectedEmail(mappedEmails[0] || null);
//         console.log(`Updated emails state with ${mappedEmails.length} emails`);
//       } catch (error) {
//         console.error(`Error fetching emails from ${activeFilter}:`, error);
//         setEmails([]);
//         setSelectedEmail(null);
//       }
//     };

//     fetchEmails();
//   }, [activeFilter]);

//   const filteredEmails = () => {
//     console.log(`Filtering emails for ${activeFilter}, total emails: ${emails.length}`, emails);
//     if (activeFilter === "starred") return emails.filter((email) => email.starred);
//     if (activeFilter === "important") return emails.filter((email) => email.important);
//     if (activeFilter === "sent") return [];
//     if (activeFilter === "spam") return emails.filter((email) => email.folder === "spam");
//     return emails.filter((email) => email.folder === "inbox");
//   };

//   const getInitial = (name) => {
//     const namePart = name.split("<")[0].trim();
//     return namePart.charAt(0).toUpperCase();
//   };

//   return (
//     <div className="inbox-app">
//       <div className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
//       </div>
//       <div className="main-content">
//         <div className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "inbox" ? "active" : ""}`}
//             onClick={() => setActiveFilter("inbox")}
//           >
//             <Mail size={16} /> Inbox
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "starred" ? "active" : ""}`}
//             onClick={() => setActiveFilter("starred")}
//           >
//             <Star size={16} /> Starred
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "important" ? "active" : ""}`}
//             onClick={() => setActiveFilter("important")}
//           >
//             <Star size={16} /> Important
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "sent" ? "active" : ""}`}
//             onClick={() => setActiveFilter("sent")}
//           >
//             <Mail size={16} /> Sent
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "spam" ? "active" : ""}`}
//             onClick={() => setActiveFilter("spam")}
//           >
//             <Mail size={16} /> Spam
//           </button>
//         </div>
//         <div className="email-list">
//           <ul>
//             {filteredEmails().length > 0 ? (
//               filteredEmails().map((email) => (
//                 <li
//                   key={email.id}
//                   className={`email-item ${email.read ? "read" : "unread"} ${
//                     selectedEmail?.id === email.id ? "selected" : ""
//                   }`}
//                   onClick={() => setSelectedEmail(email)}
//                 >
//                   <div className="email-header">
//                     <div className="email-sender-wrapper">
//                       <span className="email-initial">{getInitial(email.from)}</span>
//                       <span className="email-sender">{email.from}</span>
//                     </div>
//                     <span className="email-date">{email.date}</span>
//                   </div>
//                   <div className="email-subject">{email.subject}</div>
//                   <div className="email-preview">{email.preview}</div>
//                 </li>
//               ))
//             ) : (
//               <li className="email-item">No emails found</li>
//             )}
//           </ul>
//         </div>
//         <div className="email-content">
//           {selectedEmail ? (
//             <div className="email-detail">
//               <div className="email-detail-header">
//                 <h2 className="email-detail-subject">{selectedEmail.subject}</h2>
//                 <span className="email-detail-date">{selectedEmail.date}</span>
//               </div>
//               <p>
//                 <strong>From:</strong> {selectedEmail.from}
//               </p>
//               <div className="email-detail-content">
//                 {selectedEmail.content.split("\n").map((line, index) => (
//                   <p key={index}>{line}</p>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="empty-state">Select an email to view its contents</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inbox;


//latest working code


// import React, { useState, useEffect, useRef } from "react";
// import { Mail, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./inbox.css";

// const Inbox = () => {
//   const navigate = useNavigate();
//   const [emails, setEmails] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("inbox");
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
//   const recognitionRef = useRef(null);
//   const abortControllerRef = useRef(null);
//   const phaseRef = useRef("main");
//   const pendingFilterRef = useRef(null);

//   const formatDate = (rawDate) => {
//     if (!rawDate) return "Unknown Date";
//     const parts = rawDate.split(" ");
//     if (parts.length > 5) {
//       parts.pop();
//     }
//     return parts.join(" ");
//   };

//   const speak = (text, onEnd) => {
//     stopSpeech();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     if (onEnd) utterance.onend = onEnd;
//     window.speechSynthesis.speak(utterance);
//     return utterance;
//   };

//   const speakLongContent = (text, onEnd) => {
//     stopSpeech();
//     const maxLength = 200;
//     const chunks = [];
//     for (let i = 0; i < text.length; i += maxLength) {
//       chunks.push(text.slice(i, i + maxLength));
//     }
//     console.log(`Speaking ${chunks.length} chunks for content length ${text.length}`);

//     let currentChunk = 0;
//     const speakNextChunk = () => {
//       if (currentChunk >= chunks.length) {
//         console.log("All chunks spoken, calling onEnd");
//         if (onEnd) onEnd();
//         return;
//       }

//       const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
//       utterance.lang = "en-US";
//       utterance.onend = () => {
//         console.log(`Chunk ${currentChunk + 1}/${chunks.length} completed`);
//         currentChunk++;
//         speakNextChunk();
//       };
//       utterance.onerror = (event) => {
//         console.error(`Speech error on chunk ${currentChunk}:`, event.error);
//         if (event.error === "interrupted" || event.error === "canceled") {
//           speakNextChunk();
//         }
//       };
//       console.log(`Speaking chunk ${currentChunk + 1}/${chunks.length}: ${chunks[currentChunk].substring(0, 30)}...`);
//       window.speechSynthesis.speak(utterance);
//     };

//     speakNextChunk();
//   };

//   const startRecognition = (onResult) => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition not supported.");
//       speak("Speech recognition is not supported in this browser.");
//       return;
//     }
//     //
    

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript.toLowerCase().trim();
//       console.log(`Recognized in ${phaseRef.current} phase:`, transcript);
//       onResult(transcript);
//     //   const transcript = event.results[0][0].transcript
//     //   .toLowerCase()
//     //   .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove punctuation
//     //   .trim();
//     // console.log(`Recognized in ${phaseRef.current} phase:`, transcript);
//     // onResult(transcript);
        
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       speak("Sorry, I couldn't understand. Please try again.", () => startRecognition(onResult));
//     };

//     recognition.onend = () => {
//       recognitionRef.current = null;
//     };

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   const stopSpeech = () => {
//     window.speechSynthesis.cancel();
//   };

//   const fetchEmails = async (filter) => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     abortControllerRef.current = new AbortController();
//     const signal = abortControllerRef.current.signal;

//     try {
//       let endpoint;
//       switch (filter) {
//         case "spam":
//           endpoint = "get-spam-emails";
//           break;
//         case "starred":
//           endpoint = "get-starred-emails";
//           break;
//         case "important":
//           endpoint = "get-important-emails";
//           break;
//         default:
//           endpoint = "get-inbox-emails";
//       }
//       console.log(`Starting fetch from ${endpoint} for ${filter}`);
//       setEmails(null);
//       setSelectedEmail(null);
//       setCurrentEmailIndex(0);

//       const response = await fetch(`http://localhost:5001/${endpoint}`, { signal });
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       const data = await response.json();
//       console.log(`Fetched ${data.length} emails for ${filter}:`, data);

//       const mappedEmails = data.map((email) => ({
//         id: email.id,
//         from: email.from,
//         subject: email.subject || "No Subject",
//         preview: email.content || "No preview available",
//         content: email.content || "No content available",
//         date: formatDate(email.date),
//         read: false,
//         starred: filter === "starred",
//         important: filter === "important",
//         folder: filter === "spam" ? "spam" : "inbox",
//       }));

//       if (abortControllerRef.current.signal.aborted) return;
//       setEmails(mappedEmails);
//       setActiveFilter(filter);
//       return mappedEmails;
//     } catch (error) {
//       if (error.name === "AbortError") {
//         console.log(`Fetch aborted for ${filter}`);
//         return;
//       }
//       console.error(`Error fetching emails from ${filter}:`, error);
//       setEmails([]);
//       setSelectedEmail(null);
//       throw error;
//     }
//   };

//   // Moved speakFullContent up to here to be defined before use
//   const handleEmailCommands = (command, emailList, index) => {
//     switch (command) {
//       case "read":
//         phaseRef.current = "content";
//         setSelectedEmail(emailList[index]);
//         speakLongContent(emailList[index].content, () => {
//           speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () =>
//             startRecognition((cmd) => handleContentCommands(cmd, emailList[index], emailList, index))
//           );
//         });
//         break;
//       case "next":
//         readEmail(emailList, index + 1);
//         break;
//       case "stop":
//         phaseRef.current = "main";
//         speak("Returning to main menu.", () => startRecognition(handleMainCommands));
//         break;
//       default:
//         speak("Command not recognized. Say 'read', 'next', or 'stop'.", () =>
//           startRecognition((cmd) => handleEmailCommands(cmd, emailList, index))
//         );
//     }
//   };

//   const handleContentCommands = (command, email, emailList, index) => {
//     switch (command) {
//       case "next":
//         phaseRef.current = "reading";
//         readEmail(emailList, index + 1);
//         break;
//       case "back":
//         phaseRef.current = "reading";
//         readEmail(emailList, index);
//         break;
//       case "repeat":
//         speakLongContent(email.content, () => {
//           speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () =>
//             startRecognition((cmd) => handleContentCommands(cmd, email, emailList, index))
//           );
//         });
//         break;
//       default:
//         speak("Command not recognized. Say 'next', 'back', or 'repeat'.", () =>
//           startRecognition((cmd) => handleContentCommands(cmd, email, emailList, index))
//         );
//     }
//   };

//   const readEmail = (emailList, index) => {
//     if (index >= emailList.length) {
//       speak("No more emails to read. Returning to main menu.", () => {
//         phaseRef.current = "main";
//         startRecognition(handleMainCommands);
//       });
//       return;
//     }

//     const email = emailList[index];
//     setCurrentEmailIndex(index);
//     const text = `Subject: ${email.subject}. From: ${email.from}. Say 'read' to hear the full content, 'next' for the next email, or 'stop' to return to main commands.`;
//     speak(text, () => startRecognition((command) => handleEmailCommands(command, emailList, index)));
//   };

//   useEffect(() => {
//     const initialize = () => {
//       const welcomeMessage = "Welcome to InVision. Available commands: 'go to inbox' , 'go to starred' , 'go to important' , 'go to spam' , 'help' for command list, 'menu' to return to main menu,'logout' to log out.";
//       speak(welcomeMessage, () => {
//         phaseRef.current = "main";
//         startRecognition(handleMainCommands);
//       });
//     };
//     initialize();

//     return () => stopSpeech();
//   }, []);

//   const handleMainCommands = (command) => {
//     // Normalize command for easier matching
//     const normalizedCommand = command.toLowerCase().trim();
  
//     // Helper function for fuzzy matching
//     const includesAny = (str, terms) => terms.some(term => str.includes(term));
  
//     switch (true) { // Use switch(true) to allow complex conditions
//       case normalizedCommand === "go to inbox.":
//         phaseRef.current = "reading";
//         fetchEmails("inbox")
//           .then((fetchedEmails) => {
//             if (fetchedEmails && fetchedEmails.length > 0) {
//               readEmail(fetchedEmails, 0);
//             } else {
//               speak("No emails found in inbox. Returning to main menu.", () => {
//                 phaseRef.current = "main";
//                 startRecognition(handleMainCommands);
//               });
//             }
//           })
//           .catch(() => {
//             speak("Error fetching inbox emails. Returning to main menu.", () => {
//               phaseRef.current = "main";
//               startRecognition(handleMainCommands);
//             });
//           });
//         break;
//       case normalizedCommand === "go to starred" ||
//            includesAny(normalizedCommand, ["go to stars", "starred emails", "show starred"]):
//         pendingFilterRef.current = "starred";
//         speak("Navigate to starred? Say yes or no.", () => startRecognition(handleNavigationConfirmation));
//         break;
//       case normalizedCommand === "go to important.":
//         pendingFilterRef.current = "important";
//         speak("Navigate to important? Say yes or no.", () => startRecognition(handleNavigationConfirmation));
//         break;
//       case normalizedCommand === "go to spam.":
//         pendingFilterRef.current = "spam";
//         speak("Navigate to spam? Say yes or no.", () => startRecognition(handleNavigationConfirmation));
//         break;
//       case normalizedCommand === "menu.":
//         stopSpeech();
//         speak("Navigating to menu.", () => navigate("/menu"));
//         break;
//         case includesAny(normalizedCommand, ["logout", "log out", "sign out", "signout"]):
//         stopSpeech();
//         speak("Logging out.", () => {
//           localStorage.removeItem("authToken"); // Clear authentication token
//           navigate("/"); // Navigate to the root route (login page)
//         });
//         break;
//       case normalizedCommand === "help":
//         speak(
//           "Available commands: 'go to inbox', 'go to starred' or 'starred emails', 'go to important', 'go to spam', 'help', 'menu', 'logout'",
//           () => startRecognition(handleMainCommands)
//         );
//         break;
//       default:
//         speak("Command not recognized. Say 'help' for options.", () => startRecognition(handleMainCommands));
//     }
//   };

//   const handleNavigationConfirmation = (response) => {
//     if (response === "yes" && pendingFilterRef.current) {
//       const newFilter = pendingFilterRef.current;
//       phaseRef.current = "reading"; // Set phase to reading, like inbox
//       fetchEmails(newFilter)
//         .then((fetchedEmails) => {
//           if (fetchedEmails && fetchedEmails.length > 0) {
//             speak(`Navigated to ${newFilter}. Starting with the first email.`, () => {
//               readEmail(fetchedEmails, 0); // Start reading the first email
//             });
//           } else {
//             speak(`No emails found in ${newFilter}. Returning to main menu.`, () => {
//               phaseRef.current = "main";
//               startRecognition(handleMainCommands);
//             });
//           }
//         })
//         .catch(() => {
//           speak(`Error fetching ${newFilter} emails. Returning to main menu.`, () => {
//             phaseRef.current = "main";
//             startRecognition(handleMainCommands);
//           });
//         });
//       pendingFilterRef.current = null; // Clear pending filter
//     } else {
//       speak("Staying in current folder. Returning to main menu.", () => {
//         pendingFilterRef.current = null;
//         phaseRef.current = "main";
//         startRecognition(handleMainCommands);
//       });
//     }
//   };  

//   const handleLogoutConfirmation = (response) => {
//     console.log("handleLogoutConfirmation: Response received:", response); // Debug log
//     if (response === "yes") {
//       console.log("handleLogoutConfirmation: User said 'yes', proceeding with logout"); // Debug log
//       stopSpeech();
//       try {
//         speak("Logging out.", () => {
//           console.log("handleLogoutConfirmation: 'Logging out' speech ended"); // Debug log
//           localStorage.removeItem("authToken");
//           console.log("handleLogoutConfirmation: authToken removed from localStorage"); // Debug log
//           navigate("/");
//           console.log("handleLogoutConfirmation: Navigated to /"); // Debug log
//         });
//       } catch (error) {
//         console.error("handleLogoutConfirmation: Error during logout:", error); // Catch any errors
//         speak("Error during logout. Please try again.", () => startRecognition(handleMainCommands));
//       }
//     } else {
//       console.log("handleLogoutConfirmation: User said 'no' or unrecognized, canceling logout"); // Debug log
//       stopSpeech();
//       speak("Logout canceled. Returning to main menu.", () => {
//         phaseRef.current = "main";
//         startRecognition(handleMainCommands);
//       });
//     }
//   };


//   const filteredEmails = () => {
//     if (!emails) return [];
//     console.log(`Filtering emails for ${activeFilter}, total emails: ${emails.length}`, emails);
//     if (activeFilter === "starred") return emails.filter((email) => email.starred);
//     if (activeFilter === "important") return emails.filter((email) => email.important);
//     if (activeFilter === "sent") return [];
//     if (activeFilter === "spam") return emails.filter((email) => email.folder === "spam");
//     return emails.filter((email) => email.folder === "inbox");
//   };

//   const getInitial = (name) => {
//     const namePart = name.split("<")[0].trim();
//     return namePart.charAt(0).toUpperCase();
//   };

//   return (
//     <div className="inbox-app">
//       <div className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
//       </div>
//       <div className="main-content">
//         <div className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "inbox" ? "active" : ""}`}
//             onClick={() => setActiveFilter("inbox")}
//           >
//             <Mail size={16} /> Inbox
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "starred" ? "active" : ""}`}
//             onClick={() => setActiveFilter("starred")}
//           >
//             <Star size={16} /> Starred
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "important" ? "active" : ""}`}
//             onClick={() => setActiveFilter("important")}
//           >
//             <Star size={16} /> Important
//          </button>
//           {/* <button
//             className={`nav-btn ${activeFilter === "sent" ? "active" : ""}`}
//             onClick={() => setActiveFilter("sent")}
//           >
//             <Mail size={16} /> Sent
//           </button> */}
//           <button
//             className={`nav-btn ${activeFilter === "spam" ? "active" : ""}`}
//             onClick={() => setActiveFilter("spam")}
//           >
//             <Mail size={16} /> Spam
//           </button>
//         </div>
//         <div className="email-list">
//           <ul>
//             {emails && filteredEmails().length > 0 ? (
//               filteredEmails().map((email) => (
//                 <li
//                   key={email.id}
//                   className={`email-item ${email.read ? "read" : "unread"} ${
//                     selectedEmail?.id === email.id ? "selected" : ""
//                   }`}
//                   onClick={() => setSelectedEmail(email)}
//                 >
//                   <div className="email-header">
//                     <div className="email-sender-wrapper">
//                       <span className="email-initial">{getInitial(email.from)}</span>
//                       <span className="email-sender">{email.from}</span>
//                     </div>
//                     <span className="email-date">{email.date}</span>
//                   </div>
//                   <div className="email-subject">{email.subject}</div>
//                   <div className="email-preview">{email.preview}</div>
//                 </li>
//               ))
//             ) : (
//               <li className="email-item">No emails loaded yet</li>
//             )}
//           </ul>
//         </div>
//         <div className="email-content">
//           {selectedEmail ? (
//             <div className="email-detail">
//               <div className="email-detail-header">
//                 <h2 className="email-detail-subject">{selectedEmail.subject}</h2>
//                 <span className="email-detail-date">{selectedEmail.date}</span>
//               </div>
//               <p>
//                 <strong>From:</strong> {selectedEmail.from}
//               </p>
//               <div className="email-detail-content">
//                 {selectedEmail.content.split("\n").map((line, index) => (
//                   <p key={index}>{line}</p>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="empty-state">Select an email to view its contents</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inbox;


import React, { useState, useEffect, useRef } from "react";
import { Mail, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./inbox.css";

const Inbox = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState(null);
  const [activeFilter, setActiveFilter] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const recognitionRef = useRef(null);
  const abortControllerRef = useRef(null);
  const phaseRef = useRef("main");
  const pendingFilterRef = useRef(null);

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
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      console.log(`Recognized in ${phaseRef.current} phase:`, transcript);
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

  const fetchEmails = async (filter) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      let endpoint;
      switch (filter) {
        case "spam":
          endpoint = "get-spam-emails";
          break;
        case "starred":
          endpoint = "get-starred-emails";
          break;
        case "important":
          endpoint = "get-important-emails";
          break;
        default:
          endpoint = "get-inbox-emails";
      }
      console.log(`Starting fetch from ${endpoint} for ${filter}`);
      setEmails(null);
      setSelectedEmail(null);
      setCurrentEmailIndex(0);

      const senderEmail = localStorage.getItem("userEmail"); // Get email from localStorage
      if (!senderEmail) {
        throw new Error("No sender email found in localStorage. Please log in first.");
      }

      const response = await fetch(`http://localhost:5001/${endpoint}`, {
        method: 'GET',
        headers: {
          'X-Sender-Email': senderEmail, // Send email in header
        },
        signal,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
      const data = await response.json();
      console.log(`Fetched ${data.length} emails for ${filter}:`, data);

      const mappedEmails = data.map((email) => ({
        id: email.id,
        from: email.from,
        subject: email.subject || "No Subject",
        preview: email.snippet || "No preview available",
        content: email.content || "No content available",
        date: formatDate(email.date),
        read: false,
        starred: filter === "starred",
        important: filter === "important",
        folder: filter === "spam" ? "spam" : "inbox",
      }));

      if (abortControllerRef.current.signal.aborted) return;
      setEmails(mappedEmails);
      setActiveFilter(filter);
      return mappedEmails;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log(`Fetch aborted for ${filter}`);
        return;
      }
      console.error(`Error fetching emails from ${filter}:`, error);
      setEmails([]);
      setSelectedEmail(null);
      speak(`Error fetching ${filter} emails: ${error.message}`);
      throw error;
    }
  };

  const handleEmailCommands = (command, emailList, index) => {
    switch (command) {
      case "read.":
        phaseRef.current = "content";
        setSelectedEmail(emailList[index]);
        speakLongContent(emailList[index].content, () => {
          speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () =>
            startRecognition((cmd) => handleContentCommands(cmd, emailList[index], emailList, index))
          );
        });
        break;
      case "next.":
        readEmail(emailList, index + 1);
        break;
      case "stop.":
        phaseRef.current = "main";
        speak("Returning to main menu.", () => startRecognition(handleMainCommands));
        break;
      default:
        speak("Command not recognized. Say 'read', 'next', or 'stop'.", () =>
          startRecognition((cmd) => handleEmailCommands(cmd, emailList, index))
        );
    }
  };

  const handleContentCommands = (command, email, emailList, index) => {
    switch (command) {
      case "next.":
        phaseRef.current = "reading";
        readEmail(emailList, index + 1);
        break;
      case "back.":
        phaseRef.current = "reading";
        readEmail(emailList, index);
        break;
      case "repeat.":
        speakLongContent(email.content, () => {
          speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () =>
            startRecognition((cmd) => handleContentCommands(cmd, email, emailList, index))
          );
        });
        break;
      default:
        speak("Command not recognized. Say 'next', 'back', or 'repeat'.", () =>
          startRecognition((cmd) => handleContentCommands(cmd, email, emailList, index))
        );
    }
  };

  const readEmail = (emailList, index) => {
    if (index >= emailList.length) {
      speak("No more emails to read. Returning to main menu.", () => {
        phaseRef.current = "main";
        startRecognition(handleMainCommands);
      });
      return;
    }

    const email = emailList[index];
    setCurrentEmailIndex(index);
    const text = `Subject: ${email.subject}. From: ${email.from}. Say 'read' to hear the full content, 'next' for the next email, or 'stop' to return to main commands.`;
    speak(text, () => startRecognition((command) => handleEmailCommands(command, emailList, index)));
  };

  useEffect(() => {
    const initialize = () => {
      const welcomeMessage = "Welcome to InVision. Available commands: 'go to inbox', 'go to starred', 'go to important', 'go to spam', 'help' for command list, 'menu' to return to main menu, 'logout' to log out.";
      speak(welcomeMessage, () => {
        phaseRef.current = "main";
        startRecognition(handleMainCommands);
      });
    };
    initialize();

    return () => {
      stopSpeech();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleMainCommands = (command) => {
    const normalizedCommand = command.toLowerCase().trim();
    const includesAny = (str, terms) => terms.some(term => str.includes(term));

    switch (true) {
      case normalizedCommand === "go to inbox.":
        phaseRef.current = "reading";
        fetchEmails("inbox")
          .then((fetchedEmails) => {
            if (fetchedEmails && fetchedEmails.length > 0) {
              readEmail(fetchedEmails, 0);
            } else {
              speak("No emails found in inbox. Returning to main menu.", () => {
                phaseRef.current = "main";
                startRecognition(handleMainCommands);
              });
            }
          })
          .catch(() => {
            speak("Error fetching inbox emails. Returning to main menu.", () => {
              phaseRef.current = "main";
              startRecognition(handleMainCommands);
            });
          });
        break;
      case normalizedCommand === "go to starred." || includesAny(normalizedCommand, ["go to stars", "starred emails", "show starred"]):
        pendingFilterRef.current = "starred";
        speak("Navigate to starred? Say yes or no.", () => startRecognition(handleNavigationConfirmation));
        break;
      case normalizedCommand === "go to important.":
        pendingFilterRef.current = "important";
        speak("Navigate to important? Say yes or no.", () => startRecognition(handleNavigationConfirmation));
        break;
      case normalizedCommand === "go to spam.":
        pendingFilterRef.current = "spam";
        speak("Navigate to spam? Say yes or no.", () => startRecognition(handleNavigationConfirmation));
        break;
      case normalizedCommand === "menu.":
        stopSpeech();
        speak("Navigating to menu.", () => navigate("/menu"));
        break;
      case includesAny(normalizedCommand, ["logout.", "log out.", "sign out.", "signout."]):
        stopSpeech();
        speak("Logging out.", () => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userEmail"); // Clear email on logout
          navigate("/");
        });
        break;
      case normalizedCommand === "help.":
        speak(
          "Available commands: 'go to inbox', 'go to starred' or 'starred emails', 'go to important', 'go to spam', 'help', 'menu', 'logout'",
          () => startRecognition(handleMainCommands)
        );
        break;
      default:
        speak("Command not recognized. Say 'help' for options.", () => startRecognition(handleMainCommands));
    }
  };

  const handleNavigationConfirmation = (response) => {
    if (response === "yes." && pendingFilterRef.current) {
      const newFilter = pendingFilterRef.current;
      phaseRef.current = "reading";
      fetchEmails(newFilter)
        .then((fetchedEmails) => {
          if (fetchedEmails && fetchedEmails.length > 0) {
            speak(`Navigated to ${newFilter}. Starting with the first email.`, () => {
              readEmail(fetchedEmails, 0);
            });
          } else {
            speak(`No emails found in ${newFilter}. Returning to main menu.`, () => {
              phaseRef.current = "main";
              startRecognition(handleMainCommands);
            });
          }
        })
        .catch(() => {
          speak(`Error fetching ${newFilter} emails. Returning to main menu.`, () => {
            phaseRef.current = "main";
            startRecognition(handleMainCommands);
          });
        });
      pendingFilterRef.current = null;
    } else {
      speak("Staying in current folder. Returning to main menu.", () => {
        pendingFilterRef.current = null;
        phaseRef.current = "main";
        startRecognition(handleMainCommands);
      });
    }
  };

  const filteredEmails = () => {
    if (!emails) return [];
    console.log(`Filtering emails for ${activeFilter}, total emails: ${emails.length}`, emails);
    if (activeFilter === "starred") return emails.filter((email) => email.starred);
    if (activeFilter === "important") return emails.filter((email) => email.important);
    if (activeFilter === "sent") return [];
    if (activeFilter === "spam") return emails.filter((email) => email.folder === "spam");
    return emails.filter((email) => email.folder === "inbox");
  };

  const getInitial = (name) => {
    const namePart = name.split("<")[0].trim();
    return namePart.charAt(0).toUpperCase();
  };

  return (
    <div className="inbox-app">
      <div className="navbar">
        <span className="logo">InVision</span>
        <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
      </div>
      <div className="main-content">
        <div className="sidebar">
          <button
            className={`nav-btn ${activeFilter === "inbox" ? "active" : ""}`}
            onClick={() => setActiveFilter("inbox")}
          >
            <Mail size={16} /> Inbox
          </button>
          <button
            className={`nav-btn ${activeFilter === "starred" ? "active" : ""}`}
            onClick={() => setActiveFilter("starred")}
          >
            <Star size={16} /> Starred
          </button>
          <button
            className={`nav-btn ${activeFilter === "important" ? "active" : ""}`}
            onClick={() => setActiveFilter("important")}
          >
            <Star size={16} /> Important
          </button>
          <button
            className={`nav-btn ${activeFilter === "spam" ? "active" : ""}`}
            onClick={() => setActiveFilter("spam")}
          >
            <Mail size={16} /> Spam
          </button>
        </div>
        <div className="email-list">
          <ul>
            {emails && filteredEmails().length > 0 ? (
              filteredEmails().map((email) => (
                <li
                  key={email.id}
                  className={`email-item ${email.read ? "read" : "unread"} ${
                    selectedEmail?.id === email.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="email-header">
                    <div className="email-sender-wrapper">
                      <span className="email-initial">{getInitial(email.from)}</span>
                      <span className="email-sender">{email.from}</span>
                    </div>
                    <span className="email-date">{email.date}</span>
                  </div>
                  <div className="email-subject">{email.subject}</div>
                  <div className="email-preview">{email.preview}</div>
                </li>
              ))
            ) : (
              <li className="email-item">No emails loaded yet</li>
            )}
          </ul>
        </div>
        <div className="email-content">
          {selectedEmail ? (
            <div className="email-detail">
              <div className="email-detail-header">
                <h2 className="email-detail-subject">{selectedEmail.subject}</h2>
                <span className="email-detail-date">{selectedEmail.date}</span>
              </div>
              <p>
                <strong>From:</strong> {selectedEmail.from}
              </p>
              <div className="email-detail-content">
                {selectedEmail.content.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          ) : (
            <p className="empty-state">Select an email to view its contents</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;








// import React, { useState, useEffect, useRef } from "react";
// import { Mail, Star } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./inbox.css";

// const Inbox = () => {
//   const navigate = useNavigate();
//   const [emails, setEmails] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("inbox");
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
//   const recognitionRef = useRef(null);
//   const abortControllerRef = useRef(null);
//   const phaseRef = useRef("main");
//   const pendingFilterRef = useRef(null);

//   const formatDate = (rawDate) => {
//     if (!rawDate) return "Unknown Date";
//     const parts = rawDate.split(" ");
//     if (parts.length > 5) {
//       parts.pop();
//     }
//     return parts.join(" ");
//   };

//   const speak = (text, onEnd) => {
//     stopSpeech();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     if (onEnd) utterance.onend = onEnd;
//     window.speechSynthesis.speak(utterance);
//     return utterance;
//   };

//   const speakLongContent = (text, onEnd) => {
//     stopSpeech();
//     const maxLength = 200;
//     const chunks = [];
//     for (let i = 0; i < text.length; i += maxLength) {
//       chunks.push(text.slice(i, i + maxLength));
//     }
//     console.log(`Speaking ${chunks.length} chunks for content length ${text.length}`);

//     let currentChunk = 0;
//     const speakNextChunk = () => {
//       if (currentChunk >= chunks.length) {
//         console.log("All chunks spoken, calling onEnd");
//         if (onEnd) onEnd();
//         return;
//       }

//       const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
//       utterance.lang = "en-US";
//       utterance.onend = () => {
//         console.log(`Chunk ${currentChunk + 1}/${chunks.length} completed`);
//         currentChunk++;
//         speakNextChunk();
//       };
//       utterance.onerror = (event) => {
//         console.error(`Speech error on chunk ${currentChunk}:`, event.error);
//         if (event.error === "interrupted" || event.error === "canceled") {
//           speakNextChunk();
//         }
//       };
//       console.log(`Speaking chunk ${currentChunk + 1}/${chunks.length}: ${chunks[currentChunk].substring(0, 30)}...`);
//       window.speechSynthesis.speak(utterance);
//     };

//     speakNextChunk();
//   };

//   const startRecognition = (onResult) => {
//     // Stop any existing recognition
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//       recognitionRef.current = null;
//       console.log("Stopped existing recognition");
//     }

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition not supported.");
//       speak("Speech recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript
//       .toLowerCase()
//       .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") // Remove punctuation
//       .trim();
//     console.log(`Recognized in ${phaseRef.current} phase:`, transcript);
//     onResult(transcript);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       if (event.error === "no-speech" || event.error === "aborted") {
//         speak("Sorry, I couldn't understand. Please try again.", () => {
//           setTimeout(() => startRecognition(onResult), 500);
//         });
//       } else {
//         speak("Speech recognition error. Please try again.", () => {
//           setTimeout(() => startRecognition(onResult), 500);
//         });
//       }
//     };

//     recognition.onend = () => {
//       console.log("Recognition ended");
//       recognitionRef.current = null;
//     };

//     recognitionRef.current = recognition;
//     console.log("Starting recognition...");
//     recognition.start();
//   };

//   const stopSpeech = () => {
//     window.speechSynthesis.cancel();
//   };

//   const fetchEmails = async (filter) => {
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }
//     abortControllerRef.current = new AbortController();
//     const signal = abortControllerRef.current.signal;

//     try {
//       let endpoint;
//       switch (filter) {
//         case "spam":
//           endpoint = "get-spam-emails";
//           break;
//         case "starred":
//           endpoint = "get-starred-emails";
//           break;
//         case "important":
//           endpoint = "get-important-emails";
//           break;
//         default:
//           endpoint = "get-inbox-emails";
//       }
//       console.log(`Starting fetch from ${endpoint} for ${filter}`);
//       setEmails(null);
//       setSelectedEmail(null);
//       setCurrentEmailIndex(0);

//       const response = await fetch(`http://localhost:5001/${endpoint}`, { signal });
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       const data = await response.json();
//       console.log(`Fetched ${data.length} emails for ${filter}:`, data);

//       const mappedEmails = data.map((email) => ({
//         id: email.id,
//         from: email.from,
//         subject: email.subject || "No Subject",
//         preview: email.content || "No preview available",
//         content: email.content || "No content available",
//         date: formatDate(email.date),
//         read: false,
//         starred: filter === "starred",
//         important: filter === "important",
//         folder: filter === "spam" ? "spam" : "inbox",
//       }));

//       if (abortControllerRef.current.signal.aborted) return;
//       setEmails(mappedEmails);
//       setActiveFilter(filter);
//       return mappedEmails;
//     } catch (error) {
//       if (error.name === "AbortError") {
//         console.log(`Fetch aborted for ${filter}`);
//         return;
//       }
//       console.error(`Error fetching emails from ${filter}:`, error);
//       setEmails([]);
//       setSelectedEmail(null);
//       throw error;
//     }
//   };

//   const handleEmailCommands = (command, emailList, index) => {
//     console.log("Handling email command:", command);
//     switch (command) {
//       case "read.":
//         phaseRef.current = "content";
//         setSelectedEmail(emailList[index]);
//         speakLongContent(emailList[index].content, () => {
//           speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () => {
//             setTimeout(() => startRecognition((cmd) => handleContentCommands(cmd, emailList[index], emailList, index)), 500);
//           });
//         });
//         break;
//       case "next.":
//         readEmail(emailList, index + 1);
//         break;
//       case "stop.":
//         phaseRef.current = "main";
//         speak("Returning to main menu.", () => {
//           setTimeout(() => startRecognition(handleMainCommands), 500);
//         });
//         break;
//       default:
//         speak("Command not recognized. Say 'read', 'next', or 'stop'.", () => {
//           setTimeout(() => startRecognition((cmd) => handleEmailCommands(cmd, emailList, index)), 500);
//         });
//     }
//   };

//   const handleContentCommands = (command, email, emailList, index) => {
//     console.log("Handling content command:", command);
//     switch (command) {
//       case "next":
//         phaseRef.current = "reading";
//         readEmail(emailList, index + 1);
//         break;
//       case "back":
//         phaseRef.current = "reading";
//         readEmail(emailList, index);
//         break;
//       case "repeat":
//         speakLongContent(email.content, () => {
//           speak("Say 'next' for the next email, 'back' to return to the email list, or 'repeat' to hear this again.", () => {
//             setTimeout(() => startRecognition((cmd) => handleContentCommands(cmd, email, emailList, index)), 500);
//           });
//         });
//         break;
//       default:
//         speak("Command not recognized. Say 'next', 'back', or 'repeat'.", () => {
//           setTimeout(() => startRecognition((cmd) => handleContentCommands(cmd, email, emailList, index)), 500);
//         });
//     }
//   };

//   const readEmail = (emailList, index) => {
//     if (index >= emailList.length) {
//       speak("No more emails to read. Returning to main menu.", () => {
//         phaseRef.current = "main";
//         setTimeout(() => startRecognition(handleMainCommands), 500);
//       });
//       return;
//     }

//     const email = emailList[index];
//     setCurrentEmailIndex(index);
//     const text = `Subject: ${email.subject}. From: ${email.from}. Say 'read' to hear the full content, 'next' for the next email, or 'stop' to return to main commands.`;
//     speak(text, () => {
//       setTimeout(() => startRecognition((command) => handleEmailCommands(command, emailList, index)), 500);
//     });
//   };

//   useEffect(() => {
//     const initialize = () => {
//       const welcomeMessage = "Welcome to InVision. Available commands: 'go to inbox', 'go to starred', 'go to important', 'go to spam', 'help' for command list, 'menu' to return to main menu, 'logout' to log out.";
//       speak(welcomeMessage, () => {
//         phaseRef.current = "main";
//         setTimeout(() => startRecognition(handleMainCommands), 500);
//       });
//     };
//     initialize();

//     return () => stopSpeech();
//   }, []);

//   const handleMainCommands = (command) => {
//     const normalizedCommand = command.toLowerCase().trim();
//     const includesAny = (str, terms) => terms.some(term => str.includes(term));

//     console.log("Handling main command:", normalizedCommand);

//     switch (true) {
//       case normalizedCommand === "go to inbox":
//         phaseRef.current = "reading";
//         fetchEmails("inbox")
//           .then((fetchedEmails) => {
//             if (fetchedEmails && fetchedEmails.length > 0) {
//               readEmail(fetchedEmails, 0);
//             } else {
//               speak("No emails found in inbox. Returning to main menu.", () => {
//                 phaseRef.current = "main";
//                 setTimeout(() => startRecognition(handleMainCommands), 500);
//               });
//             }
//           })
//           .catch(() => {
//             speak("Error fetching inbox emails. Returning to main menu.", () => {
//               phaseRef.current = "main";
//               setTimeout(() => startRecognition(handleMainCommands), 500);
//             });
//           });
//         break;
//       case normalizedCommand === "go to starred" || includesAny(normalizedCommand, ["go to stars", "starred emails", "show starred"]):
//         pendingFilterRef.current = "starred";
//         speak("Navigate to starred? Say yes or no.", () => {
//           setTimeout(() => startRecognition(handleNavigationConfirmation), 500);
//         });
//         break;
//       case normalizedCommand === "go to important":
//         pendingFilterRef.current = "important";
//         speak("Navigate to important? Say yes or no.", () => {
//           setTimeout(() => startRecognition(handleNavigationConfirmation), 500);
//         });
//         break;
//       case normalizedCommand === "go to spam":
//         pendingFilterRef.current = "spam";
//         speak("Navigate to spam? Say yes or no.", () => {
//           setTimeout(() => startRecognition(handleNavigationConfirmation), 500);
//         });
//         break;
//       case normalizedCommand === "menu":
//         stopSpeech();
//         speak("Navigating to menu.", () => navigate("/menu"));
//         break;
//       case normalizedCommand === "log out":
//         stopSpeech();
//         speak("Are you sure you want to log out? Say yes or no.", () => {
//           setTimeout(() => startRecognition(handleLogoutConfirmation), 500);
//         });
//         break;
//       case normalizedCommand === "help":
//         speak(
//           "Available commands: 'go to inbox', 'go to starred' or 'starred emails', 'go to important', 'go to spam', 'help', 'menu', 'logout'",
//           () => {
//             setTimeout(() => startRecognition(handleMainCommands), 500);
//           }
//         );
//         break;
//       default:
//         speak("Command not recognized. Say 'help' for options.", () => {
//           setTimeout(() => startRecognition(handleMainCommands), 500);
//         });
//         break;
//     }
//   };

//   const handleNavigationConfirmation = (response) => {
//     const normalizedResponse = response.toLowerCase().trim();
//     console.log("Navigation confirmation response:", normalizedResponse);

//     if (normalizedResponse === "yes" && pendingFilterRef.current) {
//       const newFilter = pendingFilterRef.current;
//       phaseRef.current = "reading";
//       fetchEmails(newFilter)
//         .then((fetchedEmails) => {
//           if (fetchedEmails && fetchedEmails.length > 0) {
//             speak(`Navigated to ${newFilter}. Starting with the first email.`, () => {
//               readEmail(fetchedEmails, 0);
//             });
//           } else {
//             speak(`No emails found in ${newFilter}. Returning to main menu.`, () => {
//               phaseRef.current = "main";
//               setTimeout(() => startRecognition(handleMainCommands), 500);
//             });
//           }
//         })
//         .catch(() => {
//           speak(`Error fetching ${newFilter} emails. Returning to main menu.`, () => {
//             phaseRef.current = "main";
//             setTimeout(() => startRecognition(handleMainCommands), 500);
//           });
//         });
//       pendingFilterRef.current = null;
//     } else {
//       speak("Staying in current folder. Returning to main menu.", () => {
//         pendingFilterRef.current = null;
//         phaseRef.current = "main";
//         setTimeout(() => startRecognition(handleMainCommands), 500);
//       });
//     }
//   };

//   const handleLogoutConfirmation = (response) => {
//     const normalizedResponse = response.toLowerCase().trim();
//     console.log("handleLogoutConfirmation: Response received:", normalizedResponse);
//     if (normalizedResponse === "yes") {
//       console.log("handleLogoutConfirmation: User said 'yes', proceeding with logout");
//       stopSpeech();
//       try {
//         speak("Logging out.", () => {
//           console.log("handleLogoutConfirmation: 'Logging out' speech ended");
//           localStorage.removeItem("authToken");
//           console.log("handleLogoutConfirmation: authToken removed from localStorage");
//           navigate("/");
//           console.log("handleLogoutConfirmation: Navigated to /");
//         });
//       } catch (error) {
//         console.error("handleLogoutConfirmation: Error during logout:", error);
//         speak("Error during logout. Please try again.", () => {
//           setTimeout(() => startRecognition(handleMainCommands), 500);
//         });
//       }
//     } else {
//       console.log("handleLogoutConfirmation: User said 'no' or unrecognized, canceling logout");
//       stopSpeech();
//       speak("Logout canceled. Returning to main menu.", () => {
//         phaseRef.current = "main";
//         setTimeout(() => startRecognition(handleMainCommands), 500);
//       });
//     }
//   };

//   const filteredEmails = () => {
//     if (!emails) return [];
//     console.log(`Filtering emails for ${activeFilter}, total emails: ${emails.length}`, emails);
//     if (activeFilter === "starred") return emails.filter((email) => email.starred);
//     if (activeFilter === "important") return emails.filter((email) => email.important);
//     if (activeFilter === "sent") return [];
//     if (activeFilter === "spam") return emails.filter((email) => email.folder === "spam");
//     return emails.filter((email) => email.folder === "inbox");
//   };

//   const getInitial = (name) => {
//     const namePart = name.split("<")[0].trim();
//     return namePart.charAt(0).toUpperCase();
//   };

//   return (
//     <div className="inbox-app">
//       <div className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn" onClick={() => navigate("/")}>Logout</button>
//       </div>
//       <div className="main-content">
//         <div className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "inbox" ? "active" : ""}`}
//             onClick={() => setActiveFilter("inbox")}
//           >
//             <Mail size={16} /> Inbox
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "starred" ? "active" : ""}`}
//             onClick={() => setActiveFilter("starred")}
//           >
//             <Star size={16} /> Starred
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "important" ? "active" : ""}`}
//             onClick={() => setActiveFilter("important")}
//           >
//             <Star size={16} /> Important
//           </button>
//           <button
//             className={`nav-btn ${activeFilter === "spam" ? "active" : ""}`}
//             onClick={() => setActiveFilter("spam")}
//           >
//             <Mail size={16} /> Spam
//           </button>
//         </div>
//         <div className="email-list">
//           <ul>
//             {emails && filteredEmails().length > 0 ? (
//               filteredEmails().map((email) => (
//                 <li
//                   key={email.id}
//                   className={`email-item ${email.read ? "read" : "unread"} ${
//                     selectedEmail?.id === email.id ? "selected" : ""
//                   }`}
//                   onClick={() => setSelectedEmail(email)}
//                 >
//                   <div className="email-header">
//                     <div className="email-sender-wrapper">
//                       <span className="email-initial">{getInitial(email.from)}</span>
//                       <span className="email-sender">{email.from}</span>
//                     </div>
//                     <span className="email-date">{email.date}</span>
//                   </div>
//                   <div className="email-subject">{email.subject}</div>
//                   <div className="email-preview">{email.preview}</div>
//                 </li>
//               ))
//             ) : (
//               <li className="email-item">No emails loaded yet</li>
//             )}
//           </ul>
//         </div>
//         <div className="email-content">
//           {selectedEmail ? (
//             <div className="email-detail">
//               <div className="email-detail-header">
//                 <h2 className="email-detail-subject">{selectedEmail.subject}</h2>
//                 <span className="email-detail-date">{selectedEmail.date}</span>
//               </div>
//               <p>
//                 <strong>From:</strong> {selectedEmail.from}
//               </p>
//               <div className="email-detail-content">
//                 {selectedEmail.content.split("\n").map((line, index) => (
//                   <p key={index}>{line}</p>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="empty-state">Select an email to view its contents</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Inbox;