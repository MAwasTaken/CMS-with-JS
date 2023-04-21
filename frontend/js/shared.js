import { showUserNameInNavbar, renderTopbarMenu, getAndShowMenus, createNewNewsLetter } from "./funcs/share.js";

const newsLetterSubmitBtn = document.querySelector("#news-letter-submit-btn");

window.addEventListener("load", () => {
	showUserNameInNavbar();
	renderTopbarMenu();
	getAndShowMenus();
});

newsLetterSubmitBtn.addEventListener("click", () => createNewNewsLetter());
