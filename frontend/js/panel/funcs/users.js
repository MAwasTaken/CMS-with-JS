import { getToken } from '../../funcs/utils.js';

const getAndShowAllUsers = async () => {
	const usersListTableElm = document.querySelector('.table tbody');

	usersListTableElm.innerHTML = '';

	const res = await fetch(`http://localhost:4000/v1/users`, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

	const fetchedUsers = await res.json();
  
  const users = fetchedUsers.reverse()

	users.forEach((user, index) => {
		usersListTableElm.insertAdjacentHTML(
			'beforeend',
			`
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td>${user.role === 'ADMIN' ? "مدیر" : "کاربر عادی"}</td>
        <td>
          <button
            type="button"
            class="btn btn-primary edit-btn">
            ویرایش
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-danger delete-btn">
            حذف
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-warning delete-btn text-white">
            حذف
          </button>
        </td>
    </tr>
    `
		);
	});
};

export { getAndShowAllUsers };
