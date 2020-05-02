
/*
	Sets up the game board GUI when the DOM is ready.
*/
window.onload = function()
{
	setupCanvas();
};

var tileSize = 15;
var heightY = 390;
var widthX = 480;
var cellColor = 'rgb(210, 70, 210)';
var gameObj = new GameOfLife(tileSize, heightY, widthX);
var simulationToggled = false;
var simulationInterval;


/*
	This function draws a grid over the canvas element with id='gameCanvas'.
	It sets up an empty "game board" for the Game of Life.
	This function serves as part of the onclick event handler for the Redraw button.
*/
var setupCanvas = function()
{
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	
	var posY = 0.5;
	while (posY <= canvas.height + 0.5)
	{
		context.beginPath();
		context.moveTo(0, posY);
		context.lineTo(canvas.width, posY);
		context.stroke();
		posY += (tileSize);
	}
	
	var posX = 0.5;
	while (posX <= canvas.width + 0.5)
	{
		context.beginPath();
		context.moveTo(posX, 0);
		context.lineTo(posX, canvas.height);
		context.stroke();
		posX += tileSize;
	}
};


/*
	This function redraws the entire game board based on the values in the 
		underlying gameObj. For each tile on the GUI board, the underlying element
		of gameObj is examined to see if the cell is alive or dead. If the cell is
		alive, the GUI game board tile is filled in; if the cell is dead, the game board
		tile is left empty.
	This function is called periodically after the user starts the simulation, after 
		each time the rules of the game are applied to the gameObj (cells are updated,
		killed or made alive).
*/
var redrawBoard = function()
{
	//First clear the entire canvas...
	clearGameCanvas();
	
	//Draw the grid lines on the board.
	setupCanvas();
	
	//Get canvas and context.
	var canvas = document.getElementById('gameCanvas');
	var context = canvas.getContext('2d');
	context.fillStyle = cellColor;
	
	//Loop through the game board tiles on the canvas and fill the tile in
	//	if the underlying cell is alive.
	for (var y = 0.5; y < canvas.height - 1; y += 15)
	{
		for (var x = 0.5; x < canvas.width - 1; x += 15)
		{
			if (gameObj.getCellStatus((x-0.5)/15, (y-0.5)/15))
			{
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


/*
	Event handler for the Start/Stop button.
	
	When clicked:
		If the simulation is OFF, begins the simulation by making the game object gameObj
		update (take its "turn") every second, and then redrawing the game board after each turn.
		
		If the simulation is ON, stops the game turn + GUI update cycle.
*/
var toggleSimulation = function()
{
	if (simulationToggled == false)
	{
		simulationInterval = setInterval(function(){ gameObj.doTurn(); redrawBoard(); }, 1000);
		simulationToggled = true;
		document.getElementById('toggleSimulationButton').setAttribute('value', 'Stop');
	}
	else
	{
		clearInterval(simulationInterval);
		simulationToggled = false;
		document.getElementById('toggleSimulationButton').setAttribute('value', 'Start');
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

}

var getxy = function(eventObj)
{
	var output = document.getElementById('outputxy');
	output.innerHTML = 'Client X: ' + eventObj.clientX + "  Client Y: " + eventObj.clientY + "<br>"
		+ 'Screen X: ' + eventObj.screenX + "  Screen Y: " + eventObj.screenY;
}

