import { getToken } from "../../funcs/utils.js";

const insertNotificationHtmlTemplate = (notifications) => {
	const notificationModalListElem = document.querySelector(".home-notification-modal-list");

	if (notifications.length) {
		notifications.forEach((notification) => {
			notificationModalListElem.insertAdjacentHTML(
				"beforeend",
				`
        <li class="home-notification-modal-item">
          <span class="home-notification-modal-text">${notification.msg}</span>
          <a href="#" onclick="seenNotification('${notification._id}')">دیدم</a>
        </li>
      `
			);
		});
	} else {
		notificationModalListElem.insertAdjacentHTML(
			"beforeend",
			`
      <li class="alert alert-danger text-center">
          هیچ نوتیفیکیشنی وجود ندارد!
      </li>
    `
		);
	}
};

const seenNotification = async (notificationID) => {
	const res = await fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

	const result = await res.json();
};

export { insertNotificationHtmlTemplate, seenNotification };
