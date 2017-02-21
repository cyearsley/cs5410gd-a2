console.log("gameLoop.js loaded!");

// Test to see if a string is an integer
function isInteger(string) {
	return /^\+?(0|[1-9]\d*)$/.test(string);
}

var Scene = function () {
	var canvas = $('#canvas-main')[0];
	var context = canvas.getContext('2d');
	context.strokeStyle = "white";
	CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, canvas.width, canvas.height);
        this.restore();
    };
	this.init = function () {
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	this.beginRender = function () {
		context.clear();
	};

	this.Player = function (pdata) {
		var ready = false;
		var playerImage = new Image();
		var _data = $.extend({
			// some custom properties
		}, pdata);

		playerImage.onload = function () {
			ready = true;
		};
		playerImage.src = _data.imageSource;

		this.update = function () {

		};

		this.draw = function () {

		};
	}

	//NOTE: the drawMaze assumes the canvas is a perfect square
	this.drawMaze = function (maze) {
		var mazeDimensions = maze.length;
		var printDimensions = Math.floor(canvas.width/mazeDimensions);
		console.log("drawing maze! -", maze, "with dimensions: ", mazeDimensions);

		// paint start and ending points
		//========================================/
		var prevfillStyle = context.fillStyle;
		context.fillStyle = "green";
		context.fillRect(0, 0, printDimensions, printDimensions);
		context.fillStyle = "red";
		context.fillRect(canvas.width-printDimensions, canvas.width-printDimensions, canvas.width, canvas.width);
		context.fillStyle = prevfillStyle;
		//========================================/

		for (let ii = 0; ii < mazeDimensions; ii = ii + 1) {
			for (let jj = 0; jj < mazeDimensions; jj = jj + 1) {
				if (maze[ii][jj].topW) {
					context.beginPath();
					context.moveTo(jj*(printDimensions), ii*printDimensions);
					context.lineTo((jj+1)*printDimensions, ii*printDimensions);
					context.stroke();
				}
				if (maze[ii][jj].rightW) {
					context.beginPath();
					context.moveTo((jj+1)*(printDimensions), ii*printDimensions);
					context.lineTo((jj+1)*printDimensions, (ii+1)*printDimensions);
					context.stroke();
				}
				if (maze[ii][jj].bottomW) {
					context.beginPath();
					context.moveTo((jj)*(printDimensions), (ii+1)*printDimensions);
					context.lineTo((jj+1)*printDimensions, (ii+1)*printDimensions);
					context.stroke();
				}
				if (maze[ii][jj].leftW) {
					context.beginPath();
					context.moveTo((jj)*(printDimensions), (ii)*printDimensions);
					context.lineTo((jj)*printDimensions, (ii+1)*printDimensions);
					context.stroke();
				}
			}
		}
	};
};

// Game Loop OBJECT
//	This object is not the official game loop.
var gameLoop = function (initData) {
	'use strict';
	var _gameData = $.extend({
		scene: null,
		maze: null,
		mazeStatus: {
			status: 'pending',
			dimensions: 0
		}
	}, initData);
	var me = this;

	$('.new-maze-link').on('click', function () {
		_gameData.mazeStatus.status = 'create';
		_gameData.mazeStatus.dimensions = parseInt($(this).attr('mazesize'));
	});

	// Initialze the gameloop
	//	This init function begins the gameLoop
	this.init = function (initialTimestamp) {
		_gameData.previousTimestamp = initialTimestamp;
		window.requestAnimationFrame(_gameLoop);
	};
	// ========================================================= //
	//
	// G A M E   L O O P
	//
	// ========================================================= //
	var _gameLoop = function (currentTimestamp) {

		_gameData.previousTimestamp = currentTimestamp;

		// Call UPDATE
		_update();

		// Call RENDER
		_render();

		// REQUEST ANIMATION FRAME
		window.requestAnimationFrame(_gameLoop);
	};

	// ========================================================= //
	//
	// U P D A T E
	//
	// ========================================================= //
	var _update = function () {
		if (_gameData.mazeStatus.status == 'render') {
			_gameData.mazeStatus.status = 'pending';
		}
		if (_gameData.mazeStatus.status == 'create') {
			_gameData.mazeStatus.status = 'render';
			_gameData.maze = new mazeGenerator(_gameData.mazeStatus.dimensions);
			_gameData.scene = new Scene();
			_gameData.scene.init();
		}
	};

	// ========================================================= //
	//
	// R E N D E R
	//
	// ========================================================= //
	var _render = function () {
		if (_gameData.mazeStatus.status == 'render') {
			_gameData.scene.drawMaze(_gameData.maze.getMaze());
		}
	};
};
