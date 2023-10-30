const inputs = document.querySelectorAll("input");
const textArea = document.querySelector("#input__txtArea");

function encrypt(e) {
    e.preventDefault();
    if (validateFields(inputs, textArea)) {
        const jsonValues = {
            jsonValues: {
                text: textArea.value,
                a: inputs[0].value,
                b: inputs[1].value
            }
        };
        $.ajax({
            url: '/encrypt',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonValues),
            success: function (response) {
                console.log(response)
                document.querySelector("#display__txtArea").value = response
                // Maneja la respuesta JSON del servidor
                // Puedes acceder a response.encrypted_data para obtener los datos cifrados
            },
            error: function (error) {
                // Maneja los errores de la solicitud
                window.alert("Ha ocurrido un error en el servidor");
            }
        });

        cleanFields(inputs, textArea);
    }
}

function validateFields(inputs, textArea) {
    //var valid = true;
    if (inputs[0].validity.valid && inputs[1].validity.valid && textArea.validity.valid) {
        textArea.parentElement.classList.remove("input__container__invalid");
        textArea.parentElement.querySelector(".input__message__error").innerHTML = "";
        return true;
    } else {
        textArea.parentElement.classList.add("input__container__invalid");
        textArea.parentElement.querySelector(".input__message__error").innerHTML = "Complete todos los campos";
        return false;
    }
}

function cleanFields() {
    inputs.forEach((input) => {
        input.value = "";
    });
    textArea.value = "";
}