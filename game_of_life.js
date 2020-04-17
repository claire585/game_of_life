
var tileSize = 15;

var setupCanvas = function()
{
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	context.lineWidth = 1;
	context.lineHeight = 1;
	context.strokeStyle = 'black';
	var posY = 0.5;
	while (posY < canvas.height)
	{
		context.beginPath();
		context.moveTo(.5, posY);
		context.lineTo(canvas.width, posY);
		context.stroke();
		posY += (tileSize);
	}
	
	var posX = 0.5;
	while (posX < canvas.width)
	{
		context.beginPath();
		context.moveTo(posX, 0);
		context.lineTo(posX, canvas.height);
		context.stroke();
		posX += tileSize;
	}
}


var beginSimulation = function ()
{
	
}