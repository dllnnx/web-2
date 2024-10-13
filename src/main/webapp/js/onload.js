document.addEventListener('DOMContentLoaded', function () {
    // изначальная отрисовка канвы
    let canvasPrinter = new CanvasPainter();
    canvasPrinter.redrawAll(0);


    const submitButton = document.getElementById("submit-button");
    const clearButton = document.getElementById("clear-button");
    const yInput = document.getElementById("Y-choice");
    const xRadios = document.querySelectorAll('#X-choice input[type="radio"]');
    const rCheckboxes = document.querySelectorAll('#R-choice input[type="checkbox"]');
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
                canvasPrinter.drawPoint(x, y, data.isHit);
                fillTable(data, startTime, period);
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function handleSubmit() {
        const y = yInput.value;
        if (!validateXChoice() || !validateYInput(y) || !validateRChoice()) {
            return;
        }
        const x = document.querySelector('input[name="X-radio-group"]:checked').value;
        const selectedRs = document.querySelectorAll('input[name="R-checkbox-group"]:checked');
        const r = selectedRs[selectedRs.length - 1].value;
        sendRequest(x, y, r);
    }
    submitButton.addEventListener("click", handleSubmit);


    // очистка полей по нажатию "очистить"
    function clearSelection() {
        xRadios.forEach(radio => radio.checked = false);
        yInput.value = '';
        rCheckboxes.forEach(checkbox => checkbox.checked = false);
        canvasPrinter.redrawAll(0);
    }
    clearButton.addEventListener("click", clearSelection);


    // отрисовка канвы при изменении R
    let lastChecked = null;
    function handleCheckboxChange(event) {
        const currentCheckbox = event.target;
        if (lastChecked && lastChecked !== currentCheckbox) {
            lastChecked.checked = false;
        }
        lastChecked = currentCheckbox.checked ? currentCheckbox : null;
        canvasPrinter.redrawAll(currentCheckbox.value);
    }
    rCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
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