
window.onload = function()
{
	setupCanvas();
};

var tileSize = 15;
var cellColor = 'rgb(210, 70, 210)';


/*
	This function draws a grid over the canvas element with id='gameCanvas'.
	It sets up an empty "game board" for the Game of Life.
	This function serves as the onclick event handler for the Redraw button.
*/
var setupCanvas = function()
{
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	
	context.lineWidth = 1;
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
};

/*
	This function clears the canvas with css selector = "canvas#gameCanvas".
	It is used as part of the event handler for the Redraw button.
*/
var clearGameCanvas = function()
{
	var canvas = document.querySelector('canvas#gameCanvas');
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
}

var beginSimulation = function ()
{
	
}

/*
	This function draws a 14px by 14px square in the "game tile" at the position represented
	by the onclick event object passed as an argument. 
	This function is used as part of the onclick event handler for the game board canvas.
*/
var modifyCanvasOnClick = function(eventObject)
{
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	
	var xPos = eventObject.clientX - canvas.getBoundingClientRect().left;
	var yPos = eventObject.clientY - canvas.getBoundingClientRect().top ;
	
	context.fillStyle = cellColor;
	context.fillRect(Math.floor(xPos/15)*15 + 1, Math.floor(yPos/15)*15 + 1, 14, 14);
}

var getxy = function(eventObj)
{
	var output = document.getElementById('outputxy');
	output.innerHTML = 'Client X: ' + eventObj.clientX + "  Client Y: " + eventObj.clientY + "<br>"
		+ 'Screen X: ' + eventObj.screenX + "  Screen Y: " + eventObj.screenY;
}