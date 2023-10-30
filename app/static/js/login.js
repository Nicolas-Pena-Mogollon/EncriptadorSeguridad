document.addEventListener("DOMContentLoaded", function () {
    console.log(document.cookie)
    if (cookieExists("blocked") && new Date(getCookie("blocked")) < new Date()) {
        document.cookie = "blocked=" + new Date();
    }
    const submitButton = document.getElementById("submit__buton");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const infoText = document.getElementById("error-message");
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (!username.validity.valid || !password.validity.valid) {
            infoText.innerHTML = "Entrada inválida";
            return;
        }
        if (cookieExists("blocked") && new Date(getCookie("blocked")) > new Date()) {
            var timeRemaining = new Date(getCookie("blocked")) - new Date();
            var minutes = Math.floor(timeRemaining / (1000 * 60));
            var seconds = Math.floor((timeRemaining / 1000) % 60);
            infoText.innerHTML = "Tiempo de espera: " + minutes + ":" + seconds;
            cleanFields();
            return;
        }
        const jsonValues = {
            jsonValues: {username: username.value, password: password.value}
        };

        $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonValues),
            success: function (response) {
                if (response.blocked) {
                    var timeRemaining = new Date();
                    timeRemaining.setMinutes(timeRemaining.getMinutes() + response.blocked[0])
                    timeRemaining.setSeconds(timeRemaining.getSeconds() + response.blocked[1])
                    document.cookie = "blocked=" + timeRemaining;
                    infoText.innerHTML = "Tiempo de espera: " + response.blocked[0] + ":" + response.blocked[1];
                } else if (response.access_token) {
                    document.cookie = "access_token=" + response.access_token;
                    window.location.href = "/";
                } else if (response.error) {
                    infoText.innerHTML = response.error;
                }
            },
            error: function (error) {
                // Maneja los errores de la solicitud
                window.alert(error);
            }
        });
        cleanFields();
    });

    function cleanFields() {
        username.value = "";
        password.value = "";
    }

    function getCookie(cookieName) {
        const cookies = document.cookie.split('; ')
        const cookie = cookies.find(cookie => cookie.startsWith(cookieName + '='));
        return cookie.split('=')[1];
    }

    function cookieExists(cookieName) {
        var cookies = document.cookie;

        var cookieArray = cookies.split(';');

        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookieName + '=') === 0) {
                return true;
            }
        }

        // La cookie no se encontró
        return false;
    }

    document.cookie = "access_token=";

});
