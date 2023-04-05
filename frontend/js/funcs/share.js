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

	topBarList.innerHTML = "";

	const suffledArray = topbarMenus.sort((a, b) => 0.5 - Math.random());

	suffledArray.splice(0, 6).map((menu) => {
		topBarList.innerHTML += `<li class="top-bar__item">
      <a href="${menu.href}" class="top-bar__link">${menu.title}</a>
    </li>`;
	});

	topBarList.innerHTML += `<li class="top-bar__item">
  <a href="#" class="top-bar__link">20,000 تومان</a>
</li>`;
};

const getAndShowAllCourses = async () => {
	const coursesContainer = document.querySelector("#courses-container");

	const res = await fetch("http://localhost:4000/v1/courses");
	const courses = await res.json();

	courses.slice(0, 6).map((course) => {
		coursesContainer.insertAdjacentHTML(
			"beforeend",
			`
        <div class="col-4">
        <div class="course-box">
          <a href="#">
            <img class="course-box__img" src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" />
          </a>
          <div class="course-box__main">
            <a class="course-box__title" href="#">${course.name}</a>
            <div class="course-box__rating-teacher">
              <div class="course-box__teacher">
                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <a class="course-box__teacher-link" href="#">${course.creator}</a>
              </div>
              <div class="course-box__rating">
              ${Array(course.courseAverageScore)
								.fill(1)
								.map((score) => '<img class="course-box__star" src="images/svgs/star_fill.svg" alt="rating" />')
								.join(" ")}
              ${Array(5 - course.courseAverageScore)
								.fill(0)
								.map((score) => '<img class="course-box__star" src="images/svgs/star.svg" alt="rating" />')
								.join(" ")}
              </div>
            </div>
            <div class="course-box__status">
              <div class="course-box__users">
                <i class="fas fa-users course-box__users-icon"></i>
                <span class="course-box__users-text" href="#">${course.registers}</span>
              </div>
              <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
            </div>
          </div>
          <div class="course-box__footer">
            <a class="course-box__footer-link" href="#">
              مشاهده اطلاعات
              <i class="fas fa-arrow-left course-box__footer-icon"></i>
            </a>
          </div>
        </div>
      </div>
    `
		);
	});

	return courses;
};

const getAndShowPopularCourses = async () => {
	const popularCoursesWrapper = document.querySelector("#popular-courses-wrapper");

	const res = await fetch("http://localhost:4000/v1/courses/popular");
	const popularCourses = await res.json();

	popularCourses.forEach((course) => {
		popularCoursesWrapper.insertAdjacentHTML(
			"beforeend",
			`
        <div class="swiper-slide">
        <div class="course-box">
          <a href="#">
            <img class="course-box__img" src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" />
          </a>
          <div class="course-box__main">
            <a class="course-box__title" href="#">${course.name}</a>
            <div class="course-box__rating-teacher">
              <div class="course-box__teacher">
                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <a class="course-box__teacher-link" href="#">${course.creator}</a>
              </div>
              <div class="course-box__rating">
              ${Array(course.courseAverageScore)
								.fill(1)
								.map((score) => '<img class="course-box__star" src="images/svgs/star_fill.svg" alt="rating" />')
								.join(" ")}
              ${Array(5 - course.courseAverageScore)
								.fill(0)
								.map((score) => '<img class="course-box__star" src="images/svgs/star.svg" alt="rating" />')
								.join(" ")}
              </div>
            </div>
            <div class="course-box__status">
              <div class="course-box__users">
                <i class="fas fa-users course-box__users-icon"></i>
                <span class="course-box__users-text" href="#">${course.registers}</span>
              </div>
              <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
            </div>
          </div>
          <div class="course-box__footer">
            <a class="course-box__footer-link" href="#">
              مشاهده اطلاعات
              <i class="fas fa-arrow-left course-box__footer-icon"></i>
            </a>
          </div>
        </div>
      </div>
    `
		);
	});

	return popularCourses;
};

const getAndShowPresellCourses = async () => {
	const presellCoursesWrapper = document.querySelector("#presell-courses-wrapper");

	const res = await fetch("http://localhost:4000/v1/courses/presell");
	const presellCourses = await res.json();

	presellCourses.map((course) =>
		presellCoursesWrapper.insertAdjacentHTML(
			"beforeend",
			`
        <div class="swiper-slide">
        <div class="course-box">
          <a href="#">
            <img class="course-box__img" src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" />
          </a>
          <div class="course-box__main">
            <a class="course-box__title" href="#">${course.name}</a>
            <div class="course-box__rating-teacher">
              <div class="course-box__teacher">
                <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                <a class="course-box__teacher-link" href="#">${course.creator}</a>
              </div>
              <div class="course-box__rating">
              ${Array(course.courseAverageScore)
								.fill(1)
								.map((score) => '<img class="course-box__star" src="images/svgs/star_fill.svg" alt="rating" />')
								.join(" ")}
              ${Array(5 - course.courseAverageScore)
								.fill(0)
								.map((score) => '<img class="course-box__star" src="images/svgs/star.svg" alt="rating" />')
								.join(" ")}
              </div>
            </div>
            <div class="course-box__status">
              <div class="course-box__users">
                <i class="fas fa-users course-box__users-icon"></i>
                <span class="course-box__users-text" href="#">${course.registers}</span>
              </div>
              <span class="course-box__price">${course.price === 0 ? "رایگان" : course.price.toLocaleString()}</span>
            </div>
          </div>
          <div class="course-box__footer">
            <a class="course-box__footer-link" href="#">
              مشاهده اطلاعات
              <i class="fas fa-arrow-left course-box__footer-icon"></i>
            </a>
          </div>
        </div>
      </div>
    `
		)
	);

	return presellCourses;
};

export { showUserNameInNavbar, renderTopbarMenu, getAndShowAllCourses, getAndShowPopularCourses, getAndShowPresellCourses };
