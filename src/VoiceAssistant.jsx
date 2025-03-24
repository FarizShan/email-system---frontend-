import { useVoice } from './VoiceContext';

export const VoiceAssistant = () => {
  const { isListening, toggleListening, isSupported } = useVoice();

  if (!isSupported) return null;

  return (
    <div className="voice-assistant">
      <button 
        onClick={toggleListening}
        className={`mic-button ${isListening ? 'listening' : ''}`}
      >
        🎤 {isListening ? 'Stop Listening' : 'Start Voice Commands'}
      </button>
    </div>
  );
};