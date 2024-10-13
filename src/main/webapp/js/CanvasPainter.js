    class CanvasPainter{
        SIZE = 400;
        LINE_WIDTH = 2;
        TEXT_SIZE = 20;
        TEXT_MARGIN = 15;
        TEXT_LINE_HEIGHT = 3;
        COLOR_RED = "#e04d5a"
        COLOR_GREEN = "#64c44d"
        constructor(sendRequest) {
            this.canvas = document.getElementById("graph");
            this.ctx = this.canvas.getContext("2d");
            this.ctx.font = `${this.TEXT_SIZE}px`;

            // Store the sendRequest function
            this.sendRequest = sendRequest;

            // Add event listener for clicks
            this.canvas.addEventListener('click', (event) => this.parseClick(event));
        }

        redrawAll(r){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawGraph(r);
            this.drawAxes();
            this.setPointerAtDot(1);
            this.setPointerAtDot(2);
            this.setPointerAtDot(3);
            this.setPointerAtDot(4);
            this.setPointerAtDot(5);
            this.setPointerAtDot(-1);
        }

        drawAxes() {
            this.ctx.fillStyle = "black";
            this.drawArrow(-this.SIZE, this.SIZE / 2, this.SIZE, this.SIZE / 2);
            this.drawArrow( this.SIZE / 2, this.SIZE, this.SIZE / 2, 0);
        }

        drawGraph(r){
            const totalPoints = 12;
            const pointInPixels = this.SIZE / totalPoints;
            const zero = this.SIZE / 2;

            // квадрат
            this.ctx.fillStyle = "rgba(79,124,59,0.7)";
            this.ctx.fillRect(zero, zero, r * pointInPixels, r * pointInPixels)

            // треугольник
            this.ctx.beginPath();
            this.ctx.moveTo(zero, zero);
            this.ctx.lineTo(zero - (r / 2) * pointInPixels, zero);
            this.ctx.lineTo(zero, zero + (r / 2) * pointInPixels);
            this.ctx.lineTo(zero, zero);
            this.ctx.fill();

            // сектор
            this.ctx.beginPath();
            this.ctx.arc(
                zero,
                zero,
                (r / 2) * pointInPixels,
                3 * Math.PI / 2,
                2 * Math.PI,
            );
            this.ctx.moveTo(zero, zero);
            this.ctx.lineTo(zero + (r / 2) * pointInPixels, zero);
            this.ctx.lineTo(zero, zero - (r / 2) * pointInPixels);
            this.ctx.lineTo(zero, zero);
            this.ctx.fill();
        }

        setPointerAtDot(max_r = 5) {
            const totalPoints = 12;
            const pointInPixels = this.SIZE / totalPoints;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(`${max_r}`, this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_MARGIN);
            this.ctx.fillText(`${max_r}`, this.SIZE / 2 + this.TEXT_MARGIN, this.SIZE / 2 - pointInPixels * max_r);

            this.ctx.beginPath()
            this.ctx.lineWidth = this.LINE_WIDTH;
            this.ctx.moveTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT);
            this.ctx.lineTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT);
            this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
            this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
            this.ctx.stroke();
        }

        drawArrow(fromx, fromy, tox, toy) {
            var headlen = 10; // length of head in pixels
            var dx = tox - fromx;
            var dy = toy - fromy;
            var angle = Math.atan2(dy, dx);
            this.ctx.beginPath();
            this.ctx.lineWidth = this.LINE_WIDTH;
            this.ctx.moveTo(fromx, fromy);
            this.ctx.lineTo(tox, toy);
            this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
            this.ctx.moveTo(tox, toy);
            this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
            this.ctx.stroke();
        }

        drawPoint(x, y, success = true) {
            const image = new Image();
            image.src = success
                ? "images/coin.png"
                : "images/fail.png"
            const totalPoints = 12;
            const pointInPixels = this.SIZE / totalPoints;

            image.onload = () => {
                const imageX = this.SIZE / 2 + pointInPixels * x - 18 / 2;
                const imageY = this.SIZE / 2 - y * pointInPixels - 15 / 2;

                this.ctx.drawImage(image, imageX, imageY, 18, 15);
            };
        }

        parseClick(event) {
            const rValue = parseFloat(document.getElementById("R-choice").value);

            if (isNaN(rValue)) {
                alert("Сначала выберите R");
                return;
            }

            const rect = this.canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left; // x position in canvas
            const clickY = event.clientY - rect.top;  // y position in canvas

            let graphX = (clickX - this.SIZE / 2) / (this.SIZE / 12); // scale to graph unit
            let graphY = -(clickY - this.SIZE / 2) / (this.SIZE / 12); // invert y-axis

            graphX = parseFloat(graphX.toFixed(3))
            graphY = parseFloat(graphY.toFixed(3))

            this.sendRequest(graphX, graphY, rValue);
        }

    }