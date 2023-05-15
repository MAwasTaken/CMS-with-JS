import { getAdminInfos } from "./funcs/utils.js";

const $ = document;

window.addEventListener("load", () => {
	const adminWelcomeNameElem = $.querySelector("#admin-welcome-name");
	const adminNameElem = $.querySelector("#admin-name");

	getAdminInfos().then((admin) => {
		// protect panel route
		if (admin.role === "ADMIN") {
			// show admin name in panel
			console.log(admin);
			adminWelcomeNameElem.innerHTML = admin.name;
			adminNameElem.innerHTML = admin.name;
		} else location.replace("../../login.html");
	});
});
