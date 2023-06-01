import {
	createNewMenu,
	getAndShowAllMenus,
	prepareCreateMenuForm,
	removeMenu,
} from './funcs/menus.js';

window.removeMenu = removeMenu;

window.addEventListener('load', () => {
	const createMenuBtn = document.querySelector('#create-menu-btn');

	prepareCreateMenuForm();
	getAndShowAllMenus();

	createMenuBtn.addEventListener('click', (event) => {
		event.preventDefault();

		createNewMenu();
	});
});
