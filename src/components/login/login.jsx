//working code before integrating voice

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate for routing

//   const hardcodedEmail = "draaft001@gmail.com";
//   const hardcodedPassword = "hxrvnhczikjuwlva";

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate credentials
//     if (email === hardcodedEmail && password === hardcodedPassword) {
//       setError("");
//       navigate("/menu"); // Redirect to the menu page
//     } else {
//       setError("Invalid Email ID or Password. Please try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="logo">
//         <h1>
//           <span>InVision</span>
//         </h1>
//       </div>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email ID"
//           className="input-field"
//           value={email}
//           autoComplete="on"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="input-field"
//           value={password}
//           autoComplete="on"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="login-button">
//           LOGIN
//         </button>
//       </form>
//       {error && <p className="error-text">{error}</p>}
//       <p className="register-text">
//         Don't have an account? <a href="#register">REGISTER NOW</a>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;




// working code after integrating voice

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const recognitionRef = useRef(null);

//   const hardcodedEmail = "draaft001@gmail.com";
//   const hardcodedPassword = "hxrvnhczikjuwlva";

//   const speak = (text, onEnd) => {
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     utterance.onend = () => {
//       console.log("TTS finished speaking:", text);
//       if (onEnd) onEnd();
//     };
//     utterance.onerror = (event) => console.error("TTS error:", event.error);
//     console.log("Attempting to speak:", text);
//     window.speechSynthesis.speak(utterance);
//   };

//   const startRecognition = (onResult) => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       speak("Speech recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       let transcript = event.results[0][0].transcript.toLowerCase().trim();
//       transcript = transcript.replace(" at ", "@").replace("at", "@").replace(/\s/g, "");
//       console.log("STT result:", transcript);
//       recognition.stop();
//       recognitionRef.current = null;
//       onResult(transcript);
//     };

//     recognition.onerror = (event) => {
//       console.error("STT error:", event.error);
//       recognition.stop();
//       recognitionRef.current = null;
//       if (event.error === "no-speech") {
//         speak("No response detected. Please try again.", () => startRecognition(onResult));
//       } else {
//         speak("Sorry, I couldn’t understand. Please try again.", () => startRecognition(onResult));
//       }
//     };

//     recognition.onend = () => {
//       console.log("STT ended");
//       recognitionRef.current = null;
//     };

//     recognitionRef.current = recognition;
//     console.log("Starting STT...");
//     recognition.start();
//   };

//   const promptForInput = (promptText, setter, nextStep) => {
//     speak(promptText, () => {
//       setTimeout(() => {
//         startRecognition((result) => {
//           setter(result);
//           if (nextStep) nextStep(result); // Pass result to next step
//         });
//       }, 1000);
//     });
//   };

//   useEffect(() => {
//     console.log("Login mounted, starting voice login...");
//     promptForInput(
//       "Welcome to InVision login. Please say your email ID, spelling it out letter by letter. You may speak now.",
//       setEmail,
//       (emailResult) => {
//         promptForInput(
//           "Now, please say your password, spelling it out letter by letter. You may speak now.",
//           setPassword,
//           (passwordResult) => handleSubmit({ preventDefault: () => {} }, emailResult, passwordResult)
//         );
//       }
//     );

//     return () => {
//       console.log("Login cleanup...");
//       window.speechSynthesis.cancel();
//       if (recognitionRef.current) recognitionRef.current.stop();
//     };
//   }, []);

//   const handleSubmit = (e, emailResult, passwordResult) => {
//     e.preventDefault();
//     const finalEmail = emailResult || email; // Use STT result if provided, else state
//     const finalPassword = passwordResult || password;
//     console.log("handleSubmit called with:", { finalEmail, finalPassword });
//     console.log("Comparing with hardcoded:", { hardcodedEmail, hardcodedPassword });
//     console.log("Email match:", finalEmail === hardcodedEmail, "Password match:", finalPassword === hardcodedPassword);

//     if (finalEmail === hardcodedEmail && finalPassword === hardcodedPassword) {
//       setError("");
//       speak("Login successful. Redirecting to menu.", () => navigate("/menu"));
//     } else {
//       setError("Invalid Email ID or Password. Please try again.");
//       speak("Invalid Email ID or Password. Please try again.", () => {
//         setEmail("");
//         setPassword("");
//         promptForInput(
//           "Please say your email ID, spelling it out letter by letter. You may speak now.",
//           setEmail,
//           (newEmailResult) => {
//             promptForInput(
//               "Please say your password, spelling it out letter by letter. You may speak now.",
//               setPassword,
//               (newPasswordResult) => handleSubmit({ preventDefault: () => {} }, newEmailResult, newPasswordResult)
//             );
//           }
//         );
//       });
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="logo">
//         <h1>
//           <span>InVision</span>
//         </h1>
//       </div>
//       <form className="login-form" onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email ID"
//           className="input-field"
//           value={email}
//           autoComplete="on"
//           onChange={(e) => setEmail(e.target.value)}
//           aria-label="Email ID"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="input-field"
//           value={password}
//           autoComplete="on"
//           onChange={(e) => setPassword(e.target.value)}
//           aria-label="Password"
//         />
//         <button type="submit" className="login-button" aria-label="Login">
//           LOGIN
//         </button>
//       </form>
//       {error && <p className="error-text" aria-live="polite">{error}</p>}
//       <p className="register-text">
//         Don’t have an account?{" "}
//         <a href="#register" aria-label="Register now">
//           REGISTER NOW
//         </a>
//       </p>
//     </div>
//   );
// };

// export default Login;



// code for face id

// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { Scan, User, ShieldCheck } from "lucide-react";
// import "./login.css";

// export default function FaceId() {
//   const [scanning, setScanning] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [videoStream, setVideoStream] = useState(null);
//   const [error, setError] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { email, password } = location.state || {};

//   useEffect(() => {
//     if (cameraActive && videoRef.current) {
//       navigator.mediaDevices
//         .getUserMedia({ video: { width: 640, height: 480 } })
//         .then((stream) => {
//           setVideoStream(stream);
//           videoRef.current.srcObject = stream;
//           setScanning(true);
//           speak("Please face the camera for recognition");
//           videoRef.current.play().catch((err) => {
//             setError("Error playing video: " + err.message);
//             speak("Error playing video. Please try again.");
//             stopVideo();
//           });

//           setTimeout(async () => {
//             const imageData = captureImage();
//             if (!imageData) {
//               setError("Failed to capture image.");
//               speak("Failed to capture image.");
//               stopVideo();
//               return;
//             }

//             setScanning(false);
//             stopVideo();

//             const formData = new FormData();
//             formData.append("email", email);
//             formData.append("password", password);
//             formData.append("image", dataURLtoBlob(imageData));

//             try {
//               const response = await fetch("http://localhost:5000/login", {
//                 method: "POST",
//                 body: formData,
//               });
//               const result = await response.json();

//               if (result.status === "success") {
//                 window.speechSynthesis.cancel();
//                 speak(`Login successful. Welcome, ${result.email}`);
//                 setTimeout(() => navigate("/menu"), 1000);
//               } else {
//                 setError(result.message);
//                 speak(result.message);
//               }
//             } catch (err) {
//               setError("Login failed: " + err.message);
//               speak("Login failed.");
//             }
//           }, 7000);
//         })
//         .catch((err) => {
//           setError("Error accessing camera: " + err.message);
//           speak("Error accessing camera.");
//           setCameraActive(false);
//           setScanning(false);
//         });
//     }

//     return () => {
//       stopVideo();
//       window.speechSynthesis.cancel();
//     };
//   }, [cameraActive, email, password, navigate]);

//   const activateCamera = () => {
//     if (!email || !password) {
//       setError("Missing email or password");
//       speak("Missing email or password");
//       return;
//     }
//     setCameraActive(true);
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !videoRef.current.videoWidth) return null;
//     const canvas = canvasRef.current;
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
//     return canvas.toDataURL("image/jpeg");
//   };

//   const stopVideo = () => {
//     if (videoStream) {
//       videoStream.getTracks().forEach((track) => track.stop());
//       setVideoStream(null);
//     }
//     setCameraActive(false);
//     setScanning(false);
//     if (videoRef.current) videoRef.current.srcObject = null;
//   };

//   const speak = (text) => {
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };

//   const dataURLtoBlob = (dataurl) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new Blob([u8arr], { type: mime });
//   };

//   return (
//     <div className="welcome-container" role="main">
//       <div className="decorative-top-right"></div>
//       <div className="decorative-bottom-left"></div>
//       <div className="content-wrapper">
//         <div className="text-section">
//           <h1 className="welcome-title">Welcome Back!</h1>
//           <p className="welcome-text">Please verify your identity to continue.</p>
//           <div className="verify-info">
//             <ShieldCheck className="shield-icon" />
//             <span className="verify-text">Secure Face Recognition</span>
//           </div>
//           <button
//             onClick={activateCamera}
//             disabled={cameraActive}
//             className="verify-button"
//           >
//             {cameraActive ? "Scanning..." : "Verify Identity"}
//           </button>
//           <p className="register-link">
//             Don't have an account?{" "}
//             <Link to="/register" className="register-link-text">
//               Register now
//             </Link>
//           </p>
//           {error && <p className="error-text">{error}</p>}
//         </div>
//         <div className="card-section">
//           <div className="card">
//             <div className="video-wrapper">
//               {cameraActive ? (
//                 <video ref={videoRef} className="video" autoPlay playsInline muted />
//               ) : (
//                 <div className="video-placeholder">
//                   <User className="user-icon" />
//                 </div>
//               )}
//               {scanning && (
//                 <div className="scanning-overlay">
//                   <div className="scanning-line"></div>
//                   <div className="scanning-text">
//                     <Scan className="scan-icon" />
//                     <span>Scanning...</span>
//                   </div>
//                 </div>
//               )}
//               <div className="corner-accent top-left"></div>
//               <div className="corner-accent top-right"></div>
//               <div className="corner-accent bottom-left"></div>
//               <div className="corner-accent bottom-right"></div>
//             </div>
//             <canvas ref={canvasRef} style={{ display: "none" }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




//latest working code

// import { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Scan, User, ShieldCheck } from "lucide-react";
// import "./login.css";

// export default function FaceId() {
//   const [scanning, setScanning] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [videoStream, setVideoStream] = useState(null);
//   const [error, setError] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("useEffect triggered, cameraActive:", cameraActive, "videoRef.current:", !!videoRef.current);
//     if (cameraActive && videoRef.current && !videoStream) {
//       console.log("Checking mediaDevices support...");
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         setError("Your browser does not support webcam access.");
//         speak("Your browser does not support webcam access.");
//         setCameraActive(false);
//         setScanning(false);
//         return;
//       }

//       console.log("Querying camera permissions...");
//       navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
//         console.log("Camera permission status:", permissionStatus.state);
//         if (permissionStatus.state === "denied") {
//           setError("Camera access denied. Please allow camera access in your browser settings.");
//           speak("Camera access denied. Please allow camera access.");
//           setCameraActive(false);
//           setScanning(false);
//           return;
//         }

//         console.log("Requesting camera stream...");
//         navigator.mediaDevices
//           .getUserMedia({ video: { width: 640, height: 480 } })
//           .then((stream) => {
//             console.log("Camera stream obtained:", stream);
//             setVideoStream(stream);
//             if (videoRef.current) {
//               console.log("Setting video srcObject...");
//               videoRef.current.srcObject = stream;
//               setScanning(true);
//               speak("Please face the camera for recognition");

//               videoRef.current.play()
//                 .then(() => {
//                   console.log("Video playback started successfully");
//                 })
//                 .catch((err) => {
//                   console.error("Video playback error:", err);
//                   setError("Error playing video: " + err.message);
//                   speak("Error playing video. Please try again.");
//                   stopVideo();
//                 });

//               setTimeout(async () => {
//                 console.log("Capturing image...");
//                 const imageData = captureImage();
//                 if (!imageData) {
//                   setError("Failed to capture image.");
//                   speak("Failed to capture image.");
//                   stopVideo();
//                   return;
//                 }

//                 setScanning(false);
//                 stopVideo();

//                 const formData = new FormData();
//                 formData.append("image", dataURLtoBlob(imageData));

//                 try {
//                   console.log("Sending login request...");
//                   const response = await fetch("http://localhost:5000/login", {
//                     method: "POST",
//                     body: formData,
//                   });
//                   const result = await response.json();

//                   if (result.status === "success") {
//                     window.speechSynthesis.cancel();
//                     speak(`Login successful. Welcome, ${result.email}`);
//                     setTimeout(() => {
//                       navigate("/menu", { replace: true });  // Use replace to avoid history stack issues
//                     }, 1000);
//                   } else {
//                     setError(result.error || result.message);
//                     speak(result.error || result.message);
//                   }
//                 } catch (err) {
//                   setError("Login failed: " + err.message);
//                   speak("Login failed.");
//                 }
//               }, 7000);
//             }
//           })
//           .catch((err) => {
//             let errorMessage = "Error accessing camera. Please ensure your webcam is connected and not in use by another application.";
//             if (err.name === "NotFoundError") {
//               errorMessage = "No camera found on this device.";
//             } else if (err.name === "NotAllowedError") {
//               errorMessage = "Camera access denied. Please allow camera access.";
//             }
//             console.error("Camera access error:", err);
//             setError(errorMessage);
//             speak(errorMessage);
//             setCameraActive(false);
//             setScanning(false);
//           });
//       }).catch((permErr) => {
//         console.error("Permission query error:", permErr);
//         setError("Error checking camera permissions: " + permErr.message);
//         setCameraActive(false);
//         setScanning(false);
//       });
//     }

//     return () => {
//       if (cameraActive) {
//         console.log("Cleanup: Stopping video stream");
//         stopVideo();
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, [cameraActive]);

//   const activateCamera = () => {
//     console.log("activateCamera called");
//     setCameraActive(true);
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !videoRef.current.videoWidth) {
//       console.log("Cannot capture image: video element not ready.");
//       return null;
//     }
//     const canvas = canvasRef.current;
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
//     const imageData = canvas.toDataURL("image/jpeg");
//     console.log("Image captured:", imageData);
//     return imageData;
//   };

//   const stopVideo = () => {
//     if (videoStream) {
//       videoStream.getTracks().forEach((track) => track.stop());
//       console.log("Video stream stopped");
//       setVideoStream(null);
//     }
//     setCameraActive(false);
//     setScanning(false);
//     if (videoRef.current) videoRef.current.srcObject = null;
//   };

//   const speak = (text) => {
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };

//   const dataURLtoBlob = (dataurl) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new Blob([u8arr], { type: mime });
//   };

//   return (
//     <div className="welcome-container" role="main">
//       <div className="decorative-top-right"></div>
//       <div className="decorative-bottom-left"></div>
//       <div className="content-wrapper">
//         <div className="text-section">
//           <h1 className="welcome-title">Welcome Back!</h1>
//           <p className="welcome-text">Please verify your identity with your face to continue.</p>
//           <div className="verify-info">
//             <ShieldCheck className="shield-icon" />
//             <span className="verify-text">Secure Face Recognition</span>
//           </div>
//           <button
//             onClick={activateCamera}
//             disabled={cameraActive}
//             className="verify-button"
//           >
//             {cameraActive ? "Scanning..." : "Verify Identity"}
//           </button>
//           <p className="register-link">
//             Don't have an account?{" "}
//             <Link to="/register" className="register-link-text">
//               Register now
//             </Link>
//           </p>
//           {error && <p className="error-text">{error}</p>}
//         </div>
//         <div className="card-section">
//           <div className="card">
//             <div className="video-wrapper">
//               {cameraActive ? (  // Render video when cameraActive is true
//                 <video ref={videoRef} className="video" autoPlay playsInline muted />
//               ) : (
//                 <div className="video-placeholder">
//                   <User className="user-icon" />
//                 </div>
//               )}
//               {scanning && (
//                 <div className="scanning-overlay">
//                   <div className="scanning-line"></div>
//                   <div className="scanning-text">
//                     <Scan className="scan-icon" />
//                     <span>Scanning...</span>
//                   </div>
//                 </div>
//               )}
//               <div className="corner-accent top-left"></div>
//               <div className="corner-accent top-right"></div>
//               <div className="corner-accent bottom-left"></div>
//               <div className="corner-accent bottom-right"></div>
//             </div>
//             <canvas ref={canvasRef} style={{ display: "none" }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Scan, User, ShieldCheck } from "lucide-react";
// import "./login.css";

// export default function FaceId() {
//   const [scanning, setScanning] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [videoStream, setVideoStream] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("useEffect triggered, cameraActive:", cameraActive, "videoRef.current:", !!videoRef.current, "videoStream:", !!videoStream);
//     if (cameraActive && videoRef.current && !videoStream) {
//       console.log("Checking mediaDevices support...");
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         setError("Your browser does not support webcam access.");
//         speak("Your browser does not support webcam access.");
//         setCameraActive(false);
//         setScanning(false);
//         return;
//       }

//       console.log("Querying camera permissions...");
//       navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
//         console.log("Camera permission status:", permissionStatus.state);
//         if (permissionStatus.state === "denied") {
//           setError("Camera access denied. Please allow camera access in your browser settings.");
//           speak("Camera access denied. Please allow camera access.");
//           setCameraActive(false);
//           setScanning(false);
//           return;
//         }

//         console.log("Requesting camera stream...");
//         navigator.mediaDevices
//           .getUserMedia({ video: { width: 640, height: 480 } })
//           .then((stream) => {
//             console.log("Camera stream obtained:", stream);
//             setVideoStream(stream);
//             if (videoRef.current) {
//               console.log("Setting video srcObject...");
//               videoRef.current.srcObject = stream;
//               videoRef.current.onloadedmetadata = () => {
//                 console.log("Video metadata loaded, playing video...");
//                 videoRef.current.play()
//                   .then(() => {
//                     console.log("Video playback started successfully");
//                     setScanning(true);
//                     speak("Please face the camera for recognition");
//                   })
//                   .catch((err) => {
//                     console.error("Video playback error:", err);
//                     setError("Error playing video: " + err.message);
//                     speak("Error playing video. Please try again.");
//                     stopStreamOnly();
//                     setCameraActive(false);
//                     setScanning(false);
//                   });
//               };

//               setTimeout(async () => {
//                 console.log("Capturing image...");
//                 const imageData = captureImage();
//                 if (!imageData) {
//                   setError("Failed to capture image.");
//                   speak("Failed to capture image.");
//                   stopStreamOnly();
//                   setCameraActive(false);
//                   setScanning(false);
//                   return;
//                 }

//                 setScanning(false);
//                 stopStreamOnly();
//                 setCameraActive(false);
//                 setLoading(true);

//                 const formData = new FormData();
//                 formData.append("image", dataURLtoBlob(imageData));

//                 try {
//                   console.log("Sending login request to http://localhost:5000/login...");
//                   const response = await fetch("http://localhost:5000/login", {
//                     method: "POST",
//                     body: formData,
//                   });

//                   console.log("Response status:", response.status);
//                   console.log("Response status text:", response.statusText);
//                   console.log("Response headers:", response.headers.get("Content-Type"));

//                   const contentType = response.headers.get("Content-Type");
//                   if (!contentType || !contentType.includes("application/json")) {
//                     const text = await response.text();
//                     console.error("Response is not JSON:", text);
//                     throw new Error("Received non-JSON response from server. Please try again later.");
//                   }

//                   const result = await response.json();
//                   console.log("Login response:", result);

//                   if (result.status === "success") {
//                     localStorage.setItem("userEmail", result.email);
//                     window.speechSynthesis.cancel();
//                     speak(`Login successful. Welcome, ${result.email}`);
//                     setTimeout(() => {
//                       navigate("/menu", { replace: true });
//                     }, 1000);
//                   } else {
//                     setError(result.error || result.message || "Login failed.");
//                     speak(result.error || result.message || "Login failed.");
//                   }
//                 } catch (err) {
//                   console.error("Login request failed:", err);
//                   setError("Login failed: " + err.message);
//                   speak("Login failed: " + err.message);
//                 } finally {
//                   setLoading(false);
//                 }
//               }, 7000);
//             } else {
//               console.error("videoRef.current is null after stream assignment");
//               setError("Video element not found. Please try again.");
//               speak("Video element not found. Please try again.");
//               setCameraActive(false);
//               setScanning(false);
//             }
//           })
//           .catch((err) => {
//             let errorMessage = "Error accessing camera. Please ensure your webcam is connected and not in use by another application.";
//             if (err.name === "NotFoundError") {
//               errorMessage = "No camera found on this device.";
//             } else if (err.name === "NotAllowedError") {
//               errorMessage = "Camera access denied. Please allow camera access.";
//             } else if (err.name === "NotReadableError") {
//               errorMessage = "Camera is in use by another application.";
//             }
//             console.error("Camera access error:", err);
//             setError(errorMessage);
//             speak(errorMessage);
//             setCameraActive(false);
//             setScanning(false);
//           });
//       }).catch((permErr) => {
//         console.error("Permission query error:", permErr);
//         setError("Error checking camera permissions: " + permErr.message);
//         speak("Error checking camera permissions: " + permErr.message);
//         setCameraActive(false);
//         setScanning(false);
//       });
//     }

//     return () => {
//       console.log("Cleanup: Stopping video stream");
//       stopStreamOnly();
//       window.speechSynthesis.cancel();
//     };
//   }, [cameraActive, navigate]);

//   const activateCamera = () => {
//     console.log("activateCamera called");
//     setError(null);
//     setCameraActive(true);
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !videoRef.current.videoWidth) {
//       console.log("Cannot capture image: video element not ready.");
//       return null;
//     }
//     const canvas = canvasRef.current;
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
//     const imageData = canvas.toDataURL("image/jpeg");
//     console.log("Image captured:", imageData);
//     return imageData;
//   };

//   const stopStreamOnly = () => {
//     if (videoStream) {
//       videoStream.getTracks().forEach((track) => track.stop());
//       console.log("Video stream stopped");
//       setVideoStream(null);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//       console.log("Video srcObject cleared");
//     }
//   };

//   const speak = (text) => {
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.lang = "en-US";
//     window.speechSynthesis.speak(utterance);
//   };

//   const dataURLtoBlob = (dataurl) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new Blob([u8arr], { type: mime });
//   };

//   return (
//     <div className="welcome-container" role="main">
//       <div className="decorative-top-right"></div>
//       <div className="decorative-bottom-left"></div>
//       <div className="content-wrapper">
//         <div className="text-section">
//           <h1 className="welcome-title">Welcome Back!</h1>
//           <p className="welcome-text">Please verify your identity with your face to continue.</p>
//           <div className="verify-info">
//             <ShieldCheck className="shield-icon" />
//             <span className="verify-text">Secure Face Recognition</span>
//           </div>
//           <button
//             onClick={activateCamera}
//             disabled={cameraActive || loading}
//             className="verify-button"
//           >
//             {loading ? "Logging in..." : cameraActive ? "Scanning..." : "Verify Identity"}
//           </button>
//           <p className="register-link">
//             Don't have an account?{" "}
//             <Link to="/register" className="register-link-text">
//               Register now
//             </Link>
//           </p>
//           {error && <p className="error-text">{error}</p>}
//         </div>
//         <div className="card-section">
//           <div className="card">
//             <div className="video-wrapper">
//               {cameraActive ? (
//                 <video
//                   ref={videoRef}
//                   className="video"
//                   autoPlay
//                   playsInline
//                   muted
//                   onError={(e) => {
//                     console.error("Video element error:", e);
//                     setError("Error loading video stream.");
//                     speak("Error loading video stream.");
//                     stopStreamOnly();
//                     setCameraActive(false);
//                     setScanning(false);
//                   }}
//                 />
//               ) : (
//                 <div className="video-placeholder">
//                   <User className="user-icon" />
//                 </div>
//               )}
//               {scanning && (
//                 <div className="scanning-overlay">
//                   <div className="scanning-line"></div>
//                   <div className="scanning-text">
//                     <Scan className="scan-icon" />
//                     <span>Scanning...</span>
//                   </div>
//                 </div>
//               )}
//               <div className="corner-accent top-left"></div>
//               <div className="corner-accent top-right"></div>
//               <div className="corner-accent bottom-left"></div>
//               <div className="corner-accent bottom-right"></div>
//             </div>
//             <canvas ref={canvasRef} style={{ display: "none" }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Scan, User, ShieldCheck } from "lucide-react";
import "./login.css";

export default function FaceId() {
  const [scanning, setScanning] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const recognitionSessionId = useRef(0);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const debounceTimeout = useRef(null);
  const navigate = useNavigate();

  // Initialize speech recognition
  useEffect(() => {
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
      if (recognitionRef.current && isRecognizing) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Camera handling
  useEffect(() => {
    console.log("useEffect triggered, cameraActive:", cameraActive, "videoRef.current:", !!videoRef.current, "videoStream:", !!videoStream);
    if (cameraActive && videoRef.current && !videoStream) {
      console.log("Checking mediaDevices support...");
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Your browser does not support webcam access.");
        speak("Your browser does not support webcam access.");
        setCameraActive(false);
        setScanning(false);
        return;
      }

      console.log("Querying camera permissions...");
      navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
        console.log("Camera permission status:", permissionStatus.state);
        if (permissionStatus.state === "denied") {
          setError("Camera access denied. Please allow camera access in your browser settings.");
          speak("Camera access denied. Please allow camera access.");
          setCameraActive(false);
          setScanning(false);
          return;
        }

        console.log("Requesting camera stream...");
        navigator.mediaDevices
          .getUserMedia({ video: { width: 640, height: 480 } })
          .then((stream) => {
            console.log("Camera stream obtained:", stream);
            setVideoStream(stream);
            if (videoRef.current) {
              console.log("Setting video srcObject...");
              videoRef.current.srcObject = stream;
              videoRef.current.onloadedmetadata = () => {
                console.log("Video metadata loaded, playing video...");
                videoRef.current.play()
                  .then(() => {
                    console.log("Video playback started successfully");
                    setScanning(true);
                    speak("Please face the camera for recognition");
                  })
                  .catch((err) => {
                    console.error("Video playback error:", err);
                    setError("Error playing video: " + err.message);
                    speak("Error playing video. Please try again.");
                    stopStreamOnly();
                    setCameraActive(false);
                    setScanning(false);
                  });
              };

              setTimeout(async () => {
                console.log("Capturing image...");
                const imageData = captureImage();
                if (!imageData) {
                  setError("Failed to capture image.");
                  speak("Failed to capture image.");
                  stopStreamOnly();
                  setCameraActive(false);
                  setScanning(false);
                  return;
                }

                setScanning(false);
                stopStreamOnly();
                setCameraActive(false);
                setLoading(true);

                const formData = new FormData();
                formData.append("image", dataURLtoBlob(imageData));

                try {
                  console.log("Sending login request to http://localhost:5000/login...");
                  const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    body: formData,
                  });

                  console.log("Response status:", response.status);
                  console.log("Response status text:", response.statusText);
                  console.log("Response headers:", response.headers.get("Content-Type"));

                  const contentType = response.headers.get("Content-Type");
                  if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    console.error("Response is not JSON:", text);
                    throw new Error("Received non-JSON response from server. Please try again later.");
                  }

                  const result = await response.json();
                  console.log("Login response:", result);

                  if (result.status === "success") {
                    localStorage.setItem("userEmail", result.email);
                    window.speechSynthesis.cancel();
                    speak(`Login successful. Welcome, ${result.email}`);
                    setTimeout(() => {
                      navigate("/menu", { replace: true });
                    }, 1000);
                  } else {
                    setError(result.error || result.message || "Login failed.");
                    speak(result.error || result.message || "Login failed.");
                  }
                } catch (err) {
                  console.error("Login request failed:", err);
                  setError("Login failed: " + err.message);
                  speak("Login failed: " + err.message);
                } finally {
                  setLoading(false);
                }
              }, 7000);
            } else {
              console.error("videoRef.current is null after stream assignment");
              setError("Video element not found. Please try again.");
              speak("Video element not found. Please try again.");
              setCameraActive(false);
              setScanning(false);
            }
          })
          .catch((err) => {
            let errorMessage = "Error accessing camera. Please ensure your webcam is connected and not in use by another application.";
            if (err.name === "NotFoundError") {
              errorMessage = "No camera found on this device.";
            } else if (err.name === "NotAllowedError") {
              errorMessage = "Camera access denied. Please allow camera access.";
            } else if (err.name === "NotReadableError") {
              errorMessage = "Camera is in use by another application.";
            }
            console.error("Camera access error:", err);
            setError(errorMessage);
            speak(errorMessage);
            setCameraActive(false);
            setScanning(false);
          });
      }).catch((permErr) => {
        console.error("Permission query error:", permErr);
        setError("Error checking camera permissions: " + permErr.message);
        speak("Error checking camera permissions: " + permErr.message);
        setCameraActive(false);
        setScanning(false);
      });
    }

    return () => {
      console.log("Cleanup: Stopping video stream");
      stopStreamOnly();
      window.speechSynthesis.cancel();
    };
  }, [cameraActive, navigate]);

  // Voice authentication logic with register support
  useEffect(() => {
    const startVoiceAuth = async () => {
      await speak("Please say 'login' to authenticate or 'register' for a new account.");
      startRecognition(
        (transcript) => {
          const command = transcript.toLowerCase();
          if (command === "login") {
            console.log("Voice command 'login' detected");
            activateCamera();
          } else if (command === "register") {
            console.log("Voice command 'register' detected");
            speak("Redirecting to registration page.");
            setTimeout(() => {
              navigate("/register", { replace: true });
            }, 1000); // Delay to allow TTS to finish
          } else {
            speak("Invalid command. Please say 'login' or 'register'.");
            startVoiceAuth();
          }
        },
        startVoiceAuth,
        "Please say 'login' to authenticate or 'register' for a new account"
      );
    };
    startVoiceAuth();
  }, [navigate]); // Added navigate to dependencies

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
    console.log("Attempting to speak:", text); // Added for debugging

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      utterance.onstart = () => {
        console.log("TTS started speaking:", text); // Added for debugging
      };
      utterance.onend = () => {
        console.log("Finished speaking:", text);
        if (onEndCallback) onEndCallback();
        resolve();
      };
      utterance.onerror = (event) => {
        console.error("TTS error:", event.error); // Added for debugging
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

  const activateCamera = () => {
    console.log("activateCamera called");
    setError(null);
    setCameraActive(true);
  };

  const captureImage = () => {
    if (!videoRef.current || !videoRef.current.videoWidth) {
      console.log("Cannot capture image: video element not ready.");
      return null;
    }
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg");
    console.log("Image captured:", imageData);
    return imageData;
  };

  const stopStreamOnly = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      console.log("Video stream stopped");
      setVideoStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      console.log("Video srcObject cleared");
    }
  };

  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  };

  const handleRegisterClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    speak("Redirecting to registration page.");
    setTimeout(() => {
      navigate("/register", { replace: true });
    }, 1000); // Delay to allow TTS to finish
  };

  return (
    <div className="welcome-container" role="main">
      <div className="decorative-top-right"></div>
      <div className="decorative-bottom-left"></div>
      <div className="content-wrapper">
        <div className="text-section">
          <h1 className="welcome-title">Welcome Back!</h1>
          <div className="verify-info">
            <ShieldCheck className="shield-icon" />
            <span className="verify-text">Secure Face Recognition</span>
          </div>
          <button
            onClick={activateCamera}
            disabled={cameraActive || loading}
            className="verify-button"
          >
            {loading ? "Logging in..." : cameraActive ? "Scanning..." : "Verify Identity"}
          </button>
          <p className="register-link">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="register-link-text"
              onClick={handleRegisterClick}
            >
              Register now
            </Link>
          </p>
          {error && <p className="error-text">{error}</p>}
        </div>
        <div className="card-section">
          <div className="card">
            <div className="video-wrapper">
              {cameraActive ? (
                <video
                  ref={videoRef}
                  className="video"
                  autoPlay
                  playsInline
                  muted
                  onError={(e) => {
                    console.error("Video element error:", e);
                    setError("Error loading video stream.");
                    speak("Error loading video stream.");
                    stopStreamOnly();
                    setCameraActive(false);
                    setScanning(false);
                  }}
                />
              ) : (
                <div className="video-placeholder">
                  <User className="user-icon" />
                </div>
              )}
              {scanning && (
                <div className="scanning-overlay">
                  <div className="scanning-line"></div>
                  <div className="scanning-text">
                    <Scan className="scan-icon" />
                    <span>Scanning...</span>
                  </div>
                </div>
              )}
              <div className="corner-accent top-left"></div>
              <div className="corner-accent top-right"></div>
              <div className="corner-accent bottom-left"></div>
              <div className="corner-accent bottom-right"></div>
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        </div>
      </div>
    </div>
  );
}


// import { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Scan, User, ShieldCheck } from "lucide-react";
// import "./login.css";

// export default function Login() {
//   const [scanning, setScanning] = useState(false);
//   const [cameraActive, setCameraActive] = useState(false);
//   const [videoStream, setVideoStream] = useState(null);
//   const [error, setError] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();
//   const isMountedRef = useRef(false);
//   const hasNavigated = useRef(false);
//   const timerRef = useRef(null);
//   const utteranceRef = useRef(null); // Store the utterance for cleanup

//   useEffect(() => {
//     isMountedRef.current = true;
//     console.log("Component mounted");

//     return () => {
//       isMountedRef.current = false;
//       console.log("Component unmounted, cleaning up");
//       stopVideo();
//       if (timerRef.current) {
//         clearTimeout(timerRef.current);
//       }
//       if (utteranceRef.current) {
//         window.speechSynthesis.cancel();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     console.log("useEffect triggered, cameraActive:", cameraActive, "videoRef.current:", !!videoRef.current);
//     if (!cameraActive || !videoRef.current || videoStream) return;

//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
//         if (!isMountedRef.current) {
//           console.log("Component unmounted, aborting stream setup");
//           stream.getTracks().forEach(track => track.stop());
//           return;
//         }
//         console.log("Camera stream obtained:", stream);
//         setVideoStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play()
//             .then(() => {
//               console.log("Video playback started successfully");
//               setScanning(true);
//               speak("Please face the camera for recognition");

//               timerRef.current = setTimeout(async () => {
//                 const imageData = captureImage();
//                 if (!imageData) {
//                   setError("Failed to capture image.");
//                   stopVideo();
//                   return;
//                 }

//                 setScanning(false);
//                 console.log("Before stopVideo, videoStream:", videoStream);
//                 stopVideo();
//                 const formData = new FormData();
//                 formData.append("image", dataURLtoBlob(imageData));

//                 try {
//                   console.log("Sending login request...");
//                   const response = await fetch("http://localhost:5000/login", {
//                     method: "POST",
//                     body: formData,
//                   });
//                   const result = await response.json();

//                   if (result.status === "success") {
//                     window.speechSynthesis.cancel();
//                     const utterance = new SpeechSynthesisUtterance(`Login successful. Welcome, ${result.email}`);
//                     utteranceRef.current = utterance; // Store the utterance
//                     utterance.onend = () => {
//                       console.log("TTS: Login successful ended");
//                       if (isMountedRef.current && !hasNavigated.current) {
//                         hasNavigated.current = true;
//                         stopVideo(); // Automatically stop the camera after successful login
//                         console.log("Navigating to /menu");
//                         navigate("/menu");
//                       }
//                     };
//                     utterance.onerror = (event) => {
//                       console.error("TTS: Error in login successful message:", event.error);
//                       // Fallback in case TTS fails
//                       if (isMountedRef.current && !hasNavigated.current) {
//                         hasNavigated.current = true;
//                         stopVideo();
//                         console.log("TTS failed, navigating to /menu as fallback");
//                         navigate("/menu");
//                       }
//                     };
//                     console.log("TTS: Starting login successful message");
//                     window.speechSynthesis.speak(utterance);

//                     // Fallback timeout in case onend doesn't fire
//                     timerRef.current = setTimeout(() => {
//                       if (isMountedRef.current && !hasNavigated.current) {
//                         hasNavigated.current = true;
//                         stopVideo();
//                         console.log("TTS: Fallback timeout triggered, navigating to /menu");
//                         navigate("/menu");
//                       }
//                     }, 5000); // 5 seconds fallback
//                   } else {
//                     setError(result.error || result.message);
//                     speak(result.error || result.message);
//                     setCameraActive(false);
//                   }
//                 } catch (err) {
//                   setError("Network error: " + err.message);
//                   speak("Network error. Please try again.");
//                   setCameraActive(false);
//                 }
//               }, 7000);
//             })
//             .catch((err) => {
//               console.error("Video playback error:", err);
//               setError("Error playing video: " + err.message);
//               stopVideo();
//             });
//         } else {
//           console.error("videoRef.current is null, cannot set srcObject");
//           stream.getTracks().forEach(track => track.stop());
//           setError("Video element not available.");
//         }
//       } catch (err) {
//         console.error("Camera access error:", err);
//         let errorMessage = "Error accessing camera.";
//         if (err.name === "NotAllowedError") {
//           errorMessage = "Camera access denied. Please allow camera access.";
//         } else if (err.name === "NotFoundError") {
//           errorMessage = "No camera found on this device.";
//         }
//         setError(errorMessage);
//         speak(errorMessage);
//         setCameraActive(false);
//         setScanning(false);
//       }
//     };

//     startCamera();
//   }, [cameraActive]);

//   const activateCamera = () => {
//     console.log("activateCamera called");
//     setError(null);
//     stopVideo();
//     setCameraActive(true);
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !videoRef.current.videoWidth) {
//       console.log("Cannot capture image: video element not ready.");
//       return null;
//     }
//     const canvas = canvasRef.current;
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
//     const imageData = canvas.toDataURL("image/jpeg");
//     console.log("Image captured:", imageData);
//     return imageData;
//   };

//   const stopVideo = () => {
//     console.log("stopVideo called, videoStream:", videoStream);
//     if (videoStream) {
//       console.log("Stopping video stream...");
//       const tracks = videoStream.getTracks();
//       console.log("Tracks to stop:", tracks);
//       tracks.forEach((track) => {
//         track.stop();
//         track.enabled = false;
//         console.log("Track stopped:", track.kind, "enabled:", track.enabled);
//       });
//       if (videoStream.active) {
//         console.log("Stream still active, forcing stop...");
//         videoStream.getTracks().forEach(track => track.stop());
//       }
//       setVideoStream(null);
//     } else {
//       console.log("No video stream to stop");
//     }
//     setCameraActive(false);
//     setScanning(false);
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//       console.log("Video srcObject cleared");
//     } else {
//       console.log("videoRef.current is null");
//     }
//   };

//   const speak = (text) => {
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };

//   const dataURLtoBlob = (dataurl) => {
//     const arr = dataurl.split(",");
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new Blob([u8arr], { type: mime });
//   };

//   return (
//     <div className="welcome-container" role="main">
//       <div className="decorative-top-right"></div>
//       <div className="decorative-bottom-left"></div>
//       <div className="content-wrapper">
//         <div className="text-section">
//           <h1 className="welcome-title">Welcome Back!</h1>
//           <p className="welcome-text">Please verify your identity with your face to continue.</p>
//           <div className="verify-info">
//             <ShieldCheck className="shield-icon" />
//             <span className="verify-text">Secure Face Recognition</span>
//           </div>
//           <button
//             onClick={activateCamera}
//             disabled={cameraActive}
//             className="verify-button"
//           >
//             {cameraActive ? "Scanning..." : "Verify Identity"}
//           </button>
//           <button onClick={stopVideo} className="verify-button">
//             Stop Camera (Debug)
//           </button>
//           <p className="register-link">
//             Don't have an account?{" "}
//             <Link to="/register" className="register-link-text">
//               Register now
//             </Link>
//           </p>
//           {error && <p className="error-text">{error}</p>}
//         </div>
//         <div className="card-section">
//           <div className="card">
//             <div className="video-wrapper">
//               {cameraActive && (
//                 <video ref={videoRef} className="video" autoPlay playsInline muted />
//               )}
//               {!cameraActive && (
//                 <div className="video-placeholder">
//                   <User className="user-icon" />
//                 </div>
//               )}
//               {scanning && (
//                 <div className="scanning-overlay">
//                   <div className="scanning-line"></div>
//                   <div className="scanning-text">
//                     <Scan className="scan-icon" />
//                     <span>Scanning...</span>
//                   </div>
//                 </div>
//               )}
//               <div className="corner-accent top-left"></div>
//               <div className="corner-accent top-right"></div>
//               <div className="corner-accent bottom-left"></div>
//               <div className="corner-accent bottom-right"></div>
//             </div>
//             <canvas ref={canvasRef} style={{ display: "none" }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }