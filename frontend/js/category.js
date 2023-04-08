import { getAndShowCategoryCourses, insertCourseBoxHtmlTemplate } from "./funcs/share.js";

window.addEventListener("load", () => {
	getAndShowCategoryCourses().then((responseCourses) => {
		let courses = [...responseCourses];
		const categoryCoursesWrapper = document.querySelector("#category-courses-wrapper");
		let coursesShowType = "row";
		const coursesShowTypeIcons = document.querySelectorAll(".courses-top-bar__icon-parent");

		// show category courses by row show type
		if (courses.length) {
			insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper);
		} else {
			categoryCoursesWrapper.insertAdjacentHTML(
				"beforeend",
				`
        <div class="alert alert-danger">هیچ دوره ای برای این دسته بندی وجود ندارد :/</div>
      `
			);
		}

		coursesShowTypeIcons.forEach((coursesShowTypeIcon) => {
			coursesShowTypeIcon.addEventListener("click", (event) => {
				coursesShowTypeIcon.forEach((icon) => icon.classList.remove("courses-top-bar__icon--active"));

				event.target.classList.add("courses-top-bar__icon--active");

				if (String(event.target.className).includes("row")) {
					coursesShowType = "row";

					insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper);
				} else {
					coursesShowType = "column";

					insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper);
				}
			});
		});
	});
});
