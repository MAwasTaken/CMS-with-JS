const showSwal = (title, icon, buttons, callback) => {
	swal({
		title,
		icon,
		buttons,
	}).then((result) => callback(result));
};

const saveIntoLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getFromLocalStorage = (key) => JSON.stringify(localStorage.getItem(key));

const getToken = () => {
	const userInfos = JSON.parse(localStorage.getItem("user"));
	return userInfos ? userInfos.token : null;
};

export { showSwal, saveIntoLocalStorage, getFromLocalStorage, getToken };
