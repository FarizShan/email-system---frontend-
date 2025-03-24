import React, { createContext, useContext, useState, useEffect } from 'react';

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [commands, setCommands] = useState([]);
  const [speech, setSpeech] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  // Initialize speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      setRecognition(recognition);
    } else {
      setIsSupported(false);
    }
  }, []);

  const handleResult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    setSpeech(transcript);
    
    commands.forEach(({ command, callback }) => {
      if (transcript.toLowerCase().includes(command.toLowerCase())) {
        callback();
      }
    });
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
      recognition.onresult = handleResult;
    }
    setIsListening(!isListening);
  };

  const registerCommand = (command, callback) => {
    setCommands(prev => [...prev, { command, callback }]);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <VoiceContext.Provider
      value={{
        isListening,
        toggleListening,
        registerCommand,
        speech,
        speak,
        isSupported
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);