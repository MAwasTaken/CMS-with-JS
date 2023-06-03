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

const createNewUser = async () => {
	const nameInput = document.querySelector('#name');
	const usernameInput = document.querySelector('#username');
	const emailInput = document.querySelector('#email');
	const phoneInput = document.querySelector('#phone');
	const passwordInput = document.querySelector('#password');

	const newUserInfos = {
		name: nameInput.value.trim(),
		username: usernameInput.value.trim(),
		email: emailInput.value.trim(),
		phone: phoneInput.value.trim(),
		password: passwordInput.value.trim(),
		confirmPassword: passwordInput.value.trim(),
	};

	fetch(`http://localhost:4000/v1/auth/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUserInfos),
	}).then((res) => {
		if (res.status === 201)
			showSwal('ثبت نام با موفقیت انجام شد', 'success', 'خوبه!', (result) =>
				getAndShowAllUsers()
			);
		else if (res.status === 409)
			showSwal('نام کاربری یا ایمیل قبلا استفاده شده', 'error', 'تصحیح اطلاعات', () => {});
		else if (res.status === 403)
			showSwal('متاسفانه این شماره تماس محدود شده!', 'error', 'تصحیح اطلاعات', () => {});

		return res.json();
	});
};

export { getAndShowAllUsers, removeUser, banUser, createNewUser };
