const yInput = document.getElementById("Y-choice");
const rInput = document.getElementById("R-choice")
const xGroup = document.querySelector('input[name="X-radio-group"]')
let canvasPrinter = new CanvasPainter();

function validateXChoice() {
    const selectedX = document.querySelector('input[name="X-radio-group"]:checked');
    if (!selectedX) {
        xGroup.setCustomValidity("выберите одно из значений X");
        xGroup.reportValidity();
        return false;
    } else {
        xGroup.setCustomValidity("");
        xGroup.reportValidity();
    }
    return true;
}
function validateYInput(y) {
    const yFloat = parseFloat(y);
    if (isNaN(yFloat)) {
        yInput.setCustomValidity("Y должен быть числом");
        yInput.reportValidity();
        return false;
    } else {
        yInput.setCustomValidity("");
        yInput.reportValidity();
    }
    if (yFloat < -3 || yFloat > 3) {
        yInput.setCustomValidity("Y должен быть числом от -3 до 3");
        yInput.reportValidity();
        return false;
    } else {
        yInput.setCustomValidity("");
        yInput.reportValidity();
    }
    return true;
}

function validateRInput(r) {
    const rFloat = parseFloat(r);
    if (isNaN(rFloat)) {
        rInput.setCustomValidity("R должен быть числом");
        rInput.reportValidity();
        return false;
    } else {
        rInput.setCustomValidity("");
        rInput.reportValidity();
    }
    if (rFloat < 2 || rFloat > 5) {
        rInput.setCustomValidity("R должен быть числом от 2 до 5");
        rInput.reportValidity();
        return false;
    } else {
        rInput.setCustomValidity("");
        rInput.reportValidity();
    }
    return true;
}