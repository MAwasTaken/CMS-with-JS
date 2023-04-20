import { submitContactUsMsg } from "./funcs/share.js";

const submitFormBtn = document.querySelector(".login-form__btn");

submitFormBtn.addEventListener("click", (event) => {
	event.preventDefault();

	submitContactUsMsg();
});
