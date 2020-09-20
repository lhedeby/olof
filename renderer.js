class Renderer {
    constructor() {
        const canvas = document.getElementById("frame");
        this.ctx = canvas.getContext("2d");
        this.height = canvas.getAttribute("height");
        this.width = canvas.getAttribute("width");
    }

    renderBG() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(0,0,this.width, this.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.width / 2 - 2, 0, 4, this.height);
    }

    renderState(state) {
        this.renderCircle(state.p1);
        this.renderCircle(state.p2);
        this.renderCircle(state.ball);
    }

    renderCircle(circle) {
        this.ctx.fillStyle = circle.color;
        this.ctx.beginPath();
        this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

    render(state) {
        this.renderBG();
        this.renderState(state);
    }
}