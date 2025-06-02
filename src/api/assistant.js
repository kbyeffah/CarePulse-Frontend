export const sendMessageToAssistant = async (message) => {
	await new Promise((res) => setTimeout(res, 1000));

	return {
		role: "assistant",
		message: `You said : ${message}. How can i help more`,
	};
};
