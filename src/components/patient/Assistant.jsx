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
		utterance.lang = "en-US"; // You can try 'en-GB', 'en-KE', etc. — Twi is not officially supported
		speechSynthesis.speak(utterance);
	};

	return (
		<section className="border border-gray-300 rounded-md p-5">
			<div>
				<h1 className="text-2xl font-semibold">Chat with CarePulse AI</h1>
				<p className="text-gray-500 text-sm">
					Describe your symptoms or ask questions about your health
				</p>
			</div>

			<div className="ring-1 ring-gray-200 rounded-md mt-5 pb-[10%] pt-5 px-5 mb-10 space-y-6">
				{messages.map((msg, idx) => (
					<div className="flex gap-x-4 items-center" key={idx}>
						<div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
							<p>{msg.sender === "assistant" ? "AC" : "You"}</p>
						</div>

						<div className="flex-1 space-y-3">
							<p className="bg-[#f4f4f5] text-zinc-700 p-3 rounded-md">{msg.text}</p>
							<div className="flex gap-x-2 items-center">
								<p className="text-gray-400 text-sm">{msg.time}</p>
								<GiSpeaker onClick={() => speakText(msg.text)} size={20} />
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex gap-x-5">
				<textarea
					placeholder="Type your message here..."
					className="w-full border border-gray-300 rounded-md p-4 flex-1 outline-none"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
				></textarea>

				<div className="w-12 flex flex-col space-y-3">
					<div
						className={`p-3 flex justify-center items-center rounded-md cursor-pointer ${
							listening ? "bg-green-300" : "bg-[#f4f4f5]"
						}`}
						onClick={handleVoiceInput}
						title="Click to speak"
					>
						<CiMicrophoneOn size={25} />
					</div>
					<div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md">
						<GiSpeaker size={20} />
					</div>
					<div
						className="bg-[#8dc9b5] text-white p-3 flex justify-center items-center rounded-md cursor-pointer"
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
