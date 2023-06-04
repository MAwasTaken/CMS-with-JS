import { createCategory, getAndShowAllCategories, removeCategory } from './funcs/category.js';

window.removeCategory = removeCategory;

window.addEventListener('load', () => {
	const newCategoryBtn = document.querySelector('#create-category');

	getAndShowAllCategories();

	newCategoryBtn.addEventListener('click', (event) => {
		event.preventDefault();

		createCategory();
	});
});
