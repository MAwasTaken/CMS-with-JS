import { getAndShowCategoryCourses, insertCourseBoxHtmlTemplate, coursesSorting } from "./funcs/share.js";
import { searchInArray, paginateItems, getUrlParam } from "./funcs/utils.js";

window.addEventListener("load", () => {
	getAndShowCategoryCourses().then((responseCourses) => {
		let courses = [...responseCourses];
		const categoryCoursesWrapper = document.querySelector("#category-courses-wrapper");
		let coursesShowType = "row";
		const coursesShowTypeIcons = document.querySelectorAll(".courses-top-bar__icon-parent");
		const coursesFilteringSelections = document.querySelectorAll(".courses-top-bar__selection-item");
		const selectionTitleElement = document.querySelector(".courses-top-bar__selection-title");
		const coursesSearchBoxInput = document.querySelector(".courses-top-bar__input");

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

		// show category courses by row show type (user selection)
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

		// show category courses by row user filtering method
		coursesFilteringSelections.forEach((coursesFilteringSelection) => {
			coursesFilteringSelection.addEventListener("click", (event) => {
				coursesFilteringSelections.forEach((selectionElement) => selectionElement.classList.remove("courses-top-bar__selection-item--active"));
				event.target.classList.add("courses-top-bar__selection-item--active");

				selectionTitleElement.innerHTML = "";
				selectionTitleElement.insertAdjacentHTML(
					"beforeend",
					`
          ${event.target.innerHTML}
          <i class="fas fa-angle-down courses-top-bar__selection-icon"></i>
        `
				);

				let userFilteringSelection = event.target.dataset.key;
				let shownCourses = coursesSorting([...courses], userFilteringSelection);
				insertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper);
			});
		});

		// handle search in courses
		coursesSearchBoxInput.addEventListener("change", (event) => {
			const shownCourses = searchInArray([...responseCourses], "name", event.target.value);

			if (shownCourses.length) insertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper);
			else {
				categoryCoursesWrapper.innerHTML = "";
				categoryCoursesWrapper.insertAdjacentHTML(
					"beforeend",
					`
          <div class="alert alert-danger">هیچ دوره ای برای جستجوی شما وجود ندارد !</div>
        `
				);
			}
		});

		// handle pagination
		const coursePaginationWrapper = document.querySelector(".courses-pagination-list");

		const currentPage = getUrlParam("page");

		const shownCourses = paginateItems([...responseCourses], 3, categoryCoursesWrapper, currentPage);
		insertCourseBoxHtmlTemplate([...shownCourses], coursesShowType, categoryCoursesWrapper);
	});
});
