function encrypt(e) {
    e.preventDefault();
    const inputs = document.querySelectorAll("input");
    const textAreas = document.querySelectorAll("textarea");
    if (validateFields(inputs, textAreas)) {
        const inputText = textAreas[0].value;
        var jsonValues = {
            jsonValues: {
                text: inputText,
                a: inputs[0].value,
                b: inputs[1].value
            }
        }
        $.ajax({
            url: '/encrypt',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonValues),
            success: function (response) {
                // Maneja la respuesta JSON del servidor
                console.log(response);
                // Puedes acceder a response.encrypted_data para obtener los datos cifrados
            },
            error: function (error) {
                // Maneja los errores de la solicitud
                console.error(error);
            }
        });
    }
}

function validateFields(inputs, textAreas) {
    var valid = true;
    if (inputs[0].validity.valid && inputs[1].validity.valid && textAreas[0].validity.valid) {
        textAreas[0].parentElement.classList.remove("input__container__invalid");
        textAreas[0].parentElement.querySelector(".input__message__error").innerHTML = "";
        return true;
    } else {
        textAreas[0].parentElement.classList.add("input__container__invalid");
        textAreas[0].parentElement.querySelector(".input__message__error").innerHTML = "Complete todos los campos";
        return false;
    }

    /*
    var a = parseInt(inputs[0].value);
    var b = parseInt(inputs[1].value);

    return validateComprimes(inputs, a, b);*/
}
/*
function validateComprimes(inputs, a, b) {
    const mcd = calculateMCD(a, b);
    if (mcd === 1) {
        inputs.forEach((input) => {
            input.parentElement.classList.remove("input__container__invalid");
            input.parentElement.querySelector(".input__message__error").innerHTML = "";
        });
        return true;
    } else {
        inputs.forEach((input) => {
            input.parentElement.classList.add("input__container__invalid");
            input.parentElement.querySelector(".input__message__error").innerHTML = "Los números no son coprimos";
        });
        return false;
    }
}

function calculateMCD(a, b) {
    if (b === 0) {
        return a;
    } else {
        return calculateMCD(b, a % b);
    }
}*/