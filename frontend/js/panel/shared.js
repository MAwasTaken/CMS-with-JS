import { getAdminInfos } from "./funcs/utils.js";
import { insertNotificationHtmlTemplate, seenNotification } from "./funcs/notifications.js";

const $ = document;

window.seenNotification = seenNotification;

window.addEventListener("load", () => {
	const adminNameElem = document.querySelector("#admin-name");
	const notifactionsIconElem = document.querySelector("#notifications-icon");
	const notifactionsBoxElem = document.querySelector(".home-notification-modal");
  
	getAdminInfos().then((admin) => {
		// protect panel route
		if (admin.role === "ADMIN") {
			// show admin name in panel
			adminNameElem.innerHTML = admin.name;
		} else location.replace("../../login.html");

		notifactionsIconElem.addEventListener("mouseenter", () => {
			notifactionsBoxElem.classList.add("active-modal-notfication");
		});

		notifactionsBoxElem.addEventListener("mouseleave", () => {
			notifactionsBoxElem.classList.remove("active-modal-notfication");
		});

		insertNotificationHtmlTemplate(admin.notifications);
	});
});
