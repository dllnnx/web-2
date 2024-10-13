document.addEventListener('DOMContentLoaded', function () {
    // изначальная отрисовка канвы
    let canvasPainter = new CanvasPainter(sendRequest);
    canvasPainter.redrawAll(0);


    const submitButton = document.getElementById("submit-button");
    const clearButton = document.getElementById("clear-button");
    const yInput = document.getElementById("Y-choice");
    const rInput = document.getElementById("R-choice")
    const xRadios = document.querySelectorAll('#X-choice input[type="radio"]');
    const resultTable = document.getElementById("result-table");


    // отправка запроса по нажатию "проверить"
    function sendRequest(x, y, r) {
        const start = new Date().getTime();
        const startTime = new Date().toLocaleString();
        $.ajax({
            url: `controller-servlet`,
            type: 'POST',
            dataType: 'json',
            data:{
                "x": x,
                "y": y,
                "r": r,
                "start": start,
                "startTime": startTime
            },
            success: function (data) {
                console.log(data)
                const period = data.scriptTime
                canvasPainter.drawPoint(x, y, data.isHit);
                fillTable(data, startTime, period);
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                if (xhr.status === 400) {
                    alert("Невалидные данные: проверьте, что координаты находятся в разрешенных диапазонах: \n" +
                        "-5 <= x <= 3, \n" +
                        "-3 <= y <= 3, \n" +
                        "2 <= r <= 5")
                }
            }
        });
    }

    function handleSubmit() {
        const y = yInput.value;
        const r = rInput.value;
        if (!validateXChoice() || !validateYInput(y) || !validateRInput(r)) {
            return;
        }
        const x = document.querySelector('input[name="X-radio-group"]:checked').value;
        sendRequest(x, y, r);
    }
    submitButton.addEventListener("click", handleSubmit);


    // отслеживание кликов по канве
    // canvasPainter.canvas.addEventListener('click', function(event) {
    //     canvasPainter.parseClick(event)
    // });


    // очистка полей по нажатию "очистить"
    function clearSelection() {
        xRadios.forEach(radio => radio.checked = false);
        yInput.value = '';
        rInput.value = '';
        canvasPainter.redrawAll(0);
    }
    clearButton.addEventListener("click", clearSelection);


    // отрисовка канвы при изменении R
    rInput.addEventListener('input', function () {
        if (validateRInput(this.value)) canvasPainter.redrawAll(this.value);
        const parts = this.value.split('.');
        if (parts[1] && parts[1].length > 3) {
            parts[1] = parts[1].slice(0, 3); // обрезаем до 3 знаков после запятой
            this.value = parts.join('.');
        }
        if (this.value === '') canvasPainter.redrawAll(0);
    });

    yInput.addEventListener('input', function () {
        validateYInput(this.value);
        const parts = this.value.split('.');
        if (parts[1] && parts[1].length > 3) {
            parts[1] = parts[1].slice(0, 3); // обрезаем до 3 знаков после запятой
            this.value = parts.join('.');
        }
    });


    function fillTable(data, startTime, period) {
        const newRow = resultTable.insertRow()
        newRow.insertCell(0).textContent = data.x;
        newRow.insertCell(1).textContent = data.y;
        newRow.insertCell(2).textContent = data.r;

        const resultCell = newRow.insertCell(3);
        resultCell.textContent = data.isHit ? 'got it!' : 'fail(';
        if (data.isHit) {
            resultCell.classList.add('success');
        } else {
            resultCell.classList.add('fail');
        }

        newRow.insertCell(4).textContent = startTime.toLocaleString();
        newRow.insertCell(5).textContent = period + 'ms';
    }
});