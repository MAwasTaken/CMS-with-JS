const getAllCourses = async () => {
	const coursesTableElem = document.querySelector(".table");

	const res = await fetch(`http://localhost:4000/v1/courses`);

	const courses = await res.json();

	courses.forEach((course, index) => {
		coursesTableElem.insertAdjacentHTML(
			"beforeend",
			`
      <tr>
				<td>
          ${index + 1}
				</td>
				<td id="id">${course.name}</td>
				<td id="name">
          ${course.price === 0 ? "رایگان" : course.price}
				</td>
				<td id="number">${course.registers}</td>
				<td id="condition">${course.support}</td>
				<td id="price">${course.categoryID}</td>
        <td>${course.courseAverageScore}</td>
        <td>${course.isComplete === 0 ? "در حال برگذاری" : "تکمیل شده"}</td>
				<td>
					<button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
				</td>
				<td>
					<button type="button" class="btn btn-danger" id="delete-btn">حذف</button>
				</td>
			</tr>
    `
		);
	});

	return courses;
};

let categoryID = -1;
let status = "start";
let courseCover = null;

const prepareCreateCourseForm = async () => {
	const categoryListElem = document.querySelector(".category-list");
	const courseStatusPresellElem = document.querySelector("#presell");
	const courseStatusStartElem = document.querySelector("#start");
	const courseCoverElem = document.querySelector("#course-cover");

	const res = await fetch(`http://localhost:4000/v1/category`);
	const categories = await res.json();

	console.log(categories);

	categories.forEach((category) => {
		categoryListElem.insertAdjacentHTML(
			"beforeend",
			`
      <option value="${category._id}">${category.title}</option>
    `
		);
	});

	categoryListElem.addEventListener("change", (event) => {
		categoryID = event.target.value;
		console.log(categoryID);
	});

	courseStatusPresellElem.addEventListener("change", (event) => (status = event.target.value));

	courseStatusStartElem.addEventListener("change", (event) => (status = event.target.value));

	courseCoverElem.addEventListener("change", (event) => {
		console.log(event.target.files);
	});
};

const createNewCourse = async () => {
	const courseNameElem = document.querySelector("#course-name");
	const coursePriceElem = document.querySelector("#course-price");
	const courseDescriptionElem = document.querySelector("#course-description");
	const courseShortNameElem = document.querySelector("#course-shortname");
	const courseSupportElem = document.querySelector("#course-support");

	const formData = new FormData();

	formData.append("name", courseNameElem.value.trim());
	formData.append("price", coursePriceElem.value.trim());
	formData.append("description", courseDescriptionElem.value.trim());
	formData.append("shortName", courseShortNameElem.value.trim());
	formData.append("support", courseSupportElem.value.trim());
	formData.append("caegoryID", categoryID);
	formData.append("status", status);
	formData.append("cover", courseCover);
};

export { getAllCourses, createNewCourse, prepareCreateCourseForm };
