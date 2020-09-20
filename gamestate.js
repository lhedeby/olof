class Gamestate {
    constructor() {
        this.p1 = { x: 200, y: 200, radius: 10, color: "blue" };
        this.p2 = { x: 100, y: 100, radius: 10, color: "red" };
        this.players = [];
        this.players.push(this.p1, this.p2);
        this.ball = { x: 250, y: 250, radius: 10, xVel: 0, yVel: 0, angle: 0, color: "white" };
        this.kickMultiplier = 10;
        document.addEventListener('keyup', (e) => {
            if (e.code === "ArrowUp")        this.p1.y -= 5;
            else if (e.code === "ArrowDown") this.p1.y += 5;
            else if (e.code === "ArrowLeft") this.p1.x -= 5;
            else if (e.code === "ArrowRight") this.p1.x += 5;
        })
    }

    update() {
        this.players.forEach(x => this.checkBallCollision(x));
        this.moveBall();
    }

    checkBallCollision(player) {
        let diffX = this.ball.x - player.x;
        let diffY = this.ball.y - player.y;
        let distance = Math.sqrt(diffX * diffX + diffY * diffY);
        if(distance < this.ball.radius + this.p1.radius) {
            this.ball.xVel += diffX;
            this.ball.yVel += diffY;
            console.log("kick");
        }
    }

    moveBall() {
        this.ball.x += this.ball.xVel;
        this.ball.y += this.ball.yVel;
        if (this.ball.xVel > 0)
            this.ball.xVel--;
        else if(this.ball.xVel < 0)
            this.ball.xVel++;
        if (this.ball.yVel > 0)
            this.ball.yVel--;
        else if(this.ball.yVel < 0)
            this.ball.yVel++;
    }

}