import { getToken, showSwal } from '../../funcs/utils.js';

const getAndShowAllMenus = async () => {
	const menusWrapperElem = document.querySelector('.table tbody');

	const res = await fetch(`http://localhost:4000/v1/menus/all`);
	const allMenus = await res.json();
	const menus = allMenus.reverse();

	menus.forEach((menu, index) => {
		menusWrapperElem.insertAdjacentHTML(
			'beforeend',
			`
    <tr>
      <td>${index + 1}</td>
      <td>${menu.title}</td>
      <td><a href="#">${menu.href}</a></td>
      <td>${menu.parent ? menu.parent.title : '---'}</td>
      <td>
        <button type="button" class="btn btn-primary edit-btn">
          ویرایش
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-danger delete-btn">
          حذف
        </button>
      </td>
    </tr>
    `
		);
	});

	return menus;
};

let parentMenuID = undefined;

const prepareCreateMenuForm = async () => {
	const parentMenusElem = document.querySelector('#parent-menus');

	parentMenusElem.addEventListener('change', (event) => (parentMenuID = event.target.value));

	const res = await fetch(`http://localhost:4000/v1/menus`);
	const menus = await res.json();

	menus.forEach((menu) => {
		parentMenusElem.insertAdjacentHTML(
			'beforeend',
			`
      <option value=${menu._id}>${menu.title}</option>
    `
		);
	});
};

const createNewMenu = async () => {
	const titleInputElem = document.querySelector('#title');
	const hrefInputElem = document.querySelector('#href');

	const newMenuInfos = {
		title: titleInputElem.value.trim(),
		href: hrefInputElem.value.trim(),
		parent: parentMenuID,
	};

	const res = await fetch(`http://localhost:4000/v1/menus`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${getToken()}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newMenuInfos),
	});

	if (res.ok) showSwal('منو با موفقیت اضافه شد!', 'success', 'عالی شد!', () => getAndShowAllMenus());
};

export { getAndShowAllMenus, prepareCreateMenuForm, createNewMenu };
