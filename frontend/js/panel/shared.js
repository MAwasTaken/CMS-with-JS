import { getAdminInfos } from "./funcs/utils.js";

const $ = document;

window.addEventListener("load", () => {
	const adminWelcomeNameElem = $.querySelector("#admin-welcome-name");
	const adminNameElem = $.querySelector("#admin-name");

	getAdminInfos().then((admin) => {
		console.log(admin);
		adminWelcomeNameElem.innerHTML = admin.name;
		adminNameElem.innerHTML = admin.name;
	});
});
