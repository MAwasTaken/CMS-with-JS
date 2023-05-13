import { getAllCourses, insertCourseBoxHtmlTemplate } from "./funcs/share.js";
import { paginateItems, getUrlParam, addParamToUrl } from "./funcs/utils.js";

window.addParamToUrl = addParamToUrl;

const coursePaginationWrapperElement = document.querySelector("#courses-pagination");
const coursesWrapperElement = document.querySelector("#courses-wrapper");

window.addEventListener("load", () => {
	getAllCourses().then((courses) => {
		const currentPage = getUrlParam("page");
		let shownCourses = paginateItems([...courses], 3, coursePaginationWrapperElement, currentPage);
		insertCourseBoxHtmlTemplate([...shownCourses], "row", coursesWrapperElement);
	});
});
