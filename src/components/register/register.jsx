// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { User } from "lucide-react";
// import "./register.css";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [appPassword, setAppPassword] = useState(""); // Changed to appPassword
//   const [error, setError] = useState("");
//   const [cameraActive, setCameraActive] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (cameraActive && videoRef.current) {
//       console.log("Starting camera...");
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then((stream) => {
//           console.log("Camera stream obtained:", stream);
//           if (videoRef.current) {
//             videoRef.current.srcObject = stream;

//             const playVideo = () => {
//               console.log("Attempting to play video...");
//               videoRef.current.play().then(() => {
//                 console.log("Video is playing successfully.");
//               }).catch((err) => {
//                 console.error("Error playing video:", err);
//                 setError("Error playing video: " + err.message);
//                 speak("Error playing video. Please try again.");
//               });
//             };

//             videoRef.current.onloadedmetadata = () => {
//               console.log("Video metadata loaded. Video dimensions:", {
//                 width: videoRef.current.videoWidth,
//                 height: videoRef.current.videoHeight,
//               });
//               playVideo();

//               if (videoRef.current.paused) {
//                 console.warn("Video is not playing after play() call.");
//                 setError("Video failed to play. Please try again.");
//                 speak("Video failed to play. Please try again.");
//                 return;
//               }

//               speak("Please face the camera to register your face");
//               setTimeout(async () => {
//                 console.log("Capturing image...");
//                 const imageData = captureImage();
//                 if (!imageData) {
//                   setError("Failed to capture image.");
//                   speak("Failed to capture image.");
//                   console.error("Image capture failed.");
//                   stopVideo();
//                   return;
//                 }
//                 stopVideo();

//                 const formData = new FormData();
//                 formData.append("email", email);
//                 formData.append("app_password", appPassword); // Changed to app_password
//                 formData.append("image", dataURLtoBlob(imageData));

//                 try {
//                   console.log("Sending register request to backend...");
//                   const response = await fetch("http://localhost:5000/register", {
//                     method: "POST",
//                     body: formData,
//                   });
//                   const result = await response.json();
//                   console.log("Backend response:", result);
//                   setError(result.message);
//                   speak(result.message);
//                   if (result.status === "success") {
//                     navigate("/");
//                   }
//                 } catch (err) {
//                   setError("Registration failed: " + err.message);
//                   speak("Registration failed. Please try again.");
//                   console.error("Registration request failed:", err);
//                 }
//               }, 5000);
//             };

//             videoRef.current.oncanplay = () => {
//               console.log("Video can play. Ensuring playback...");
//               playVideo();
//             };

//             videoRef.current.onerror = (e) => {
//               console.error("Video element error:", e);
//               setError("Error with video playback: " + e.message);
//               speak("Error with video playback. Please try again.");
//             };
//           }
//         })
//         .catch((err) => {
//           setError("Error accessing camera: " + err.message);
//           speak("Error accessing camera. Please try again.");
//           console.error(err);
//           setCameraActive(false);
//         });
//     }
//   }, [cameraActive, email, appPassword, navigate]); // Updated dependency

//   useEffect(() => {
//     console.log("Video ref after render:", videoRef.current);
//     if (videoRef.current) {
//       console.log("Video element dimensions (computed):", {
//         width: videoRef.current.offsetWidth,
//         height: videoRef.current.offsetHeight,
//       });
//     }
//   }, [cameraActive]);

//   const stopVideo = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     setCameraActive(false);
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !videoRef.current.videoWidth || !videoRef.current.videoHeight) {
//       console.error("Video element is not ready or not found. Dimensions:", {
//         width: videoRef.current?.videoWidth,
//         height: videoRef.current?.videoHeight,
//       });
//       return null;
//     }
//     const canvas = canvasRef.current;
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
//     const imageData = canvas.toDataURL("image/jpeg");
//     console.log("Image captured successfully:", imageData);
//     return imageData;
//   };

//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(utterance);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (!email || !appPassword) { // Updated to appPassword
//       setError("Please enter both email and app password.");
//       speak("Please enter both email and app password.");
//       return;
//     }
//     setError("Capturing face...");
//     setCameraActive(true);
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

//   useEffect(() => {
//     return () => stopVideo();
//   }, []);

//   return (
//     <div className="welcome-container" role="main">
//       <div className="decorative-top-right"></div>
//       <div className="decorative-bottom-left"></div>
//       <div className="content-wrapper-reg">
//         <div className="text-section">
//           <h1 className="welcome-title-reg" aria-label="Welcome to InVision">
//             Welcome to InVision
//           </h1>
//           <p className="welcome-text" aria-label="Please add your email ID and Gmail app password then register your face">
//             Please add your email ID and Gmail app password then register your face
//           </p>
//           <form className="register-form" onSubmit={handleRegister}>
//             <input
//               type="email"
//               placeholder="Email ID"
//               className="input-field"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               aria-label="Email ID"
//             />
//             <input
//               type="text" // Changed to text since App Password isn’t masked
//               placeholder="Gmail App Password"
//               className="input-field"
//               value={appPassword}
//               onChange={(e) => setAppPassword(e.target.value)}
//               aria-label="Gmail App Password"
//             />
//             <button
//               type="submit"
//               className="verify-button"
//               aria-label="Register"
//               disabled={cameraActive}
//             >
//               {cameraActive ? "Registering..." : "Register"}
//             </button>
//           </form>
//           {error && (
//             <p className="error-text-reg" aria-live="polite">
//               {error}
//             </p>
//           )}
//         </div>
//         <div className="card-section-reg">
//           <div className="card-reg">
//             <div className="video-wrapper">
//               {cameraActive ? (
//                 <video
//                   ref={videoRef}
//                   className="video"
//                   autoPlay
//                   playsInline
//                   muted
//                   aria-hidden="true"
//                 />
//               ) : (
//                 <div className="video-placeholder">
//                   <User className="user-icon" />
//                 </div>
//               )}
//               <div className="corner-accent top-left"></div>
//               <div className="corner-accent top-right"></div>
//               <div className="corner-accent bottom-left"></div>
//               <div className="corner-accent bottom-right"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//     </div>
//   );
// };

// export default Register;


"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Use refs to store the latest email and password values
  const emailRef = useRef(email);
  const passwordRef = useRef(password);

  // Update refs whenever email or password changes
  useEffect(() => {
    emailRef.current = email;
    passwordRef.current = password;
    console.log("Refs updated - Email:", emailRef.current, "Password:", passwordRef.current);
  }, [email, password]);

  // TTS function with callback for when speech ends
  const speak = (text, onEndCallback) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Clear any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.onend = () => {
        console.log("TTS: Finished speaking:", text);
        if (onEndCallback) onEndCallback();
      };
      console.log("TTS: Starting to speak:", text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("TTS not supported");
      if (onEndCallback) onEndCallback();
    }
  };

  // Spell out a string letter by letter
  const spellOut = (text) => {
    return text.split("").join("-").toUpperCase();
  };

  // Start STT with a prompt
  const startListening = (prompt, onResult) => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      setError("Speech recognition not supported. Please use a compatible browser.");
      speak("Speech recognition not supported.", () => {});
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      console.log("STT: Listening for:", prompt);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.trim();
      console.log("STT Result:", text);
      onResult(text);
    };

    recognition.onerror = (event) => {
      console.error("STT Error:", event.error);
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
      if (event.error === "no-speech") {
        speak("No speech detected. Please try again.", () => startListening(prompt, onResult));
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("STT: Stopped");
    };

    speak(prompt, () => {
      try {
        recognition.start();
      } catch (err) {
        console.error("STT Start Error:", err);
        setError("Failed to start speech recognition.");
      }
    });
  };

  // Voice registration flow with confirmation
  const startVoiceRegistration = () => {
    // Step 1: Get email
    startListening("Please say your email ID", (emailText) => {
      // Remove trailing full stop from email if present
      const cleanEmail = emailText.endsWith(".") ? emailText.slice(0, -1) : emailText;
      const spelledEmail = spellOut(cleanEmail);
      speak(`I heard ${spelledEmail}. Say 'yes' to confirm or 'no' to retry.`, () => {
        startListening("Say 'yes' or 'no'", (confirmation) => {
          if (confirmation.toLowerCase() === "yes.") {
            setEmail(cleanEmail);
            // Step 2: Get password
            speak(`Email confirmed as ${spelledEmail}. Now, please say your password.`, () => {
              startListening("Please say your password", (passwordText) => {
                // Remove trailing full stop from password if present
                const cleanPassword = passwordText.endsWith(".") ? passwordText.slice(0, -1) : passwordText;
                const spelledPassword = spellOut(cleanPassword);
                speak(`I heard ${spelledPassword}. Say 'yes' to confirm or 'no' to retry.`, () => {
                  startListening("Say 'yes' or 'no'", (passConfirmation) => {
                    if (passConfirmation.toLowerCase() === "yes.") {
                      setPassword(cleanPassword);
                      // Step 3: Confirm registration
                      speak(`Password confirmed. Say 'register' to proceed or 'cancel' to stop.`, () => {
                        startListening("Say 'register' or 'cancel'", (command) => {
                          const lowerCommand = command.toLowerCase();
                          if (lowerCommand === "register.") {
                            handleRegisterVoice();
                          } else if (lowerCommand === "cancel.") {
                            speak("Registration cancelled.", () => {
                              setEmail("");
                              setPassword("");
                            });
                          } else {
                            speak("Command not recognized. Please say 'register' or 'cancel'.", () =>
                              startListening("Say 'register' or 'cancel'", (retryCommand) => {
                                const retryLower = retryCommand.toLowerCase();
                                if (retryLower === "register.") {
                                  handleRegisterVoice();
                                } else if (retryLower === "cancel.") {
                                  speak("Registration cancelled.", () => {
                                    setEmail("");
                                    setPassword("");
                                  });
                                } else {
                                  speak("Command not recognized. Registration cancelled.", () => {
                                    setEmail("");
                                    setPassword("");
                                  });
                                }
                              })
                            );
                          }
                        });
                      });
                    } else if (passConfirmation.toLowerCase() === "no.") {
                      speak("Password not confirmed. Let's try again.", startVoiceRegistration);
                    } else {
                      speak("Command not recognized. Let's try again.", startVoiceRegistration);
                    }
                  });
                });
              });
            });
          } else if (confirmation.toLowerCase() === "no.") {
            speak("Email not confirmed. Let's try again.", startVoiceRegistration);
          } else {
            speak("Command not recognized. Let's try again.", startVoiceRegistration);
          }
        });
      });
    });
  };

  const startCamera = async () => {
    try {
      console.log("Starting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        console.log("Camera started successfully.");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Camera access denied. Please allow camera permissions.");
      setCameraActive(false);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (!videoRef.current) {
      setError("Video element is not ready.");
      return null;
    }

    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0);

    return canvas.toDataURL("image/jpeg");
  };

  const dataURLtoBlob = (dataurl) => {
    const [meta, base64] = dataurl.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
    return new Blob([array], { type: mime });
  };

  const handleRegisterVoice = async () => {
    // Use refs to access the latest email and password values
    const currentEmail = emailRef.current;
    const currentPassword = passwordRef.current;
    console.log("handleRegisterVoice - Email:", currentEmail, "Password:", currentPassword);

    if (!currentEmail || !currentPassword) {
      setError("Email or password missing.");
      speak("Email or password missing. Please try again.", startVoiceRegistration);
      return;
    }

    setError("");
    setCameraActive(true);
    speak("Starting registration. Please wait.", async () => {
      try {
        await startCamera();
        setTimeout(async () => {
          console.log("Capturing image...");
          const imageData = captureImage();

          if (!imageData) {
            setError("Failed to capture image.");
            speak("Failed to capture image.", stopVideo);
            return;
          }

          stopVideo();

          const formData = new FormData();
          formData.append("email", currentEmail);
          formData.append("password", currentPassword);
          formData.append("image", dataURLtoBlob(imageData));

          console.log("Sending register request to backend...");
          try {
            const response = await fetch("http://localhost:5000/register", {
              method: "POST",
              body: formData,
              credentials: "include",
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            console.log("Backend response:", result);
            if (result.status === "success") {
              speak("Registration successful.", () => navigate("/"));
            } else {
              setError(result.message);
              speak(result.message);
            }
          } catch (fetchError) {
            setError(`Fetch failed: ${fetchError.message}`);
            speak(`Registration failed: ${fetchError.message}`);
            console.error("Fetch error details:", fetchError);
          }
        }, 2000);
      } catch (err) {
        setError("Registration failed: " + err.message);
        speak("Registration failed: " + err.message, stopVideo);
        console.error("Registration request failed:", err);
      }
    });
  };

  const handleRegisterManual = (e) => {
    e.preventDefault();
    handleRegisterVoice();
  };

  // Debug state changes
  useEffect(() => {
    console.log("State updated - Email:", email, "Password:", password);
  }, [email, password]);

  useEffect(() => {
    // Clear fields on mount to ensure they're empty
    setEmail("");
    setPassword("");
    setError("");
    setCameraActive(false);
    setIsListening(false);

    speak("Welcome to InVision. Say 'start' to begin voice registration.", () => {
      startListening("Say 'start' to begin", (command) => {
        if (command.toLowerCase() === "start.") {
          startVoiceRegistration();
        } else {
          speak("Please say 'start' to begin.", () => {
            startListening("Say 'start' to begin", (retryCommand) => {
              if (retryCommand.toLowerCase() === "start.") {
                startVoiceRegistration();
              }
            });
          });
        }
      });
    });

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="register-welcome-container" role="main">
      <div className="register-decorative-top-right"></div>
      <div className="register-decorative-bottom-left"></div>

      <div className="register-content-wrapper">
        <div className="register-text-section">
          <h1 className="register-welcome-title">Welcome to InVision</h1>
          <p className="register-welcome-text">
            Use voice commands or enter details manually to register.
          </p>
          <form className="register-form" onSubmit={handleRegisterManual} autoComplete="off">
            <input
              type="email"
              placeholder="Email ID"
              className="register-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              name="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="register-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              name="new-password"
            />
            <button
              type="submit"
              className="register-verify-button"
              disabled={cameraActive || isListening}
            >
              {cameraActive ? "Registering..." : isListening ? "Listening..." : "Register"}
            </button>
          </form>
          {error && <p className="register-error-text">{error}</p>}
        </div>

        {cameraActive && (
          <div className="register-card-section">
            <div className="register-card">
              <div className="register-video-wrapper">
                <video ref={videoRef} className="register-video" autoPlay playsInline muted />
              </div>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default Register;