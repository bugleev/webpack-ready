import { btn } from "./nav";
import { testType } from "./type.ts";
import img from "./download.png";
const lazyCss = () => import("./app.css");
const a = "test";
document.body.appendChild(btn);
btn.addEventListener("click", e => {
  lazyCss();
})
const image = document.createElement("img");
image.src = img
document.body.appendChild(image)
console.log('img:', img)
console.log(a, testType);
