import { showUserNameInNavbar, renderTopbarMenu, getAndShowMenus } from "./funcs/share.js";

window.addEventListener("load", () => {
	showUserNameInNavbar();
  renderTopbarMenu();
  getAndShowMenus();
});