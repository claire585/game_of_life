
window.onload = function()
{
	setupCanvas();
};

var tileSize = 15;
var heightY = 360;
var widthX = 450;
var cellColor = 'rgb(210, 70, 210)';
var gameObj = new GameOfLife(tileSize, heightY, widthX);
var simulationToggled = false;
var simulationInterval;

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

var redrawBoard = function()
{
	clearGameCanvas();
	setupCanvas();
	
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	for (var y = 0; y < canvas.height/15; y++)
	{
		for (var x = 0; x < canvas.width/15; x++)	
		{
			console.log(gameObj.getCellStatus(x, y));
		}
		console.log("<br>");
	}
	var output = document.getElementById('outputxy');
				output.innerHTML = "YOLO";
	//alert("redrawing");
	
	context.fillStyle = cellColor;
	for (var y = 0.5; y < canvas.height; y += 15)
	{
		for (var x = 0.5; x < canvas.width; x += 15)
		{
			if (gameObj.getCellStatus((x-0.5)/15, (y-0.5)/15))
			{
				//alert();
				var output = document.getElementById('outputxy');
				output.innerHTML = ""+x+", "+y;
				context.fillRect(x+.5, y+.5, 14, 14);
			}
		}
	}
}

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

var toggleSimulation = function()
{
	if (simulationToggled == false)
	{
		simulationInterval = setInterval(function(){ gameObj.doTurn(); redrawBoard(); }, 1000);
		simulationToggled = true;
	}
	else
	{
		clearInterval(simulationInterval);
		simulationToggled = false;
	}
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
	
	//xPos and yPos are in pixels
	//The position of the mouse, in pixels, within the canvas
	var xPos = eventObject.clientX - canvas.getBoundingClientRect().left;
	var yPos = eventObject.clientY - canvas.getBoundingClientRect().top ;
	
	//Toggle the current tile on the game board.
	gameObj.toggleCell(Math.floor(xPos/15), Math.floor(yPos/15));
	
	//Fill in the tile.
	if (gameObj.getCellStatus(Math.floor(xPos/15), Math.floor(yPos/15)) == true)
	{
		context.fillStyle = cellColor;
		context.fillRect(Math.floor(xPos/15)*15 + 1, Math.floor(yPos/15)*15 + 1, 14, 14);
	}
	else
	{
		context.clearRect( Math.floor(xPos/15)*15 + 1, Math.floor(yPos/15)*15 + 1, 14, 14 )
	}
	
	//Debug output
	//alert(Math.floor(xPos/15) + ", " + Math.floor(yPos/15));
	var output = document.getElementById('outputxy');
	output.innerHTML = "(" + Math.floor(xPos/15)+ ", "+ Math.floor(yPos/15) +")";

}

var getxy = function(eventObj)
{
	var output = document.getElementById('outputxy');
	output.innerHTML = 'Client X: ' + eventObj.clientX + "  Client Y: " + eventObj.clientY + "<br>"
		+ 'Screen X: ' + eventObj.screenX + "  Screen Y: " + eventObj.screenY;
}

