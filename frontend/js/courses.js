import { showAllCoursesInCoursesPage } from "./funcs/share.js";

window.addEventListener("load", () => {
	showAllCoursesInCoursesPage().then((data) => {
		console.log(data);
	});
});
