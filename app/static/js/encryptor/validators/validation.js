/**
 * validates the information of an input
 * @param {Element} input an input DOM object
 */
export function validate(input) {
    // Obtain the dataset
    const inputType = input.dataset.tipo;
    if (validadores[inputType]) {
        validadores[inputType](input);
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove("input__container__invalid");
        input.parentElement.querySelector(".input__message__error").innerHTML = "";
    } else if (input.validity.customError) {
        input.parentElement.classList.add("input__container__invalid");
        input.parentElement.querySelector(".input__message__error").innerHTML = input.validationMessage;
    } else {
        input.parentElement.classList.add("input__container__invalid");
        input.parentElement.querySelector(".input__message__error").innerHTML =
            showMessageError(inputType, input);
    }
}

const errorTypes = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
];

const errorMessages = {
    text: {
        valueMissing: "El campo no puede estar vacío",
    },
    a: {
        valueMissing: "El campo no puede estar vacío",
        typeMismatch: "No es un número válido",
    },
    b: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "No es un número válido",
    },
};

/**
 * Extracts the invalidity type to assign the respective message
 * @param {String} inputType dataset type
 * @param {Element} input the input DOM element
 * @returns
 */
function showMessageError(inputType, input) {
    let message = "";
    errorTypes.forEach((error) => {
        if (input.validity[error]) {
            message = errorMessages[inputType][error];
        }
    });
    return message;
}

/**
 * Custom validators
 */
const validadores = {
   /* text: (input) => validateText(input),*/
    a: (input) => validateA(input),
};

function validateText(input) {
    const textValue = input.value;
    // Obtain the number of words
    var palabras = textValue.split(/\s+/);
    palabras = palabras.filter(function (palabra) {
        return palabra.length > 0;
    });

    let mensaje = "";
    // Cambiar a 90
    if (palabras.length < 85) {
        mensaje = "El texto debe tener más de 90 palabras";
    }
    // Evitar que ingresen caracteres diferentes
    /*
    else if (/[^a-zA-ZñÑ\s]/.test(textValue)) {
        mensaje = "El texto debe contener solo letras de la A a la Z";
    }*/
    input.setCustomValidity(mensaje);
}


function validateA(input) {
    const textValue = input.value;
    let mensaje = "";
    if (textValue == "") {
        mensaje = "El campo no puede estar vacío"
    } else if (isNaN(parseInt(textValue)) || !Number.isInteger(parseInt(textValue))) {
        mensaje = "Ingrese solo números"
    } else {
        let mcd = calculateMCD(parseInt(input.value), 27);
        if (mcd !== 1) {
            mensaje = "a debe ser coprimo de 27";
        }
    }
    input.setCustomValidity(mensaje);
}

function calculateMCD(a, b) {
    if (b === 0) {
        return a;
    } else {
        return calculateMCD(b, a % b);
    }
}