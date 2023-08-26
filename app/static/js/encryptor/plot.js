function createPlot(frequencies, displayElement) {
    let letras = frequencies.map(function (item) {
        return item[0];
    });

    let percentages = frequencies.map(function (item) {
        return item[2];
    });

    let trace = {
        x: letras,
        y: percentages,
        text: percentages.map(function (valor) {
            return valor.toFixed(2) + '%';
        }),
        type: 'bar',
        marker: {
            color: 'white' // Puedes personalizar el color de las barras aquí
        }
    };

    let layout = {
        title: 'Frecuencia de letras en porcentaje',
        xaxis: {
            title: 'Letra'
        },
        yaxis: {
            title: 'Porcentaje (%)'
        },
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        font: {
            color: 'white'
        },
        autosize: true,
    };
    var config = {
        displayModeBar: true,
        displaylogo: false,
        toImageButtonOptions: {
            format: 'png',
            filename: 'grafico',
            width: 800,
            height: 600
        },
        modeBarButtonsToRemove: ['sendDataToCloud', 'pan2d', 'pan3d', 'resetScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'],
        responsive: true
    };

    var data = [trace];

    // Crea el gráfico en el elemento con el ID 'tuDiv'
    Plotly.newPlot(displayElement, data, layout, config);
}

function createTable(data) {
    // Selecciona el elemento HTML donde deseas colocar la tabla (reemplaza 'tuDivTabla' con el ID correspondiente)
    var tablaContainer = document.getElementById('table1');
    while (tablaContainer.firstChild) {
        tablaContainer.removeChild(tablaContainer.firstChild);
    }
    // Crea una tabla y le añade una fila de encabezado
    var tabla = document.createElement('table');
    var encabezado = tabla.createTHead().insertRow(0);

    // Crea las celdas de encabezado
    var columnas = ['Letra', 'Repeticiones', 'Porcentaje'];
    for (var i = 0; i < columnas.length; i++) {
        var th = document.createElement('th');
        th.textContent = columnas[i];
        encabezado.appendChild(th);
    }

    // Llena la tabla con los datos
    for (var i = 0; i < data.length; i++) {
        var fila = tabla.insertRow(i + 1); // i + 1 para evitar la fila de encabezado

        // Agrega los datos a cada celda de la fila
        for (var j = 0; j < data[i].length; j++) {
            if (j === 2) {
                data[i][j] = data[i][j].toFixed(2);
            }
            var celda = fila.insertCell(j);
            celda.textContent = data[i][j];
        }
    }
    // Agrega la tabla al contenedor en el DOM
    tablaContainer.appendChild(tabla);
}

function displayAB(a, b) {
    document.getElementById('first__value').innerHTML = 'Valor de a: ' + a;
    document.getElementById('second__value').innerHTML = 'Valor de b: ' + b;
}