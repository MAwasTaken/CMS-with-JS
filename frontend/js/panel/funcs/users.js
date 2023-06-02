import { getToken, showSwal } from '../../funcs/utils.js';

const getAndShowAllUsers = async () => {
	const usersListTableElm = document.querySelector('.table tbody');

	usersListTableElm.innerHTML = '';

	const res = await fetch(`http://localhost:4000/v1/users`, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

	const fetchedUsers = await res.json();

	const users = fetchedUsers.reverse();

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
        <td>${user.role === 'ADMIN' ? 'مدیر' : 'کاربر عادی'}</td>
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
            class="btn btn-danger delete-btn"
            onClick="removeUser('${user._id}')"
            >
            حذف
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-warning delete-btn text-white"
            onClick="banUser('${user._id}')"
            >
            بن
          </button>
        </td>
    </tr>
    `
		);
	});
};

const removeUser = async (userID) => {
	showSwal('آیا از حذف کاربر اطمینان داربد ؟', 'warning', ['نه', 'آره'], async (result) => {
		if (result) {
			const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			if (res.ok)
				showSwal('کاربر با موفقیت حذف شد!', 'success', 'باشه', () => getAndShowAllUsers());
		}
	});
};

const banUser = async (userID) => {
	showSwal('آیا از بن کردن کاربر اطمینان داربد ؟', 'warning', ['نه', 'آره'], async (result) => {
		if (result) {
			const res = await fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});

			if (res.ok) showSwal('کاربر با موفقیت بن شد!', 'success', 'باشه', () => removeUser(userID));
		}
	});
};

export { getAndShowAllUsers, removeUser, banUser };
