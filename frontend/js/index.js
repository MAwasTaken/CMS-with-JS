import { getAndShowAllCourses, getAndShowArticles, getAndShowMenus, getAndShowPopularCourses, getAndShowPresellCourses, globalSearch } from "./funcs/share.js";

const $ = document;
const landingTitle = $.querySelector(".landing__title");
const landingCoursesCount = $.querySelector("#courses-count");
const landingMinutesCounter = $.querySelector("#minutes-counter");
const landingUsersCount = $.querySelector("#users-counter");
const globalSearchBtn = $.querySelector("#search-btn");
const globalSearchInput = $.querySelector("#search-input");

window.addEventListener("load", () => {
	let landingText = "ما به هر قیمتی دوره آموزشی تولید نمی کنیم !";
	let typeIndex = 0;

	typeWriter(landingText, typeIndex);
	makeCounter(40, landingCoursesCount, 20);
	makeCounter(31_320, landingMinutesCounter, 1);
	makeCounter(31_071, landingUsersCount, 1);

	getAndShowAllCourses();
	getAndShowPopularCourses();
	getAndShowPresellCourses();
	getAndShowArticles();

	globalSearchBtn.addEventListener("click", (event) => {
		event.preventDefault();
		location.href = `search.html?value=${globalSearchInput.value.trim()}`;
	});
});

function typeWriter(text, index) {
	if (index < text.length) {
		landingTitle.innerHTML += text[index];
		index++;

		setTimeout(() => {
			typeWriter(text, index);
		}, 100);
	} else if ((index = text.length)) {
		setTimeout(() => {
			index = 0;
			landingTitle.innerHTML = "";

			typeWriter(text, index);
		}, 5000);
	}
}

function makeCounter(max, elem, countDown) {
	let counter = 0;

	const interval = setInterval(() => {
		if (counter === max) {
			clearInterval(interval);
		}

		elem.innerHTML = counter;
		counter++;
	}, countDown);
}
