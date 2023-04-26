import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken, showSwal } from "./utils.js";

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
	const commentsContentWrapper = document.querySelector(".comments__content");

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
                  <a href="episode.html?name=${course.shortName}&id=${session._id}" class="introduction__accordion-link">${session.title}</a>
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

			if (course.comments.length)
				course.comments.forEach((comment) => {
					commentsContentWrapper.insertAdjacentHTML(
						"beforeend",
						`
              <div class="comments__item">
                <div class="comments__question">
                    <div class="comments__question-header">
                        <div class="comments__question-header-right">
                            <span class="comments__question-name comment-name">${comment.creator.name}</span>
                            <span class="comments__question-status comment-status">
                            (${comment.creator.role === "USER" ? "دانشجو" : "مدرس"})
                                </span>
                            <span class="comments__question-date comment-date">${comment.createdAt.slice(0, 10)}</span>
                        </div>
                        <div class="comments__question-header-left">
                            <a class="comments__question-header-link comment-link" href="#">پاسخ</a>
                        </div>
                    </div>
                    <div class="comments__question-text">
                       
                        <p class="comments__question-paragraph comment-paragraph">
                          ${comment.body}
                        </p>
                    </div>
                </div>
                ${
									comment.answerContent
										? `
                      <div class="comments__ansewr">
                          <div class="comments__ansewr-header">
                              <div class="comments__ansewr-header-right">
                                  <span class="comments__ansewr-name comment-name">
                                 ${comment.answerContent.creator.name}
                                      </span>
                                  <span class="comments__ansewr-staus comment-status">
                                    (${comment.creator.role === "USER" ? "دانشجو" : "مدرس"})
                                  </span>
                                  <span class="comments__ansewr-date comment-date">1401/04/21</span>
                              </div>
                              <div class="comments__ansewr-header-left">
                                  <a class="comments__ansewr-header-link comment-link" href="#">پاسخ</a>
                              </div>
                          </div>
                          <div class="comments__ansewr-text">
                              <p class="comments__ansewr-paragraph comment-paragraph">
                                ${comment.answerContent.body}
                              </p>
                          </div>
                      </div>
                    `
										: ""
								}
              </div>
          `
					);
				});
			else {
				commentsContentWrapper.insertAdjacentHTML(
					"beforeend",
					`
          <div class="alert alert-danger">هنوز هیچ کامنتی برای این دوره ثبت نشده!</div>
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

const getSessionDetails = async () => {
	const courseShortName = getUrlParam("name");
	const sessionID = getUrlParam("id");

	const sessionVideoPlayer = document.querySelector(".episode-content__video");
	const courseSessionsListElement = document.querySelector(".sidebar-topics__list");

	const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`, {
		headers: {
			Authorization: `Bearer ${getToken()}`,
		},
	});

	const responseData = await res.json();

	sessionVideoPlayer.setAttribute("src", `http://localhost:4000/courses/covers/${responseData.session.video}`);
	responseData.sessions.forEach((session) => {
		courseSessionsListElement.insertAdjacentHTML(
			"beforeend",
			`
      <li class="sidebar-topics__list-item">
        <div class="sidebar-topics__list-right">
          <svg class="svg-inline--fa fa-circle-play sidebar-topics__list-item-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"></path></svg><!-- <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i> Font Awesome fontawesome.com -->
          ${session.free ? `<a class="sidebar-topics__list-item-link" href="episode.html?name=${courseShortName}&id=${session._id}">${session.title}</a>` : `<span class="sidebar-topics__list-item-link">${session.title}</span>`}
        </div>
        <div class="sidebar-topics__list-left">
          <span class="sidebar-topics__list-item-time">${session.time}</span>
          ${session.free ? `` : `<i class="fa fa-lock"></i>`}
        </div>
      </li>
    `
		);
	});

	return responseData;
};

const submitContactUsMsg = async () => {
	const nameInputElem = document.querySelector("#name");
	const emailInputElem = document.querySelector("#email");
	const phoneInputElem = document.querySelector("#phone");
	const bodyInputElem = document.querySelector("#body");

	const newContactUsInfos = {
		name: nameInputElem.value.trim(),
		email: emailInputElem.value.trim(),
		phone: phoneInputElem.value.trim(),
		body: bodyInputElem.value.trim(),
	};

	const res = await fetch(`http://localhost:4000/v1/contact`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newContactUsInfos),
	});

	const result = await res.json();

	if (res.status === 201) showSwal("پیغام شما با موفقیت ارسال شد.", "success", "ورود به پنل", (result) => (location.href = "index.html"));
	else showSwal("مشکلی در ارسال پیغام وجود دارد! \nلطفا بعدا تست کنید", "error", "ای بابا :(", () => {});

	console.log(result);
};

const createNewNewsLetter = async () => {
	const newsLetterInput = document.querySelector("#news-letter-input");

	const newNewsLetterEmailObj = {
		email: newsLetterInput.value.trim(),
	};

	const res = await fetch(`http://localhost:4000/v1/newsletters`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newNewsLetterEmailObj),
	});

	if (res.ok) showSwal("با موفقیت در خبرنامه سبزلرن عضو شدید.", "success", "متوجه شدم", () => {});
};

const globalSearch = async () => {
	const searchValue = getUrlParam("value");
	console.log(searchValue);
};

export { showUserNameInNavbar, renderTopbarMenu, getAndShowAllCourses, getAndShowPopularCourses, getAndShowPresellCourses, getAndShowArticles, getAndShowMenus, getAndShowCategoryCourses, insertCourseBoxHtmlTemplate, coursesSorting, getCourseDetails, getAndShowRelatedCourses, getSessionDetails, submitContactUsMsg, createNewNewsLetter, globalSearch };
