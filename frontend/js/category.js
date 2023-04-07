import { getAndShowCategoryCourses } from "./funcs/share.js";

window.addEventListener("load", () => {
  getAndShowCategoryCourses().then(data => {
    console.log(data);
  })
});
