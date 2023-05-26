import { deleteCourse, getAllCourses } from "./funcs/courses.js";

window.deleteCourse = deleteCourse;

window.addEventListener("load", () => {
  getAllCourses();
});
