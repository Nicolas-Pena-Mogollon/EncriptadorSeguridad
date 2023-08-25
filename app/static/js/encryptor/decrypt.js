function decrypt(e) {
    e.preventDefault();
    const textArea = document.querySelector("#input__txtArea");
    if (validateTextArea(textArea)) {
        const jsonValues = {
            jsonValues: {text: textArea.value}
        };
        $.ajax({
            url: '/decrypt',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonValues),
            success: function (response) {
                document.querySelector("#display__txtArea").value = response.text;
                // Maneja la respuesta JSON del servidor
                // Puedes acceder a response.encrypted_data para obtener los datos cifrados
            },
            error: function (error) {
                // Maneja los errores de la solicitud
                window.alert("Ha ocurrido un error en el servidor");
            }
        });
        cleanFields();
    }
}

function validateTextArea(textArea) {
    //var valid = true;
    if (textArea.validity.valid) {
        textArea.parentElement.classList.remove("input__container__invalid");
        textArea.parentElement.querySelector(".input__message__error").innerHTML = "";
        return true;
    } else {
        textArea.parentElement.classList.add("input__container__invalid");
        textArea.parentElement.querySelector(".input__message__error").innerHTML = "Complete todos los campos";
        return false;
    }
}