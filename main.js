const renderer = new Renderer();
const state = new Gamestate();

let testint = setInterval(() => {
    loop()}, 50);

//clearInterval(testint);


function loop() {
    state.update();
    renderer.render(state)
}
