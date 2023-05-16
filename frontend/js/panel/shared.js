import { getAdminInfos } from "./funcs/utils.js";

const $ = document;

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
			console.log(admin);
			adminWelcomeNameElem.innerHTML = admin.name;
			adminNameElem.innerHTML = admin.name;
		} else location.replace("../../login.html");

		notifactionsIconElem.addEventListener("mouseenter", () => {
			notifactionsBoxElem.classList.add("active-modal-notfication");
		});

		notifactionsBoxElem.addEventListener("mouseleave", () => {
			notifactionsBoxElem.classList.remove("active-modal-notfication");
		});

		if (admin.notifications.length) {
			admin.notifications.forEach((notification) => {
				notificationModalList.insertAdjacentHTML(
					"beforeend",
					`
          <li class="home-notification-modal-item">
            <span class="home-notification-modal-text">${notification.msg}</span>
            <a href="">دیدم</a>
          </li>
        `
				);
			});
		} else {

		}
	});
});
