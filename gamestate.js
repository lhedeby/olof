class Gamestate {
    constructor() {
        this.height = document.getElementById("frame").getAttribute("height");
        this.width = document.getElementById("frame").getAttribute("width");

        this.p1 = { x: this.width / 2 - 50, y: this.height / 2, radius: 10, color: "blue" };
        this.p2 = { x: this.width / 2 + 50, y: this.height / 2, radius: 10, color: "red" };
        this.players = [];
        this.players.push(this.p1, this.p2);
        this.ball = { x: this.width / 2, y: this.height / 2, radius: 10, xVel: 0, yVel: 0, angle: 0, color: "black" };
        this.kickMultiplier = 1;
        this.friction = 0.9;
        this.playerKnockback = 1;
        this.addControls();

    }

    addControls() {
        document.addEventListener('keydown', (e) => {
            if (e.code === "ArrowUp")        this.p1.y -= 5;
            else if (e.code === "ArrowDown") this.p1.y += 5;
            else if (e.code === "ArrowLeft") this.p1.x -= 5;
            else if (e.code === "ArrowRight") this.p1.x += 5;
        })
    }

    update() {
        this.players.forEach(x => this.checkBallCollision(x));
        this.checkPlayerCollision();
        this.chaseBall(this.p1);
        this.chaseBall(this.p2);
        this.moveBall();

    }

    chaseBall(player) {
        let diffX = this.ball.x - player.x; 
        let diffY = this.ball.y - player.y;
        let total = Math.abs(diffX) + Math.abs(diffY);
        player.x += diffX / total;
        player.y += diffY / total;

    }

    checkPlayerCollision() {
        for(let i = 0; i < this.players.length - 1; i++) {
            for(let j = i + 1; j < this.players.length; j++) {
                let diffX = this.players[i].x - this.players[j].x;
                let diffY = this.players[i].y - this.players[j].y;
                let distance = Math.sqrt(diffX * diffX + diffY * diffY);
                console.log(distance);
                if(distance < this.players[i].radius + this.players[j].radius) {
                    this.players[i].x += diffX * this.playerKnockback;
                    this.players[i].y += diffY * this.playerKnockback;
                    this.players[j].x -= diffX * this.playerKnockback;
                    this.players[j].y -= diffY * this.playerKnockback;
 
                    console.log("player col");
                }
            } 
        }
    }

    checkBallCollision(player) {
        let diffX = this.ball.x - player.x;
        let diffY = this.ball.y - player.y;
        let distance = Math.sqrt(diffX * diffX + diffY * diffY);
        if(distance < this.ball.radius + this.p1.radius) {
            this.ball.xVel += diffX * this.kickMultiplier;
            this.ball.yVel += diffY * this.kickMultiplier;
            console.log("kick");
        }
    }

    moveBall() {
        this.ball.x += this.ball.xVel;
        this.ball.y += this.ball.yVel;
        this.ball.xVel *= this.friction;
        this.ball.yVel *= this.friction;
        if(this.ball.x + this.ball.radius >= this.width) this.ball.xVel = -Math.abs(this.ball.xVel);
        if(this.ball.y + this.ball.radius >= this.height) this.ball.yVel = -Math.abs(this.ball.yVel);
        if(this.ball.x - this.ball.radius <= 0) this.ball.xVel = Math.abs(this.ball.xVel);
        if(this.ball.y - this.ball.radius <= 0) this.ball.yVel = Math.abs(this.ball.yVel);
    }

}