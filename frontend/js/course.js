import { getAndShowRelatedCourses, getCourseDetails } from "./funcs/share.js";

window.addEventListener("load", () => {
	getCourseDetails();
	getAndShowRelatedCourses();
});
