// import { useState } from "react";
// import { Mail, Star } from "lucide-react"; // Importing icons from lucide-react
// import "./compose.css";

// const Compose = () => {
//   const [emailData, setEmailData] = useState({
//     description: "",
//     to: "",
//     subject: "",
//     body: "",
//   });

//   const [file, setFile] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("compose"); // Default to "compose" view

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmailData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Email Data:", emailData);
//     console.log("Attached File:", file);
//   };

//   const handleDiscard = () => {
//     setEmailData({
//       description: "",
//       to: "",
//       subject: "",
//       body: "",
//     });
//     setFile(null);
//   };

//   return (
//     <div className="email-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn">Logout</button>
//       </nav>

//       <div className="main-content">
//         {/* Sidebar */}
//         <aside className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "compose" ? "active" : ""}`}
//             onClick={() => setActiveFilter("compose")}
//           >
//             <Mail size={16} /> Compose
//           </button>
//           {/* <button
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
//           </button> */}
//         </aside>

//         {/* Email Form (shown only when activeFilter is "compose") */}
//         {activeFilter === "compose" && (
//           <main className="email-form-container">
//             <h1 className="form-title">Compose Email</h1>
//             <form onSubmit={handleSubmit} className="email-form">
//               <div className="form-group">
//                 <label>Description:</label>
//                 <textarea
//                   name="description"
//                   value={emailData.description}
//                   onChange={handleChange}
//                   placeholder="Describe what you want to say in this email..."
//                   className="description-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>To:</label>
//                 <input
//                   type="email"
//                   name="to"
//                   value={emailData.to}
//                   onChange={handleChange}
//                   placeholder="recipient@example.com"
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Subject:</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={emailData.subject}
//                   onChange={handleChange}
//                   placeholder="Email subject"
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Body:</label>
//                 <textarea
//                   name="body"
//                   value={emailData.body}
//                   readOnly
//                   placeholder="Email body will be generated from your description..."
//                   className="body-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Attachments:</label>
//                 <label className="file-label">
//                   <input type="file" onChange={handleFileChange} className="file-input" />
//                   <span className="file-button">Add Attachment</span>
//                 </label>
//                 {file && <div className="file-name">{file.name}</div>}
//               </div>

//               <div className="button-group">
//                 <button type="submit" className="send-btn">Send</button>
//                 <button type="button" className="discard-btn" onClick={handleDiscard}>
//                   <span className="icon">🗑</span> Discard
//                 </button>
//               </div>
//             </form>
//           </main>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Compose;

// import { useState, useRef, useEffect } from "react"; // Added useRef and useEffect
// import { Mail } from "lucide-react";
// import "./compose.css";

// const Compose = () => {
//   const [emailData, setEmailData] = useState({
//     description: "",
//     to: "",
//     subject: "",
//     body: "",
//   });

//   const [file, setFile] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("compose");
//   const [generateLoading, setGenerateLoading] = useState(false);
//   const [sendLoading, setSendLoading] = useState(false);
//   const [isGenerated, setIsGenerated] = useState(false); // New state to track generation
//   const [error, setError] = useState(null);
//   const bodyTextareaRef = useRef(null); // Ref for body textarea

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmailData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const generateEmailBody = async () => {
//     setGenerateLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5000/generate-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: emailData.description }),
//       });

//       if (!response.ok) throw new Error("Failed to generate email");
//       const data = await response.json();
      
//       setEmailData((prev) => ({
//         ...prev,
//         body: data.email,
//         subject: data.subject || "",
//       }));
//       setIsGenerated(true); // Mark as generated
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setGenerateLoading(false);
//     }
//   };

//   // Adjust textarea height when body content changes
//   useEffect(() => {
//     if (bodyTextareaRef.current && emailData.body) {
//       bodyTextareaRef.current.style.height = "auto"; // Reset height
//       bodyTextareaRef.current.style.height = `${bodyTextareaRef.current.scrollHeight}px`; // Set to content height
//     }
//   }, [emailData.body]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSendLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:5000/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           receiverEmail: emailData.to,
//           subject: emailData.subject,
//           content: emailData.body,
//           ccEmails: [],
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to send email");
//       const data = await response.json();
//       console.log(data.message);
//       handleDiscard();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSendLoading(false);
//     }
//   };

//   const handleDiscard = () => {
//     setEmailData({
//       description: "",
//       to: "",
//       subject: "",
//       body: "",
//     });
//     setFile(null);
//     setError(null);
//     setIsGenerated(false); // Reset generation state
//   };

//   return (
//     <div className="email-container">
//       <nav className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn">Logout</button>
//       </nav>

//       <div className="main-content">
//         <aside className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "compose" ? "active" : ""}`}
//             onClick={() => setActiveFilter("compose")}
//           >
//             <Mail size={16} /> Compose
//           </button>
//         </aside>

//         {activeFilter === "compose" && (
//           <main className="email-form-container">
//             <h1 className="form-title">Compose Email</h1>
//             <form onSubmit={handleSubmit} className="email-form">
//               {/* Conditionally render description field */}
//               {!isGenerated && (
//                 <div className="form-group">
//                   <label>Description:</label>
//                   <textarea
//                     name="description"
//                     value={emailData.description}
//                     onChange={handleChange}
//                     placeholder="Describe what you want to say in this email..."
//                     className="description-input"
//                   />
//                   <label className="file-label">
//                     <button
//                       type="button"
//                       onClick={generateEmailBody}
//                       disabled={generateLoading || !emailData.description}
//                       className="file-button"
//                     >
//                       {generateLoading ? "Generating..." : "Generate"}
//                     </button>
//                   </label>
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>To:</label>
//                 <input
//                   type="email"
//                   name="to"
//                   value={emailData.to}
//                   onChange={handleChange}
//                   placeholder="recipient@example.com"
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Subject:</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={emailData.subject}
//                   onChange={handleChange}
//                   placeholder="Email subject will be generated automatically..."
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Body:</label>
//                 <textarea
//                   ref={bodyTextareaRef} // Attach ref
//                   name="body"
//                   value={emailData.body}
//                   onChange={handleChange}
//                   placeholder="Email body will be generated from your description..."
//                   className="body-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Attachments:</label>
//                 <label className="file-label">
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     className="file-input"
//                     disabled={generateLoading || sendLoading}
//                   />
//                   <span className="file-button">Add Attachment</span>
//                 </label>
//                 {file && <div className="file-name">{file.name}</div>}
//               </div>

//               {error && <div className="error-message">{error}</div>}

//               <div className="button-group">
//                 <button
//                   type="submit"
//                   className="send-btn"
//                   disabled={sendLoading || !emailData.body}
//                 >
//                   {sendLoading ? "Sending..." : "Send"}
//                 </button>
//                 <button
//                   type="button"
//                   className="discard-btn"
//                   onClick={handleDiscard}
//                 >
//                   <span className="icon">🗑</span> Discard
//                 </button>
//               </div>
//             </form>
//           </main>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Compose;


// import { useState, useRef, useEffect } from "react";
// import { Mail } from "lucide-react";
// import "./compose.css";

// const Compose = () => {
//   const [emailData, setEmailData] = useState({
//     description: "",
//     to: "",
//     subject: "",
//     body: "",
//   });

//   const [prevEmailData, setPrevEmailData] = useState(null);
//   const [file, setFile] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("compose");
//   const [generateLoading, setGenerateLoading] = useState(false);
//   const [sendLoading, setSendLoading] = useState(false);
//   const [isGenerated, setIsGenerated] = useState(false);
//   const [error, setError] = useState(null);
//   const bodyTextareaRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const [isRecognizing, setIsRecognizing] = useState(false);
//   const hasRun = useRef(false);

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       recognitionRef.current = new window.webkitSpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = "en-US";
//       recognitionRef.current.onstart = () => console.log("Speech recognition started");
//       recognitionRef.current.onend = () => {
//         console.log("Recognition ended, restarting if still needed");
//       };
//     } else {
//       console.error("SpeechRecognition not supported in this browser.");
//     }

//     return () => {
//       if (recognitionRef.current && isRecognizing) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // TTS Function with Chunking
//   const speak = (text, onEndCallback) => {
//     console.log("Speaking:", text);
//     const maxLength = 200;
//     if (text.length > maxLength) {
//       const chunks = [];
//       let start = 0;
//       while (start < text.length) {
//         let end = start + maxLength;
//         if (end < text.length) {
//           const lastSpace = text.lastIndexOf(" ", end);
//           if (lastSpace > start) end = lastSpace;
//         }
//         chunks.push(text.slice(start, end).trim());
//         start = end;
//       }
//       speakChunks(chunks, onEndCallback);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = "en-US";
//       if (onEndCallback) {
//         utterance.onend = () => {
//           console.log("Finished speaking:", text);
//           onEndCallback();
//         };
//       }
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   const speakChunks = (chunks, onEndCallback) => {
//     let index = 0;
//     const speakNext = () => {
//       if (index < chunks.length) {
//         const utterance = new SpeechSynthesisUtterance(chunks[index]);
//         utterance.lang = "en-US";
//         utterance.onend = () => {
//           console.log("Finished speaking chunk:", chunks[index]);
//           index++;
//           speakNext();
//         };
//         window.speechSynthesis.speak(utterance);
//       } else if (onEndCallback) {
//         onEndCallback();
//       }
//     };
//     speakNext();
//   };

//   // Start TTS on page load and trigger STT
//   useEffect(() => {
//     if (hasRun.current) return;
//     hasRun.current = true;

//     const startRecognition = () => {
//       setTimeout(() => {
//         if (recognitionRef.current && !isRecognizing) {
//           console.log("Starting recognition for description");
//           let timeoutId;
//           recognitionRef.current.onresult = (event) => {
//             clearTimeout(timeoutId);
//             const transcript = event.results[0][0].transcript.trim().toLowerCase();
//             console.log("Heard:", transcript);
//             if (transcript !== "please provide the email description") {
//               setEmailData((prev) => ({ ...prev, description: transcript }));
//               recognitionRef.current.stop();
//               setIsRecognizing(false);
//               generateEmailBody(transcript);
//             } else {
//               console.log("Ignoring TTS feedback, continuing to listen");
//             }
//           };
//           timeoutId = setTimeout(() => {
//             console.log("No valid response, asking again");
//             speak("Please provide the email description.", startRecognition);
//           }, 7000);
//           setIsRecognizing(true);
//           recognitionRef.current.start();
//         }
//       }, 1500);
//     };

//     speak("Please provide the email description.", startRecognition);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmailData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const generateEmailBody = async (description = emailData.description) => {
//     setGenerateLoading(true);
//     setError(null);
//     try {
//       window.speechSynthesis.cancel();
//       const response = await fetch("http://localhost:5000/generate-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: description }),
//       });

//       if (!response.ok) throw new Error("Failed to generate email");
//       const data = await response.json();

//       setPrevEmailData({ subject: emailData.subject, body: emailData.body });
//       setEmailData((prev) => ({
//         ...prev,
//         subject: data.subject || "",
//         body: data.email,
//       }));

//       const readSubject = `Subject: ${data.subject || "No subject provided"}`;
//       const readBody = `Body: ${data.email}`;

//       setTimeout(() => {
//         speak(readSubject, () => {
//           speak(readBody, () => {
//             const confirmContent = () => {
//               setTimeout(() => {
//                 if (recognitionRef.current && !isRecognizing) {
//                   console.log("Starting recognition for content confirmation");
//                   let timeoutId;
//                   recognitionRef.current.onresult = (event) => {
//                     clearTimeout(timeoutId);
//                     const response = event.results[0][0].transcript.trim().toLowerCase();
//                     console.log("Heard for content confirmation:", response);
//                     recognitionRef.current.stop();
//                     setIsRecognizing(false);
//                     if (response.includes("yes") || response.includes("yess")) {
//                       console.log("Content confirmed, proceeding to sender email");
//                       setIsGenerated(true);
//                       setGenerateLoading(false);
//                       askForSenderEmail(); // Proceed directly to recipient email
//                     } else {
//                       console.log("Content not confirmed, reverting");
//                       setEmailData((prev) => ({
//                         ...prev,
//                         subject: prevEmailData?.subject || "",
//                         body: prevEmailData?.body || "",
//                       }));
//                       setGenerateLoading(false);
//                       askForNewDescription();
//                     }
//                   };
//                   timeoutId = setTimeout(() => {
//                     console.log("No valid response, asking again");
//                     speak("Is this content correct?", confirmContent);
//                   }, 7000);
//                   setIsRecognizing(true);
//                   recognitionRef.current.start();
//                 }
//               }, 2000);
//             };
//             speak("Is this content correct?", confirmContent);
//           });
//         });
//       }, 1000);
//     } catch (err) {
//       console.error("Error generating email:", err);
//       setError(err.message);
//       setGenerateLoading(false);
//     }
//   };

//   const askForNewDescription = () => {
//     setTimeout(() => {
//       const requestNewDescription = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             console.log("Starting recognition for new description");
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const newDescription = event.results[0][0].transcript.trim();
//               console.log("Heard new description:", newDescription);
//               recognitionRef.current.stop();
//               setIsRecognizing(false);
//               setEmailData((prev) => ({ ...prev, description: newDescription }));
//               generateEmailBody(newDescription);
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak("Please provide a new email description.", requestNewDescription);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak("Please provide a new email description.", requestNewDescription);
//     }, 1000);
//   };

//   const askForSenderEmail = () => {
//     setTimeout(() => {
//       const requestEmail = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const email = event.results[0][0].transcript.trim();
//               console.log("Heard email:", email);
//               recognitionRef.current.stop();
//               setIsRecognizing(false);
//               setEmailData((prev) => ({ ...prev, to: email }));
//               confirmSenderEmail(email);
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak("Please provide the recipient email address.", requestEmail);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak("Please provide the recipient email address.", requestEmail);
//     }, 1000);
//   };

//   const confirmSenderEmail = (email) => {
//     setTimeout(() => {
//       const confirmEmail = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const response = event.results[0][0].transcript.trim().toLowerCase();
//               console.log("Heard confirmation:", response);
//               recognitionRef.current.stop();
//               setIsRecognizing(false);
//               if (response.includes("yes") || response.includes("yess")) {
//                 askToSendEmail();
//               } else {
//                 askForSenderEmail();
//               }
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak(`Is ${email} correct?`, confirmEmail);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak(`Is ${email} correct?`, confirmEmail);
//     }, 1000);
//   };

//   const askToSendEmail = () => {
//     setTimeout(() => {
//       const confirmSend = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const response = event.results[0][0].transcript.trim().toLowerCase();
//               console.log("Heard send confirmation:", response);
//               recognitionRef.current.stop();
//               setIsRecognizing(false);
//               if (response.includes("yes") || response.includes("yess")) {
//                 handleSubmit({ preventDefault: () => {} });
//               }
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak("Do you want to send the email?", confirmSend);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak("Do you want to send the email?", confirmSend);
//     }, 1000);
//   };

//   useEffect(() => {
//     if (bodyTextareaRef.current && emailData.body) {
//       bodyTextareaRef.current.style.height = "auto";
//       bodyTextareaRef.current.style.height = `${bodyTextareaRef.current.scrollHeight}px`;
//     }
//   }, [emailData.body]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSendLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("http://localhost:5000/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           receiverEmail: emailData.to,
//           subject: emailData.subject,
//           content: emailData.body,
//           ccEmails: [],
//         }),
//       });

//       if (!response.ok) throw new Error("Failed to send email");
//       const data = await response.json();
//       console.log(data.message);
//       handleDiscard();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSendLoading(false);
//     }
//   };

//   const handleDiscard = () => {
//     setEmailData({
//       description: "",
//       to: "",
//       subject: "",
//       body: "",
//     });
//     setPrevEmailData(null);
//     setFile(null);
//     setError(null);
//     setIsGenerated(false);
//   };

//   return (
//     <div className="email-container">
//       <nav className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn">Logout</button>
//       </nav>

//       <div className="main-content">
//         <aside className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "compose" ? "active" : ""}`}
//             onClick={() => setActiveFilter("compose")}
//           >
//             <Mail size={16} /> Compose
//           </button>
//         </aside>

//         {activeFilter === "compose" && (
//           <main className="email-form-container">
//             <h1 className="personally-title">Compose Email</h1>
//             <form onSubmit={handleSubmit} className="email-form">
//               {!isGenerated && (
//                 <div className="form-group">
//                   <label>Description:</label>
//                   <textarea
//                     name="description"
//                     value={emailData.description}
//                     onChange={handleChange}
//                     placeholder="Describe what you want to say in this email..."
//                     className="description-input"
//                   />
//                   <label className="file-label">
//                     <button
//                       type="button"
//                       onClick={() => generateEmailBody()}
//                       disabled={generateLoading || !emailData.description}
//                       className="file-button"
//                     >
//                       {generateLoading ? "Generating..." : "Generate"}
//                     </button>
//                   </label>
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>To:</label>
//                 <input
//                   type="email"
//                   name="to"
//                   value={emailData.to}
//                   onChange={handleChange}
//                   placeholder="recipient@example.com"
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Subject:</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={emailData.subject}
//                   onChange={handleChange}
//                   placeholder="Email subject will be generated automatically..."
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Body:</label>
//                 <textarea
//                   ref={bodyTextareaRef}
//                   name="body"
//                   value={emailData.body}
//                   onChange={handleChange}
//                   placeholder="Email body will be generated from your description..."
//                   className="body-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Attachments:</label>
//                 <label className="file-label">
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     className="file-input"
//                     disabled={generateLoading || sendLoading}
//                   />
//                   <span className="file-button">Add Attachment</span>
//                 </label>
//                 {file && <div className="file-name">{file.name}</div>}
//               </div>

//               {error && <div className="error-message">{error}</div>}

//               <div className="button-group">
//                 <button
//                   type="submit"
//                   className="send-btn"
//                   disabled={sendLoading || !emailData.body}
//                 >
//                   {sendLoading ? "Sending..." : "Send"}
//                 </button>
//                 <button
//                   type="button"
//                   className="discard-btn"
//                   onClick={handleDiscard}
//                 >
//                   <span className="icon">🗑</span> Discard
//                 </button>
//               </div>
//             </form>
//           </main>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Compose;

import { useState, useRef, useEffect } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./compose.css";

const Compose = () => {
  const [emailData, setEmailData] = useState({
    description: "",
    to: "",
    subject: "",
    body: "",
  });
  const emailDataRef = useRef(emailData); // Persistent storage
  const [prevEmailData, setPrevEmailData] = useState(null);
  const [file, setFile] = useState(null);
  const [activeFilter, setActiveFilter] = useState("compose");
  const [generateLoading, setGenerateLoading] = useState(false);
  const [sendLoading, setSendLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [error, setError] = useState(null);
  const bodyTextareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const recognitionSessionId = useRef(0);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const hasRun = useRef(false);
  const debounceTimeout = useRef(null);
  const navigate = useNavigate();

  // Log component mount
  useEffect(() => {
    console.log("Compose component mounted");
    return () => console.log("Compose component unmounted");
  }, []);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        console.log("Speech recognition started");
        setIsRecognizing(true);
      };

      recognitionRef.current.onend = () => {
        console.log("Recognition ended");
        setIsRecognizing(false);
      };
    } else {
      console.error("SpeechRecognition not supported in this browser.");
    }

    return () => {
      audioContextRef.current.close();
      if (recognitionRef.current && isRecognizing) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.log("No authenticated user found, redirecting to login...");
      setError("Please log in to send emails.");
      navigate("/login");
    }
  }, [navigate]);

  // Sync emailDataRef with emailData
  useEffect(() => {
    emailDataRef.current = emailData;
    console.log("emailData updated in ref:", emailDataRef.current);
  }, [emailData]);

  const stopRecognition = async () => {
    return new Promise((resolve) => {
      if (!recognitionRef.current || !isRecognizing) return resolve();

      console.log("Stopping recognition...");
      recognitionRef.current.abort();

      const checkStop = () => {
        if (!isRecognizing) {
          console.log("Recognition fully stopped");
          resolve();
        } else {
          setTimeout(checkStop, 100);
        }
      };

      checkStop();
    });
  };

  const speak = async (text, onEndCallback) => {
    await stopRecognition();
    window.speechSynthesis.cancel();

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      utterance.onend = () => {
        console.log("Finished speaking:", text);
        setTimeout(() => {
          if (onEndCallback) onEndCallback();
          resolve();
        }, 1500);
      };

      window.speechSynthesis.speak(utterance);
    });
  };

  const startRecognition = (onResult, onTimeout, promptText) => {
    const sessionId = ++recognitionSessionId.current;

    const cleanUp = () => {
      clearTimeout(timeoutId);
      recognitionRef.current.onresult = null;
    };

    const handleResult = async (event) => {
      if (sessionId !== recognitionSessionId.current) return;

      cleanUp();
      let transcript = event.results[0][0].transcript.trim().toLowerCase();
      transcript = transcript.replace(/[.!?]$/, "");
      const expectedPrompt = promptText.toLowerCase();

      if (transcript.startsWith(expectedPrompt) || transcript === expectedPrompt) {
        console.log("Filtered TTS echo");
        return restartRecognition();
      }

      console.log("Valid user input:", transcript);
      onResult(transcript);
    };

    const handleTimeout = async () => {
      if (sessionId !== recognitionSessionId.current) return;
      console.log("Recognition timeout");
      cleanUp();
      onTimeout();
    };

    const restartRecognition = async () => {
      await stopRecognition();
      startRecognition(onResult, onTimeout, promptText);
    };

    let timeoutId;
    const start = async () => {
      await stopRecognition();

      if (sessionId !== recognitionSessionId.current) return;

      recognitionRef.current.onresult = handleResult;
      timeoutId = setTimeout(handleTimeout, 10000);

      try {
        console.log("Starting recognition session:", sessionId);
        recognitionRef.current.start();
      } catch (error) {
        console.error("Recognition start error:", error);
        setTimeout(restartRecognition, 500);
      }
    };

    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(start, 1000);
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const requestDescription = async () => {
      await speak("Please provide the email description.");
      startRecognition(
        (transcript) => {
          setEmailData((prev) => {
            const newData = { ...prev, description: transcript };
            console.log("Set description:", newData);
            return newData;
          });
          generateEmailBody(transcript);
        },
        requestDescription,
        "Please provide the email description"
      );
    };
    requestDescription();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prev) => {
      const newData = { ...prev, [name]: value };
      console.log("Manual input update:", newData);
      return newData;
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const generateEmailBody = async (description = emailData.description) => {
    setGenerateLoading(true);
    setError(null);
    try {
      window.speechSynthesis.cancel();
      const response = await fetch("http://localhost:5000/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description }),
      });

      if (!response.ok) throw new Error("Failed to generate email");
      const data = await response.json();

      setPrevEmailData({ subject: emailData.subject, body: emailData.body });
      setEmailData((prev) => {
        const newData = {
          ...prev,
          subject: data.subject || "No Subject",
          body: data.email || "No Content",
        };
        console.log("Generated email data:", newData);
        return newData;
      });

      await speak(`Subject: ${data.subject || "No subject provided"}`);
      await speak(`Body: ${data.email || "No content provided"}`);
      confirmContent(data.subject, data.email);
    } catch (err) {
      console.error("Error generating email:", err);
      setError(err.message);
      setGenerateLoading(false);
    }
  };

  const confirmContent = async (subject, body) => {
    await speak("Is this content correct?");
    startRecognition(
      (response) => {
        if (response.match(/(yes|yeah|correct)/i)) {
          setIsGenerated(true);
          setGenerateLoading(false);
          askForSenderEmail();
        } else {
          revertToPreviousContent();
        }
      },
      () => confirmContent(subject, body),
      "Is this content correct"
    );
  };

  const revertToPreviousContent = () => {
    setEmailData((prev) => {
      const newData = {
        ...prev,
        subject: prevEmailData?.subject || "",
        body: prevEmailData?.body || "",
      };
      console.log("Reverted to previous content:", newData);
      return newData;
    });
    setGenerateLoading(false);
    askForNewDescription();
  };

  const askForNewDescription = async () => {
    await speak("Please provide a new email description.");
    startRecognition(
      (newDescription) => {
        setEmailData((prev) => {
          const newData = { ...prev, description: newDescription };
          console.log("Set new description:", newData);
          return newData;
        });
        generateEmailBody(newDescription);
      },
      askForNewDescription,
      "Please provide a new email description"
    );
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const askForSenderEmail = async () => {
    await speak("Please provide the recipient email address.");
    startRecognition(
      async (rawEmail) => {
        const email = rawEmail.replace(/\s+/g, "").toLowerCase();
        if (isValidEmail(email)) {
          setEmailData((prev) => {
            const updatedData = { ...prev, to: email };
            console.log("Updated emailData after setting 'to':", updatedData);
            return updatedData;
          });
          await confirmSenderEmail(email);
        } else {
          await handleInvalidEmail();
        }
      },
      askForSenderEmail,
      "Please provide the recipient email address"
    );
  };

  const handleInvalidEmail = async () => {
    await speak("That doesn't seem like a valid email address. Please try again.");
    askForSenderEmail();
  };

  const confirmSenderEmail = async (email) => {
    await speak(`Is ${email} correct?`);
    startRecognition(
      (response) => {
        if (response.match(/(yes|correct)/i)) {
          askToSendEmail();
        } else {
          askForSenderEmail();
        }
      },
      () => confirmSenderEmail(email),
      `Is ${email} correct`
    );
  };

  const askToSendEmail = async () => {
    await speak("Do you want to send the email?");
    startRecognition(
      (response) => {
        if (response.match(/(yes|yeah|send)/i)) {
          console.log("Preparing to send email with emailData:", emailDataRef.current);
          handleSubmit({ preventDefault: () => {}, emailData: emailDataRef.current });
        } else {
          console.log("Email not sent, ending process");
        }
      },
      askToSendEmail,
      "Do you want to send the email"
    );
  };

  useEffect(() => {
    if (bodyTextareaRef.current && emailData.body) {
      bodyTextareaRef.current.style.height = "auto";
      bodyTextareaRef.current.style.height = `${bodyTextareaRef.current.scrollHeight}px`;
    }
  }, [emailData.body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentEmailData = e.emailData || emailData;
    setSendLoading(true);
    setError(null);
  
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      setError("No authenticated user found. Please log in.");
      setSendLoading(false);
      navigate("/login");
      return;
    }
  
    const payload = {
      senderEmail: userEmail,          // Changed from 'from'
      receiverEmail: currentEmailData.to,  // Changed from 'to'
      subject: currentEmailData.subject,
      content: currentEmailData.body,  // Changed from 'body'
      ccEmails: [],                   // Optional, empty array for now
    };
  
    console.log("Sending email with payload:", payload);
  
    if (!payload.senderEmail || !payload.receiverEmail || !payload.subject || !payload.content) {
      setError("Cannot send email: Missing required fields (senderEmail, receiverEmail, subject, or content)");
      setSendLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log("Server response:", {
          status: response.status,
          statusText: response.statusText,
          body: errorData,
        });
        throw new Error(`Failed to send email: ${errorData.error || response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Email sent successfully:", data.message);
      handleDiscard();
    } catch (err) {
      console.error("Error sending email:", err);
      setError(err.message);
    } finally {
      setSendLoading(false);
    }
  };

  const handleDiscard = () => {
    setEmailData({ description: "", to: "", subject: "", body: "" });
    setPrevEmailData(null);
    setFile(null);
    setError(null);
    setIsGenerated(false);
  };

  return (
    <div className="email-container">
      <nav className="navbar">
        <span className="logo">InVision</span>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("userEmail");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </nav>

      <div className="main-content">
        <aside className="sidebar">
          <button
            className={`nav-btn ${activeFilter === "compose" ? "active" : ""}`}
            onClick={() => setActiveFilter("compose")}
          >
            <Mail size={16} /> Compose
          </button>
        </aside>

        {activeFilter === "compose" && (
          <main className="email-form-container">
            <h1 className="personally-title">Compose Email</h1>
            <form onSubmit={handleSubmit} className="email-form">
              {!isGenerated && (
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={emailData.description}
                    onChange={handleChange}
                    placeholder="Describe what you want to say in this email..."
                    className="description-input"
                  />
                  <label className="file-label">
                    <button
                      type="button"
                      onClick={() => generateEmailBody()}
                      disabled={generateLoading || !emailData.description}
                      className="file-button"
                    >
                      {generateLoading ? "Generating..." : "Generate"}
                    </button>
                  </label>
                </div>
              )}

              <div className="form-group">
                <label>To:</label>
                <input
                  type="email"
                  name="to"
                  value={emailData.to}
                  onChange={handleChange}
                  placeholder="recipient@example.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Subject:</label>
                <input
                  type="text"
                  name="subject"
                  value={emailData.subject}
                  onChange={handleChange}
                  placeholder="Email subject will be generated automatically..."
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Body:</label>
                <textarea
                  ref={bodyTextareaRef}
                  name="body"
                  value={emailData.body}
                  onChange={handleChange}
                  placeholder="Email body will be generated from your description..."
                  className="body-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Attachments:</label>
                <label className="file-label">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-input"
                    disabled={generateLoading || sendLoading}
                  />
                  <span className="file-button">Add Attachment</span>
                </label>
                {file && <div className="file-name">{file.name}</div>}
              </div>

              {error && <div className="error-message">{error}</div>}

              <div className="button-group">
                <button
                  type="submit"
                  className="send-btn"
                  disabled={sendLoading || !emailData.body}
                >
                  {sendLoading ? "Sending..." : "Send"}
                </button>
                <button
                  type="button"
                  className="discard-btn"
                  onClick={handleDiscard}
                >
                  <span className="icon">🗑</span> Discard
                </button>
              </div>
            </form>
          </main>
        )}
      </div>
    </div>
  );
};

export default Compose;


// import { useState, useRef, useEffect } from "react";
// import { Mail } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import "./compose.css";

// const Compose = () => {
//   const [emailData, setEmailData] = useState({
//     description: "",
//     to: "",
//     subject: "",
//     body: "",
//   });

//   const [prevEmailData, setPrevEmailData] = useState(null);
//   const [file, setFile] = useState(null);
//   const [activeFilter, setActiveFilter] = useState("compose");
//   const [generateLoading, setGenerateLoading] = useState(false);
//   const [sendLoading, setSendLoading] = useState(false);
//   const [isGenerated, setIsGenerated] = useState(false);
//   const [error, setError] = useState(null);
//   const bodyTextareaRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const [isRecognizing, setIsRecognizing] = useState(false);
//   const hasRun = useRef(false);
//   const navigate = useNavigate();

//   // Initialize Speech Recognition
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window) {
//       recognitionRef.current = new window.webkitSpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = "en-US";
//       recognitionRef.current.onstart = () => {
//         console.log("Speech recognition started");
//         setIsRecognizing(true);
//       };
//       recognitionRef.current.onend = () => {
//         console.log("Recognition ended, restarting if still needed");
//         setIsRecognizing(false);
//       };
//       recognitionRef.current.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//         setIsRecognizing(false);
//         if (event.error === "no-speech") {
//           speak("No speech detected. Please try again.");
//         } else if (event.error === "not-allowed") {
//           speak("Microphone access denied. Please allow microphone access.");
//         }
//       };
//     } else {
//       console.error("SpeechRecognition not supported in this browser.");
//       setError("Speech recognition is not supported in this browser.");
//       speak("Speech recognition is not supported in this browser.");
//     }

//     return () => {
//       if (recognitionRef.current && isRecognizing) {
//         recognitionRef.current.stop();
//       }
//       // Avoid canceling speech synthesis on cleanup to prevent interrupting TTS
//       // window.speechSynthesis.cancel();
//     };
//   }, []);

//   // TTS Function with Chunking
//   const speak = (text, onEndCallback) => {
//     console.log("Speaking:", text);
//     // Only cancel ongoing speech if necessary
//     window.speechSynthesis.cancel();
//     const maxLength = 200;
//     if (text.length > maxLength) {
//       const chunks = [];
//       let start = 0;
//       while (start < text.length) {
//         let end = start + maxLength;
//         if (end < text.length) {
//           const lastSpace = text.lastIndexOf(" ", end);
//           if (lastSpace > start) end = lastSpace;
//         }
//         chunks.push(text.slice(start, end).trim());
//         start = end;
//       }
//       speakChunks(chunks, onEndCallback);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = "en-US";
//       utterance.onstart = () => {
//         console.log("Speech started:", text);
//       };
//       utterance.onend = () => {
//         console.log("Speech ended:", text);
//         if (onEndCallback) onEndCallback();
//       };
//       utterance.onerror = (event) => {
//         console.error("Speech synthesis error:", event.error);
//       };
//       // Add a slight delay to ensure the speech synthesis engine is ready
//       setTimeout(() => {
//         window.speechSynthesis.speak(utterance);
//       }, 100);
//     }
//   };

//   const speakChunks = (chunks, onEndCallback) => {
//     let index = 0;
//     const speakNext = () => {
//       if (index < chunks.length) {
//         const utterance = new SpeechSynthesisUtterance(chunks[index]);
//         utterance.lang = "en-US";
//         utterance.onstart = () => {
//           console.log("Speech started for chunk:", chunks[index]);
//         };
//         utterance.onend = () => {
//           console.log("Speech ended for chunk:", chunks[index]);
//           index++;
//           speakNext();
//         };
//         utterance.onerror = (event) => {
//           console.error("Speech synthesis error for chunk:", event.error);
//         };
//         window.speechSynthesis.speak(utterance);
//       } else if (onEndCallback) {
//         onEndCallback();
//       }
//     };
//     speakNext();
//   };

//   // Start TTS on page load and trigger STT
//   useEffect(() => {
//     if (hasRun.current) return;
//     hasRun.current = true;

//     // Check if the user is logged in
//     const userEmail = localStorage.getItem("userEmail");
//     if (!userEmail) {
//       setError("You are not logged in. Please log in to compose an email.");
//       speak("You are not logged in. Please log in to compose an email.", () => {
//         navigate("/login", { replace: true });
//       });
//       return;
//     }

//     const startRecognition = () => {
//       setTimeout(() => {
//         if (recognitionRef.current && !isRecognizing) {
//           console.log("Starting recognition for description");
//           let timeoutId;
//           recognitionRef.current.onresult = (event) => {
//             clearTimeout(timeoutId);
//             const transcript = event.results[0][0].transcript.trim().toLowerCase();
//             console.log("Heard:", transcript);
//             if (transcript !== "please provide the email description") {
//               setEmailData((prev) => ({ ...prev, description: transcript }));
//               recognitionRef.current.stop();
//               generateEmailBody(transcript);
//             } else {
//               console.log("Ignoring TTS feedback, continuing to listen");
//             }
//           };
//           timeoutId = setTimeout(() => {
//             console.log("No valid response, asking again");
//             speak("Please provide the email description.", startRecognition);
//           }, 7000);
//           setIsRecognizing(true);
//           recognitionRef.current.start();
//         }
//       }, 1500);
//     };

//     // Add a delay to ensure TTS works after navigation
//     setTimeout(() => {
//       speak("Please provide the email description.", startRecognition);
//     }, 500);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmailData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const generateEmailBody = async (description = emailData.description) => {
//     setGenerateLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("http://localhost:5000/generate-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: description }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to generate email");
//       }
//       const data = await response.json();
//       console.log("Generated email:", data);

//       setPrevEmailData({ subject: emailData.subject, body: emailData.body });
//       setEmailData((prev) => ({
//         ...prev,
//         subject: data.subject || "",
//         body: data.email,
//       }));

//       const readSubject = `Subject: ${data.subject || "No subject provided"}`;
//       const readBody = `Body: ${data.email}`;

//       setTimeout(() => {
//         speak(readSubject, () => {
//           speak(readBody, () => {
//             const confirmContent = () => {
//               setTimeout(() => {
//                 if (recognitionRef.current && !isRecognizing) {
//                   console.log("Starting recognition for content confirmation");
//                   let timeoutId;
//                   recognitionRef.current.onresult = (event) => {
//                     clearTimeout(timeoutId);
//                     const response = event.results[0][0].transcript.trim().toLowerCase();
//                     console.log("Heard for content confirmation:", response);
//                     recognitionRef.current.stop();
//                     if (response.includes("yes") || response.includes("yess")) {
//                       console.log("Content confirmed, proceeding to recipient email");
//                       setIsGenerated(true);
//                       setGenerateLoading(false);
//                       askForSenderEmail();
//                     } else {
//                       console.log("Content not confirmed, reverting");
//                       setEmailData((prev) => ({
//                         ...prev,
//                         subject: prevEmailData?.subject || "",
//                         body: prevEmailData?.body || "",
//                       }));
//                       setGenerateLoading(false);
//                       askForNewDescription();
//                     }
//                   };
//                   timeoutId = setTimeout(() => {
//                     console.log("No valid response, asking again");
//                     speak("Is this content correct?", confirmContent);
//                   }, 7000);
//                   setIsRecognizing(true);
//                   recognitionRef.current.start();
//                 }
//               }, 2000);
//             };
//             speak("Is this content correct?", confirmContent);
//           });
//         });
//       }, 1000);
//     } catch (err) {
//       console.error("Error generating email:", err);
//       setError("Failed to generate email: " + err.message);
//       speak("Failed to generate email: " + err.message);
//       setGenerateLoading(false);
//     }
//   };

//   const askForNewDescription = () => {
//     setTimeout(() => {
//       const requestNewDescription = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             console.log("Starting recognition for new description");
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const newDescription = event.results[0][0].transcript.trim();
//               console.log("Heard new description:", newDescription);
//               recognitionRef.current.stop();
//               setEmailData((prev) => ({ ...prev, description: newDescription }));
//               generateEmailBody(newDescription);
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak("Please provide a new email description.", requestNewDescription);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak("Please provide a new email description.", requestNewDescription);
//     }, 1000);
//   };

//   const askForSenderEmail = () => {
//     setTimeout(() => {
//       const requestEmail = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const email = event.results[0][0].transcript.trim();
//               console.log("Heard email:", email);
//               recognitionRef.current.stop();
//               setEmailData((prev) => ({ ...prev, to: email }));
//               confirmSenderEmail(email);
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak("Please provide the recipient email address.", requestEmail);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak("Please provide the recipient email address.", requestEmail);
//     }, 1000);
//   };

//   const confirmSenderEmail = (email) => {
//     setTimeout(() => {
//       const confirmEmail = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const response = event.results[0][0].transcript.trim().toLowerCase();
//               console.log("Heard confirmation:", response);
//               recognitionRef.current.stop();
//               if (response.includes("yes") || response.includes("yess")) {
//                 askToSendEmail();
//               } else {
//                 askForSenderEmail();
//               }
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak(`Is ${email} correct?`, confirmEmail);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak(`Is ${email} correct?`, confirmEmail);
//     }, 1000);
//   };

//   const askToSendEmail = () => {
//     setTimeout(() => {
//       const confirmSend = () => {
//         setTimeout(() => {
//           if (recognitionRef.current && !isRecognizing) {
//             let timeoutId;
//             recognitionRef.current.onresult = (event) => {
//               clearTimeout(timeoutId);
//               const response = event.results[0][0].transcript.trim().toLowerCase();
//               console.log("Heard send confirmation:", response);
//               recognitionRef.current.stop();
//               if (response.includes("yes") || response.includes("yess")) {
//                 handleSubmit({ preventDefault: () => {} });
//               }
//             };
//             timeoutId = setTimeout(() => {
//               console.log("No valid response, asking again");
//               speak("Do you want to send the email?", confirmSend);
//             }, 7000);
//             setIsRecognizing(true);
//             recognitionRef.current.start();
//           }
//         }, 2000);
//       };
//       speak("Do you want to send the email?", confirmSend);
//     }, 1000);
//   };

//   useEffect(() => {
//     if (bodyTextareaRef.current && emailData.body) {
//       bodyTextareaRef.current.style.height = "auto";
//       bodyTextareaRef.current.style.height = `${bodyTextareaRef.current.scrollHeight}px`;
//     }
//   }, [emailData.body]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSendLoading(true);
//     setError(null);

//     const senderEmail = localStorage.getItem("userEmail");
//     if (!senderEmail) {
//       setError("No user email found. Please log in again.");
//       speak("No user email found. Please log in again.", () => {
//         navigate("/login", { replace: true });
//       });
//       setSendLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           senderEmail: senderEmail,
//           receiverEmail: emailData.to,
//           subject: emailData.subject,
//           content: emailData.body,
//           ccEmails: [],
//         }),
//       });

//       console.log("Send email response status:", response.status);
//       console.log("Send email response headers:", response.headers.get("Content-Type"));

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Failed to send email");
//       }

//       const data = await response.json();
//       console.log("Email sent successfully:", data.message);
//       speak("Email sent successfully.", () => {
//         handleDiscard();
//       });
//     } catch (err) {
//       console.error("Error sending email:", err);
//       setError("Failed to send email: " + err.message);
//       speak("Failed to send email: " + err.message);
//     } finally {
//       setSendLoading(false);
//     }
//   };

//   const handleDiscard = () => {
//     setEmailData({
//       description: "",
//       to: "",
//       subject: "",
//       body: "",
//     });
//     setPrevEmailData(null);
//     setFile(null);
//     setError(null);
//     setIsGenerated(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("userEmail");
//     // Avoid canceling speech synthesis here to prevent interrupting TTS
//     // window.speechSynthesis.cancel();
//     speak("Logging out.", () => {
//       navigate("/login", { replace: true });
//     });
//   };

//   return (
//     <div className="email-container">
//       <nav className="navbar">
//         <span className="logo">InVision</span>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </nav>

//       <div className="main-content">
//         <aside className="sidebar">
//           <button
//             className={`nav-btn ${activeFilter === "compose" ? "active" : ""}`}
//             onClick={() => setActiveFilter("compose")}
//           >
//             <Mail size={16} /> Compose
//           </button>
//         </aside>

//         {activeFilter === "compose" && (
//           <main className="email-form-container">
//             <h1 className="personally-title">Compose Email</h1>
//             <form onSubmit={handleSubmit} className="email-form">
//               {!isGenerated && (
//                 <div className="form-group">
//                   <label>Description:</label>
//                   <textarea
//                     name="description"
//                     value={emailData.description}
//                     onChange={handleChange}
//                     placeholder="Describe what you want to say in this email..."
//                     className="description-input"
//                   />
//                   <label className="file-label">
//                     <button
//                       type="button"
//                       onClick={() => generateEmailBody()}
//                       disabled={generateLoading || !emailData.description}
//                       className="file-button"
//                     >
//                       {generateLoading ? "Generating..." : "Generate"}
//                     </button>
//                   </label>
//                 </div>
//               )}

//               <div className="form-group">
//                 <label>To:</label>
//                 <input
//                   type="email"
//                   name="to"
//                   value={emailData.to}
//                   onChange={handleChange}
//                   placeholder="recipient@example.com"
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Subject:</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={emailData.subject}
//                   onChange={handleChange}
//                   placeholder="Email subject will be generated automatically..."
//                   className="form-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Body:</label>
//                 <textarea
//                   ref={bodyTextareaRef}
//                   name="body"
//                   value={emailData.body}
//                   onChange={handleChange}
//                   placeholder="Email body will be generated from your description..."
//                   className="body-input"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Attachments:</label>
//                 <label className="file-label">
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     className="file-input"
//                     disabled={generateLoading || sendLoading}
//                   />
//                   <span className="file-button">Add Attachment</span>
//                 </label>
//                 {file && <div className="file-name">{file.name}</div>}
//               </div>

//               {error && <div className="error-message">{error}</div>}

//               <div className="button-group">
//                 <button
//                   type="submit"
//                   className="send-btn"
//                   disabled={sendLoading || !emailData.body || !emailData.to}
//                 >
//                   {sendLoading ? "Sending..." : "Send"}
//                 </button>
//                 <button
//                   type="button"
//                   className="discard-btn"
//                   onClick={handleDiscard}
//                 >
//                   <span className="icon">🗑</span> Discard
//                 </button>
//               </div>
//             </form>
//           </main>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Compose;