import { globalSearch } from "./funcs/share.js";

window.addEventListener("load", () => {
	globalSearch().then((data) => {
		console.log(data);
	});
});
