import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken } from "./utils.js";

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
          <a href="course.html?name=${course.shortName}">
            <img class="course-box__img" src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" />
          </a>
          <div class="course-box__main">
            <a class="course-box__title" href="course.html?name=${course.shortName}">${course.name}</a>
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

	popularCourses.map((course) => {
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

const getAndShowArticles = async () => {
	const articlesWrapper = document.querySelector("#articles-wrapper");

	const res = await fetch("http://localhost:4000/v1/articles");
	const articles = await res.json();

	articles.slice(0, 6).map((article) => {
		articlesWrapper.insertAdjacentHTML(
			"beforeend",
			`
	      <div class="col-4">
	      <div class="article-card">
	        <div class="aricle-card__header">
	          <a class="article-card__link-img" href="#">
	            <img class="article-card__img" src=http://localhost:4000/courses/covers/${article.cover} alt="Article Cover" />
	          </a>
	        </div>
	        <div class="article-card__content">
	          <a href="#" class="article-card__link">${article.title}</a>
	          <p class="article-card__text">${article.description}</p>
	          <a href="#" class="article-card__btn">بیشتر بخوانید</a>
	        </div>
	      </div>
	    </div>
	    `
		);
	});

	return articles;
};

const getAndShowMenus = async () => {
	const menuWrapper = document.querySelector("#menus-wrapper");

	const res = await fetch("http://localhost:4000/v1/menus");
	const menus = await res.json();

	menus.map((menu) => {
		menuWrapper.insertAdjacentHTML(
			"beforeend",
			`
      <li class="main-header__item">
        <a href=category.html?cat=${menu.href} class="main-header__link">${menu.title}
          ${
						menu.submenus.length !== 0
							? `
              <i class="fas fa-angle-down main-header__link-icon"></i>
              <ul class="main-header__dropdown">
                ${menu.submenus
									.map(
										(submenu) =>
											`<li class='main-header__dropdown-item'>
										    <a href='#' class='main-header__dropdown-link'>
											    ${submenu.title}
										    </a>
									    </li>
                    `
									)
									.join("")}
              </ul>
            `
							: ""
					}
        </a>
      </li>
    `
		);
	});

	return menus;
};

const getAndShowCategoryCourses = async () => {
	const categoryName = getUrlParam("cat");

	const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`);
	const courses = await res.json();

	// bakend brokedown
	return [];
};

const insertCourseBoxHtmlTemplate = (courses, showType, parentElement) => {
	parentElement.innerHTML = "";

	if (showType === "row") {
		courses.map((course) => {
			parentElement.insertAdjacentHTML(
				"beforeend",
				`<div class="col-4">
          <div class="course-box">
            <a href="#">
              <img class="course-box__img" src="images/courses/jango.png" alt="Course img" />
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
        </div>`
			);
		});
	} else {
		courses.map((course) =>
			parentElement.insertAdjacentHTML(
				"beforeend",
				`
              <div class="col-12">
              <div class="course-box">
                <a href="#">
                  <img class="course-box__img" src="images/courses/jango.png" alt="Course img" />
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
	}
};

const coursesSorting = (array, filterMethod) => {
	let outputArray = [];

	switch (filterMethod) {
		case "default": {
			outputArray = array;

			break;
		}

		case "free": {
			outputArray = array.filter((course) => course.price === 0);

			break;
		}

		case "money": {
			outputArray = array.filter((course) => course.price !== 0);

			break;
		}

		case "first": {
			outputArray = [...array].reverse();
		}

		case "last": {
			outputArray = array;
		}

		default:
			{
				outputArray = array;
			}

			return outputArray;
	}
};

const getCourseDetails = () => {
	const courseShortName = getUrlParam("name");

	const $ = document;
	const courseTitleElement = $.querySelector(".course-info__title");
	const courseDescriptionElement = $.querySelector(".course-info__text");
	const courseCategoryElement = $.querySelector(".course-info__link");
	const courseRegisterInfoElement = $.querySelector(".course-info__register-title");
	const courseStatusElement = $.querySelector(".course-boxes__box-left-subtitle");
	const courseSupportElement = $.querySelector(".course-boxes__box-left--support");
	const courseLastUpdate = $.querySelector(".course-boxes__box-left--last-update");
	const courseTimeElement = $.querySelector(".course-boxes__box-left--time");
	const courseCommentElement = $.querySelector(".course-info__total-comment-text");
	const courseStudentsCountElement = $.querySelector(".course-info__total-sale-number");
	const courseSessionsWrapper = $.querySelector(".sessions-wrapper");

	fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	})
		.then((res) => res.json())
		.then((course) => {
			console.log(course);
			courseTitleElement.innerHTML = course.name;
			courseDescriptionElement.innerHTML = course.description;
			courseCategoryElement.innerHTML = course.categoryID.title;
			courseRegisterInfoElement.insertAdjacentHTML(
				"beforeend",
				course.isUserRegisteredToThisCourse
					? `
        دانشجوی دوره هستید
      `
					: `
      ثبت نام در دوره`
			);
			courseStatusElement.innerHTML = course.isComplete ? `تکمیل شده` : `در حال برگزاری`;
			courseSupportElement.innerHTML = course.support;
			courseLastUpdate.innerHTML = course.updatedAt.slice(0, 10);

			let courseTotalTimeMinute = null;
			let courseTotalTimeSecond = null;

			course.sessions.map((session) => {
				courseTotalTimeMinute += Number(session.time.slice(0, 2));
				courseTotalTimeSecond += Number(session.time.slice(3, 5));
			});

			if (courseTotalTimeSecond >= 60) {
				courseTotalTimeMinute += Math.floor(courseTotalTimeSecond / 60);
				courseTotalTimeSecond = courseTotalTimeSecond - Math.floor(courseTotalTimeSecond / 60) * 60;
			}

			courseTimeElement.innerHTML = Math.floor(courseTotalTimeMinute / 60) + " ساعت";
			courseCommentElement.innerHTML = course.comments.length + " دیدگاه";
			courseStudentsCountElement.innerHTML = course.courseStudentsCount;

			if (course.sessions.length)
				course.sessions.forEach((session, index) => {
					courseSessionsWrapper.insertAdjacentHTML(
						"beforeend",
						`
              <div class="accordion-body introduction__accordion-body">
              <div class="introduction__accordion-right">
                <span class="introduction__accordion-count">${index + 1}</span>
                <i class="fab fa-youtube introduction__accordion-icon"></i>
                ${
									session.free || course.isUserRegisteredToThisCourse
										? `
                  <a href="#" class="introduction__accordion-link">${session.title}</a>
                  `
										: `
                  <span href="#" class="introduction__accordion-link">${session.title}</span>
                `
								}
              </div>
              <div class="introduction__accordion-left">
                <span class="introduction__accordion-time">${session.time}</span>
                ${
									!(session.free || course.isUserRegisteredToThisCourse)
										? `
                  <i class="fa fa-lock"></i>
                `
										: ""
								}
              </div>
            </div>
          `
					);
				});
			else {
				courseSessionsWrapper.insertAdjacentHTML(
					"beforeend",
					`
              <div class="accordion-body introduction__accordion-body">
              <div class="introduction__accordion-right">
                <span class="introduction__accordion-count"> -- </span>
                <i class="fab fa-youtube introduction__accordion-icon"></i>
                <span href="#" class="introduction__accordion-link">هنوز جلسه ای آپلود نشده است !</span>
              </div>
              <div class="introduction__accordion-left">
                <span class="introduction__accordion-time"> --:-- </span>
              </div>
            </div>
          `
				);
			}
		});
};

const getAndShowRelatedCourses = async () => {
	const courseShortName = getUrlParam("name");

	const courseRelatedCoursesWrapper = document.querySelector(".course-info__courses-list");

	const res = await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`);
	const relatedCourses = await res.json();

	if (relatedCourses.length)
		relatedCourses.forEach((relatedCourse) =>
			courseRelatedCoursesWrapper.insertAdjacentHTML(
				"beforeend",
				`
          <li class="courses-info__courses-list-item">
            <a href="course.html?name=${relatedCourse.shortName}" class="course-info__courses-link">
              <img src='http://localhost:4000/courses/covers/${relatedCourse.cover}' alt="course cover" class="course-info__courses-img" />
              <span class="course-info__courses-text">${relatedCourse.name}</span>
            </a>
          </li>
        `
			)
		);

	return relatedCourses;
};

export { showUserNameInNavbar, renderTopbarMenu, getAndShowAllCourses, getAndShowPopularCourses, getAndShowPresellCourses, getAndShowArticles, getAndShowMenus, getAndShowCategoryCourses, insertCourseBoxHtmlTemplate, coursesSorting, getCourseDetails, getAndShowRelatedCourses };
