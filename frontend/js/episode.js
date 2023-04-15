import { getSessionDetails } from "./funcs/share.js";

window.addEventListener("load", () => {
	getSessionDetails().then((data) => console.log(data));
});
