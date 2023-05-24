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

export { getAllCourses };
