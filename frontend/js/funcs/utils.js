const showSwal = (title, icon, buttons, callback) => {
	swal({
		title,
		icon,
		buttons,
	}).then((result) => callback(result));
};

const saveIntoLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const getFromLocalStorage = (key) => JSON.stringify(localStorage.getItem(key));

const getToken = () => JSON.parse(localStorage.getItem("user")).token;

export { showSwal, saveIntoLocalStorage, getFromLocalStorage, getToken };
