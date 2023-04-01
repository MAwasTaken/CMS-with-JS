import { showSwal, saveIntoLocalStorage } from "./utils.js";

const register = () => {
	const nameInput = document.querySelector("#name");
	const usernameInput = document.querySelector("#username");
	const emailInput = document.querySelector("#email");
	const phoneInput = document.querySelector("#phone");
	const passwordInput = document.querySelector("#password");

	const newUserInfos = {
		name: nameInput.value.trim(),
		username: usernameInput.value.trim(),
		email: emailInput.value.trim(),
		phone: phoneInput.value.trim(),
		password: passwordInput.value.trim(),
		confirmPassword: passwordInput.value.trim(),
	};

	fetch(`http://localhost:4000/v1/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUserInfos),
	})
		.then((res) => {
			if (res.status === 201) {
				showSwal("ثبت نام با موفقیت انجام شد", "success", "ورود به پنل", (result) => {
					location.href = "index.html";
				});
			} else if (res.status === 409) showSwal("نام کاربری یا ایمیل قبلا استفاده شده", "error", "تصحیح اطلاعات", () => {});

			return res.json();
		})
		.then((result) => {
			console.log(result);

			saveIntoLocalStorage("user", {
				token: result.accessToken,
			});
		});
};

const login = () => {
	const identifierInput = document.querySelector("#identifier");
	const passwordInput = document.querySelector("#password");

	const userInfos = {
		identifier: identifierInput.value.trim(),
		password: passwordInput.value.trim(),
	};

	fetch("http://localhost:4000/v1/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userInfos),
	})
		.then((res) => {
			console.log(res);
      return res.json()
		})
		.then((result) => {
			console.log(result);
		});
};

export { register, login };
