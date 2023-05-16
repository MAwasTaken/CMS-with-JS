import { getAdminInfos } from "./funcs/utils.js";
import { insertNotificationHtmlTemplate, seenNotification } from "./funcs/notifications.js";

const $ = document;

window.seenNotification = seenNotification;

window.addEventListener("load", () => {
	const adminWelcomeNameElem = $.querySelector("#admin-welcome-name");
	const adminNameElem = $.querySelector("#admin-name");
	const notifactionsIconElem = $.querySelector("#notifications-icon");
	const notifactionsBoxElem = $.querySelector(".home-notification-modal");
	const notificationModalList = $.querySelector(".home-notification-modal-list");

	getAdminInfos().then((admin) => {
		// protect panel route
		if (admin.role === "ADMIN") {
			// show admin name in panel
			adminWelcomeNameElem.innerHTML = admin.name;
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
