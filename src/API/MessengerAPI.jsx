import axiosClient from './axiosClient';

const MessengerAPI = {
	getMessage: () => {
		const url = `/mess/get/all`;
		return axiosClient.get(url);
	},

	getMessageId: (query) => {
		const url = `/mess/${query}`;
		return axiosClient.get(url);
	},
};

export default MessengerAPI;
