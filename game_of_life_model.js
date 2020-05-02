
//Constructor for GameOfLife class. 
function GameOfLife(tileSizePX, heightPX, widthPX)
{
	/*
		Board coordinate layout: (x, y) coordinates
		
		(0, 0)	.......................	(width, 0)
		...............................
		...............................
		...............................
		.
		.
		.
		.
		.
		(0, height)..................... (width, height)
	
	*/
	
	//Get width and height of the board in "tiles" (not pixels)
	this.width = Math.ceil(widthPX/tileSizePX);
	this.height = Math.ceil(heightPX/tileSizePX);
	this.gameBoard = new Array(this.height);
	
	/*
		Initialize each tile on the board to contain a "dead" cell.
		Each tile contains an object which specifies the status of the cell during 
			the current turn and the previous turn. True==Alive, False==dead.
	*/
	for (var i = 0; i < this.height; i++)
	{
		this.gameBoard[i] = new Array(this.width);
		for (var x = 0; x < this.gameBoard[i].length; x++)
		{
				this.gameBoard[i][x] = {currentTurn: false, nextTurn: false};
		}
	}
	
	/*
		Returns the status of the cell at row=x and col=y.
		Returns True for an alive cell; False for a dead cell.
	*/
	this.getCellStatus = function(x, y) {
		return this.gameBoard[y][x].currentTurn;
	}
	
	/*
		Make a dead cell alive and an alive cell dead.
		Invoked when the user clicks on a tile on the board.
	*/
	this.toggleCell = function(x, y)
	{
		if (this.gameBoard[y][x].currentTurn == true)
			this.gameBoard[y][x].currentTurn = false;
		else	
			this.gameBoard[y][x].currentTurn = true;
	}
	
	/*
		Play a turn of the Game of Life by updating each cell's status according to the
			Game of Life rules.
	*/
	this.doTurn = function(){
		var numAdjacentCells = 0;
		for (var y = 0; y < this.height; y++)
		{
			for (var x = 0; x < this.width; x++)
			{
				numAdjacentCells = 0;
				//Find number of neighbors of current cell.
			
				if (x != 0)
				{
					if (this.getCellStatus(x-1, y))
					{
						numAdjacentCells++;
					}
					
					if (y != 0)
					{
						if (this.getCellStatus(x-1, y-1))
						{
							numAdjacentCells++;
						}
					}
					
					if (y != this.height - 1)
					{
						if (this.getCellStatus(x-1, y+1))
						{
							numAdjacentCells++;
						}
					}
				}
				
				if (y != 0)
				{
					if (this.getCellStatus(x, y-1))
					{
						 numAdjacentCells++;
					}
				}
				
				if (y != this.height - 1)
				{
					if (this.getCellStatus(x, y+1))
					{
						numAdjacentCells++;
					}
					
					if (x != this.width - 1)
					{
						if (this.getCellStatus(x+1, y+1))
						{
							numAdjacentCells++;
						}
					}
				}
				
				if (x != this.width-1)
				{
					if (this.getCellStatus(x+1, y))
					{
						numAdjacentCells++;
					}
					
					if (y != 0)
					{
						if (this.getCellStatus(x+1, y-1))
						{
							numAdjacentCells++;
						}
					}
				}
				
				//Number of neighbors of adjacent cell is numAdjacentCells
				//Update current cell according to rules of the game.
				/**
					Any live cell with fewer than two live neighbours dies, as if by underpopulation.
					Any live cell with two or three live neighbours lives on to the next generation.
					Any live cell with more than three live neighbours dies, as if by overpopulation.
					Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
					(Source: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
				**/
				
				if (this.getCellStatus(x, y))
				{
					//alert("For cell (" + x + ", " + y + "): AdjCells=" + numAdjacentCells);
					//A live cell with fewer than 2 neighbors dies.
					if (numAdjacentCells < 2)
					{
						//console.log("(" + x + ", " + y + ") == false");
						this.gameBoard[y][x].nextTurn = false;
					}
					//A live cell with greater than three neighbors dies.
					else if (numAdjacentCells > 3)
					{
						//console.log("(" + x + ", " + y + ") == false");
						this.gameBoard[y][x].nextTurn = false;
					}
					//A live cell with 2 or 3 neightbors lives.
					else
					{
						//console.log("(" + x + ", " + y + ") == true");
						this.gameBoard[y][x].nextTurn = true;
					}
				}
				else
				{
					//A dead cell with 3 neighbors lives.
					if (numAdjacentCells == 3)
					{
						//console.log("(" + x + ", " + y + ") == true");
						this.gameBoard[y][x].nextTurn = true;
					}
					//Dead cells that do not have three neighbors stay dead.
					else
					{
						//console.log("(" + x + ", " + y + ") == false");
						this.gameBoard[y][x].nextTurn = false;
					}
				}
				
			}
		}//End first set of nested loops: calculates nextTurn element of each cell/tile on the board.
		
		
		
		//This set of loops updates the currentTurn field of each game board tile.
		//The currentTurn field takes the value of the nextTurn field, which was calculated in the previous set of nested loops.
		for (var y = 0; y < this.height; y++)
		{
			for (var x = 0; x < this.width; x++)
			{
				//alert("" + x + " " + y);
				this.gameBoard[y][x].currentTurn = this.gameBoard[y][x].nextTurn;
				this.gameBoard[y][x].nextTurn = false;
			}
		}
	}//End doTurn() method
	
}//End GameOfLife constructor function.