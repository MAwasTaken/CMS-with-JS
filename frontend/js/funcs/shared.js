import { getMe } from "./auth.js";
import { isLogin } from "./utils.js";

const showUserNameInNavbar = () => {
	const isUserLogin = isLogin();

	const navbarProfileBox = document.querySelector(".main-header__profile");

	if (isUserLogin) {
		const userInfos = getMe().then((data) => {
			navbarProfileBox.setAttribute("href", "index.html");
			navbarProfileBox.innerHTML = `<span class='main-header__profile-text'>${data.name}</span>`;
		});
	} else {
		navbarProfileBox.setAttribute("href", "login.html");
		navbarProfileBox.innerHTML = "<span class='main-header__profile-text'>ورود / ثبت نام</span>";
	}
};

const renderTopbarMenu = async () => {
	const topBarList = document.querySelector(".top-bar__menu");

	const res = await fetch("http://localhost:4000/v1/menus/topbar");
	const topbarMenus = await res.json();

  console.log(topbarMenus);

  topBarList.innerHTML = "";

	[...topbarMenus].splice(0, 6).map((menu) => {
		topBarList.innerHTML += `<li class="top-bar__item">
      <a href="${menu.href}" class="top-bar__link">${menu.title}</a>
    </li>`;
	});
};

export { showUserNameInNavbar, renderTopbarMenu };