import { getAndShowRelatedCourses, getCourseDetails, submitComment } from "./funcs/share.js";

const commentSubmitBtn = document.querySelector(".comments__respond-btn");

window.addEventListener("load", () => {
	getCourseDetails();
	getAndShowRelatedCourses();
});

commentSubmitBtn.addEventListener('click', submitComment)
