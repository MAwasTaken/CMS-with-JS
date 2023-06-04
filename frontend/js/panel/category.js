import { createCategory, getAndShowAllCategories } from './funcs/category.js';

window.addEventListener('load', () => {
	const newCategoryBtn = document.querySelector('#create-category');

	getAndShowAllCategories();

	newCategoryBtn.addEventListener('click', (event) => {
		event.preventDefault();

		createCategory()
	});
});
