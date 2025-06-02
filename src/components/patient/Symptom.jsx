import React, { useState } from "react";
import triads from "../../jsfiles/triads";
import { FaBrain, FaCalendar, FaHeart } from "react-icons/fa";
import chest from "../../jsfiles/chestsymp";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import nextsteps from "../../jsfiles/nextsteps";

const Symptom = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen(true);
	};

	const handleCloseModal = () => {
		setIsOpen(false);
	};
	return (
		<section className="border border-gray-300 p-5">
			<h1 className="text-2xl font-semibold">Visual Symptom Selection</h1>
			<p className="text-sm text-gray-500">Select the part of your body that you feel pain</p>

			<div className="grid grid-cols-3 gap-4 mt-5 ">
				{triads.map((signs, index) => (
					<div
						key={index}
						className="flex justify-center items-center flex-col border border-gray-300 p-4 hover:bg-gray-100 cursor-pointer rounded-md"
					>
						<signs.icon />
						<p>{signs.text}</p>
					</div>
				))}
			</div>

			<div className="border border-gray-300 p-5 mt-3">
				<div className="flex items-center gap-2">
					<FaBrain />
					<p className="font-medium text-lg">Select symptoms for Head:</p>
				</div>

				<div className="border border-gray-300 grid grid-cols-3 gap-4 p-4 mt-3">
					{chest.map((symps, index) => (
						<div
							key={index}
							className="border-gray-300 border rounded-md p-4 hover:bg-gray-100 cursor-pointer"
						>
							<p className="text-center">{symps}</p>
						</div>
					))}
				</div>

				<div className="border border-gray-300 rounded-md mt-5">
					<div className="flex gap-x-2 items-center p-5">
						<FaHeart />
						<p className="font-medium text-lg">Selected Symptoms:</p>
					</div>

					<div className="grid grid-rows-2 gap-y-3 p-3">
						<p className="border border-gray-200 mx-2 p-3 rounded-sm ">Chest: Chest Pain</p>
						<p className="border border-gray-200 mx-2 p-3 rounded-sm ">Chest: Chest Pain</p>
						<p className="border border-gray-200 mx-2 p-3 rounded-sm ">Chest: Chest Pain</p>

						<button
							onClick={handleOpenModal}
							className="bg-green-900 hover:bg-green-800 text-white w-full p-2 rounded-sm text-sm font-medium"
						>
							Submit Symptom
						</button>

						{isOpen && (
							<div className="fixed inset-0 bg-white/60 shadow-md backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
								<div className="bg-white rounded-sm p-6 border border-gray-200 w-120 h-[80vh] relative">
									<div className="flex items-center gap-x-2">
										<IoMdCheckmarkCircleOutline className="text-green-800" />
										<p className="font-medium text-lg">Symptoms Sumbitted Successfully</p>
									</div>
									<button
										onClick={handleCloseModal}
										className="absolute top-0 right-2 mx-2 text-3xl cursor-pointer hover:bg-gray-100 hover:text-red-700 w-10 h-10 rounded-full"
									>
										&times;
									</button>
									<p className="text-sm  text-gray-500 mt-2">
										Your symptoms have been recorded and will be reviewed by a healthcare
										professional
									</p>

									<div className="border border-gray-200 p-2 mt-2 rounded-sm space-y-2">
										<div className="flex gaap-2 items-center gap-2">
											<FaCalendar />
											<p className="text-zinc-700 font-medium">Priority Level: Normal</p>
										</div>
										<p className="text-sm text-[#7f8088] leading-normal -tracking-wide">
											Your symptoms have been recorded and a healthworker will review them shortly
										</p>
										<p className="font-semibold text-sm">
											Estimated Time Response: Within 24 Hours
										</p>
									</div>

									<div className="space-y-2 mt-5">
										<p className="font-medium">Next Steps:</p>
										{nextsteps.map((item, index) => (
											<div key={index} className="flex items-center gap-2">
												<item.icon className="text-green-800" />
												<p className="text-sm">{item.steps}</p>
											</div>
										))}
									</div>

									<div className="mt-4 flex gap-4 justify-center items-center">
										<button className="bg-white hover:bg-gray-100 border border-gray-200 rounded-md text-black px-2 py-2">
											Report New Symptom
										</button>
										<button className="bg-green-900 hover:bg-green-800 border border-gray-200 rounded-md text-white px-2 py-2">
											Go To Health Care Chat
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Symptom;
