import { createNewCourse, prepareCreateCourseForm } from "./funcs/courses.js";

window.addEventListener("load", () => {
	prepareCreateCourseForm();
});

const createCourseBtn = document.querySelector("#create-course-btn");

createCourseBtn.addEventListener("click", (event) => {
	event.preventDefault();

	createNewCourse();
});
