import React from "react";
import healthworker from "../../jsfiles/healthworker";
import { CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
import { FaRegPaperPlane } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";

const HealthCare = () => {
	const statusdot = (status) => {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "busy":
				return "bg-yellow-500";

			default:
				return "bg-gray-400";
		}
	};

	const textColor = (color) => {
		switch (color) {
			case "online":
				return "text-green-500";

			case "busy":
				return "text-yellow-500";

			default:
				return "text-gray-400";
		}
	};

	return (
		<section className="border border-gray-200 rounded-md overflow-hidden ">
			<div className="px-4 py-2 border-b border-gray-200">
				<h1 className="text-2xl font-semibold  rounded-md">Chat with HealthCare Workers</h1>
				<p className="text-sm text-gray-500 mb-2">
					Direct communication with doctors and healthcare professionals
				</p>
			</div>

			<main className="flex h-full">
				<aside className="w-1/3 border-r border-gray-200 overflow-y-auto">
					<div className="border-b border-gray-200 px-4 py-2">
						<h1 className="text-lg font-semibold">HealthCare Workers</h1>
						<p className="text-sm text-gray-500">Select a healthworker to chat with</p>
					</div>

					{healthworker.map((worker, index) => (
						<div
							key={index}
							className="flex items-start gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-300"
						>
							<div className="relative">
								<div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
									{worker.initials}
								</div>
								<span
									className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${statusdot(
										worker.status
									)}`}
								></span>
							</div>
							{/* second div for name */}
							<div className="flex-1">
								<div className="flex justify-between items-center">
									<p className="font-medium ">{worker.name}</p>
									<p className="text-xs text-gray-500">{worker.lastSeen}</p>
								</div>
								<p className="text-base text-gray-500">{worker.role}</p>
								<p className={`${textColor(worker.status)} font-medium text-sm`}>{worker.status}</p>
							</div>
						</div>
					))}
				</aside>

				{/* Chat section */}
				<section className="flex-1 flex flex-col">
					{/* heading */}
					<div className="flex gap-3 p-4 border-b border-gray-300">
						<div className="bg-gray-400 w-10 h-10 rounded-full flex justify-center items-center">
							<p>KN</p>
						</div>
						<div className="">
							<p className="font-medium flex gap-x-2">
								Dr. Kwame Nkrumah
								<span className="text-sm text-green-900 bg-green-300 rounded-full px-2">
									Online
								</span>
							</p>
							<p className="text-sm text-gray-500">General Physician</p>
						</div>
					</div>

					{/* chat messages */}
					<div className="p-4 space-y-2 overflow-y-auto border-b border-gray-300 mb-10 ">
						<p className="text-gray-400 text-xs text-center">Yesterday</p>
						<div className="flex gap-x-2">
							<div className="bg-gray-200 w-5 h-5 rounded-full"></div>
							<p className="bg-gray-100 p-2 rounded-md max-w-xs">How can I help you today</p>
						</div>
						<p className="bg-gray-200 text-gray-500 text-xs text-center rounded-full max-w-12 py-1 mx-auto">
							Today
						</p>
						<div className="flex gap-2">
							<p className="bg-green-700 text-white ml-auto p-2 rounded-md max-w-xs">
								I have been experiencing severe headache
							</p>
							<div className="bg-gray-200 w-5 h-5 rounded-full"></div>
						</div>
						<div className="flex gap-2">
							<p className="bg-green-700 text-white ml-auto p-2 rounded-md max-w-xs">
								I have been experiencing severe headache
							</p>
							<div className="bg-gray-200 w-5 h-5 rounded-full"></div>
						</div>
					</div>

					{/* Submit section */}
					<div className="flex gap-x-3 items-center ">
						<textarea
							name=""
							id=""
							placeholder="Type your message here"
							className="w-full border border-gray-300 rounded-md mx-4  py-3 px-5 pr-12 outline-none resize-none"
						></textarea>
						<div className="w-12 flex flex-col space-y-2 mx-4">
							<div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md">
								<CiMicrophoneOn size={25} />
							</div>
							<div className="bg-[#f4f4f5] p-3 flex justify-center items-center rounded-md">
								<GiSpeaker size={20} />
							</div>
							<div className="bg-[#8dc9b5] text-white p-3 flex justify-center items-center rounded-md">
								<FaRegPaperPlane size={20} />
							</div>
						</div>
					</div>
				</section>
			</main>
		</section>
	);
};

export default HealthCare;
