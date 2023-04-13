const TOKEN = "token";

export const setToken = payload => {
	const token = JSON.stringify(payload);
	localStorage.setItem(TOKEN, token);
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getUser = () => {
	const tokenFromLocalStorage = localStorage.getItem(TOKEN);
	if (tokenFromLocalStorage) return JSON.parse(tokenFromLocalStorage);
	return null;
};
