import { validate } from "./validators/validation.js";

const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");

inputs.forEach((input) => {
  input.addEventListener("blur", (input) => {
    validate(input.target);
  });
});

textareas.forEach((txta) => {
  txta.addEventListener("blur", (txta) => {
    validate(txta.target);
  });
});