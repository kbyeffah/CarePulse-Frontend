import React from "react";
import { CiMicrophoneOn, CiSpeaker } from "react-icons/ci";
import { FaRegPaperPlane } from "react-icons/fa";
import { GiSpeaker } from "react-icons/gi";

const Medication = () => {
	return (
		<div>
			<section className="border border-gray-300 rounded-md p-5">
				<div>
					<h1 className="text-2xl font-semibold">Chat with CarePulse Assistant</h1>
					<p className="text-gray-500 text-sm">
						Describe your symptoms or ask questions about your health
					</p>
				</div> 

				<div className="ring-1 ring-gray-200 ring-opacitiy-5 rounded-md mt-5 pb-[10%] pt-5 px-5 mb-10 ">
					<div className="flex gap-x-4 items-center justify-center">
						<div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
							<p>AC</p>
						</div>

						<div className="flex-1 space-y-3">
							<p className="bg-[#f4f4f5] text-zinc-700 p-3 ">
								I am CarePulse Assistant. How can i help you today Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Veritatis impedit modi, ratione eaque nulla magni in!
								Quae assumenda aut rem exercitationem, reiciendis laudantium et dolor facilis
								cupiditate iusto in nemo! ?
							</p>
							<div className="flex gap-x-2">
								<p className="text-gray-400 text-sm">{new Date().toLocaleTimeString()}</p>
								<GiSpeaker size={20} />
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-x-5">
					<textarea
						name=""
						id=""
						placeholder="Type your message here.."
						className="w-full border border-gray-300 rounded-md p-4 flex-1 outline-none"
					></textarea>
					<div className="w-12 flex flex-col space-y-3">
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
		</div>
	);
};

export default Medication;
