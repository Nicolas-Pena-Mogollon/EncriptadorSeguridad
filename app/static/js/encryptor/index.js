import {validate} from "./validators/validation.js";

const inputs = document.querySelectorAll("input");
const textarea = document.querySelector("#input__txtArea");
const logoutBtn = document.getElementById("logout_btn");

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        validate(input.target);
    });
});

textarea.addEventListener("blur", (textarea) => {
    validate(textarea.target);
});

logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.cookie = "access_token=";
    window.location.href = "/index";
});

document.cookie = "text=";
document.cookie = "option=";
