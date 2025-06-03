import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { CiMicrophoneOn } from "react-icons/ci";
import { GiSpeaker } from "react-icons/gi";
import { FaRegPaperPlane } from "react-icons/fa";

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "I am CarePulse Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [inputText, setInputText] = useState("");

  // Voice input hooks
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Start voice input
  const handleVoiceInput = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  // When transcript updates, update inputText
  React.useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      sender: "user",
      text: inputText,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Fake reply
    setTimeout(() => {
      const fakeReply = {
        sender: "assistant",
        text: `You said: "${userMessage.text}". Let me check that for you...`,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, fakeReply]);
      speakText(fakeReply.text);
    }, 1500);
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <section className="rounded-md p-5" style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}>
      <div>
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-color)' }}>Chat with CarePulse AI</h1>
        <p className="text-sm" style={{ color: 'var(--text-color)' }}>
          Describe your symptoms or ask questions about your health
        </p>
      </div>

      <div className="ring-1 rounded-md mt-5 pb-[10%] pt-5 px-5 mb-10 space-y-6" style={{ ringColor: 'var(--text-color)', backgroundColor: 'var(--card-bg)' }}>
        {messages.map((msg, idx) => (
          <div className="flex gap-x-4 items-center" key={idx}>
            <div className="w-10 h-10 rounded-full flex justify-center items-center" style={{ backgroundColor: 'var(--card-bg)' }}>
              <p style={{ color: 'var(--text-color)' }}>{msg.sender === "assistant" ? "AC" : "You"}</p>
            </div>

            <div className="flex-1 space-y-3">
              <p className="p-3 rounded-md" style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}>{msg.text}</p>
              <div className="flex gap-x-2 items-center">
                <p className="text-sm" style={{ color: 'var(--text-color)' }}>{msg.time}</p>
                <GiSpeaker onClick={() => speakText(msg.text)} size={20} style={{ color: 'var(--text-color)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-x-5">
        <textarea
          placeholder="Type your message here..."
          className="w-full rounded-md p-4 flex-1 outline-none"
          style={{ borderColor: 'var(--text-color)', backgroundColor: 'var(--background-color)' }}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="w-12 flex flex-col space-y-3">
          <div
            className={`p-3 flex justify-center items-center rounded-md cursor-pointer`}
            style={{ backgroundColor: listening ? 'var(--card-bg)' : 'var(--background-color)', color: 'var(--text-color)' }}
            onClick={handleVoiceInput}
            title="Click to speak"
          >
            <CiMicrophoneOn size={25} />
          </div>
          <div className="p-3 flex justify-center items-center rounded-md" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
            <GiSpeaker size={20} />
          </div>
          <div
            className="p-3 flex justify-center items-center rounded-md cursor-pointer"
            style={{ backgroundColor: 'var(--text-color)', color: 'var(--background-color)' }}
            onClick={handleSend}
          >
            <FaRegPaperPlane size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assistant;