import {validate} from "./validators/validation.js";

const inputs = document.querySelectorAll("input");
const textarea = document.querySelector("#input__txtArea");

inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        validate(input.target);
    });
});

textarea.addEventListener("blur", (textarea) => {
    validate(textarea.target);
});
