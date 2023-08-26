function decrypt(e) {
    e.preventDefault();
    const textArea = document.querySelector("#input__txtArea");
    if (validateTextArea(textArea)) {
        const text = textArea.value;
        document.cookie = "text=" + text;
        document.cookie = "option=0"
        const jsonValues = {
            jsonValues: { text: text, option: 0 }
        };

        $.ajax({
            url: '/decrypt',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonValues),
            success: function (response) {

                document.querySelector("#display__txtArea").value = response.text;
                const frequenciesValue = response.frequencies; // Esto obtiene el valor de "frequencies"
                if (frequenciesValue === undefined) {
                    document.querySelector("#display__txtArea").value = "No se ha logrado desencriptar";
                } else {
                    const a = response.a;
                    const b = response.b;
                    loadResults(frequenciesValue, a, b);
                    displayAB(a, b);
                    createTable(frequenciesValue);
                }
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

function reDecrypt(e) {
    e.preventDefault();

    var text = getCookie("text");
    var option = parseInt(getCookie("option")) + 1;
    if (option > 2) {
        alert("No se ha logrado desencriptar el texto")
        return;
    }
    document.cookie = "option=" + option;

    const jsonValues = {
        jsonValues: { text: text, option: option }
    };

    $.ajax({
        url: '/decrypt',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(jsonValues),
        success: function (response) {
            document.querySelector("#display__txtArea").value = response.text;
            const frequenciesValue = response.frequencies; // Esto obtiene el valor de "frequencies"
            if (frequenciesValue === undefined) {
                document.querySelector("#display__txtArea").value = "No se ha logrado desencriptar";
            } else {
                const a = response.a;
                const b = response.b;
                loadResults(frequenciesValue, a, b);
                displayAB(a, b);
                createTable(frequenciesValue);
            }
        },
        error: function (error) {
            // Maneja los errores de la solicitud
            window.alert("Ha ocurrido un error en el servidor");
        }
    });
}


function getCookie(cookieName) {
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find(cookie => cookie.startsWith(cookieName + '='));
    return cookie.split('=')[1];
}

function loadResults(frequencies, a, b) {
    createPlot(frequencies, "plot__div");

}
