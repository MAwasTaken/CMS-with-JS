import { createNewMenu, getAndShowAllMenus, prepareCreateMenuForm } from './funcs/menus.js';

window.addEventListener('load', () => {
	const createMenuBtn = document.querySelector('#create-menu-btn');

	prepareCreateMenuForm();
	getAndShowAllMenus();

	createMenuBtn.addEventListener('click', (event) => {
		event.preventDefault();

		createNewMenu();
	});
});
