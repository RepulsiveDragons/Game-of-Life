let canvas, ctx;
const canvasWidth = 1500, canvasHeight = 600;
const cellWidth = 10;
const fps = 12;
let lifeworld;
let reset;
let checkbox;
let stepBtn;
let automatic = true;

window.onload = init;

function init(){
	canvas = document.querySelector("canvas");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");
    lifeworld = new LifeWorld(150,60,0.3);
	reset = document.querySelector("#reset");
	reset.onclick = resetWorld;
	checkbox = document.querySelector("#autoCheckbox");
	checkbox.onchange = switchAuto;
	stepBtn = document.querySelector("#step");
	stepBtn.onclick = step;

	loop();
}

function loop(){
	if(automatic == false)
	{
		ctx.save();
		ctx.restore();
		return;
	}
	setTimeout(loop,1000/fps);
	lifeworld.step();
	drawBackground();
	drawWorld();
}

function drawBackground(){
	ctx.save();
	ctx.fillStyle = "black";
	//ctx.globalAlpha = 4/fps;
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	ctx.restore();
}

function drawWorld(){
	ctx.save();
    for(let col = 0; col < lifeworld.numCols; col++){
        for(let row = 0; row < lifeworld.numRows; row++)
        {
            drawCell(col,row,cellWidth,lifeworld.world[col][row]);
        }
    }
    ctx.restore();
}

function drawCell(col,row,dimensions,alive) {
	ctx.beginPath();
    ctx.rect(col*dimensions, row*dimensions, dimensions, dimensions);
    ctx.fillStyle = alive ? 'red' : 'rgba(0,0,0,0)';
    ctx.fill();
}

function resetWorld(){
	lifeworld = new LifeWorld(150,60,0.3);
	drawBackground();
	drawWorld();
}

function switchAuto(e){
	automatic = e.target.checked;
	if(automatic == true)
	{
		loop();
	}
	console.log(automatic);
}

function step(){
	if(automatic == false)
	{
		lifeworld.step();
		drawBackground();
		drawWorld();
	}
}
