$(function () {
	'use strict';
	console.log("loaded!");
	var mazeGenerator = function (dimensions) {

		var _maze = [];
		for (let ii = 0; ii < dimensions; ii = ii + 1) {
			_maze.push([]);
			for (let jj = 0; jj < dimensions; jj = jj + 1) {
				_maze[ii].push({
					topW: false,
					rightW: false,
					bottomW: false,
					leftW: false,
					color: 'teal'
				});

				// initialize borders
				if (ii == 0) {
					_maze[ii][jj].topW = true;
				}
				if (jj == 0) {
					_maze[ii][jj].leftW = true;
				}
				if (ii == dimensions-1) {
					_maze[ii][jj].bottomW = true;
				}
				if (jj == dimensions-1) {
					_maze[ii][jj].rightW = true;
				}
			}
		}
		buildMaze(0, 0, dimensions-1,dimensions-1);
		this.getMaze = function () {
			return _maze;
		}

		this.printMaze = function () {
			for (let ii = 0; ii < _maze.length; ii = ii + 1) {
				var line = '';
				for (let jj = 0; jj < _maze[ii].length; jj = jj + 1) {
					let cell = _maze[ii][jj];
					if (cell.topW && cell.leftW) {
						line += '|^~';
					}
					else if (cell.topW && cell.rightW) {
						line += '~^|';
					}
					else if (cell.bottomW && cell.leftW) {
						line += '|._';
					}
					else if (cell.bottomW && cell.rightW) {
						line += '_.|';
					}
					else if (cell.topW) {
						line += '~^~';
					}
					else if (cell.rightW) {
						line += '  |';
					}
					else if (cell.bottomW) {
						line += '_._';
					}
					else if (cell.leftW) {
						line += '|  ';
					}
					else {
						line += '   ';
					}
				}
				console.log(line);
			}
		};

		function getOrientation () {
			var randomNumber = Math.floor(Math.random()*10);
			var orientation = {};
			if (randomNumber < 5) {
				orientation.direction = 'vertical';
			}
			else {
				orientation.direction = 'horizontal';
			}

			randomNumber = Math.floor(Math.random()*10);
			if (randomNumber < 5) {
				if (orientation.direction == 'vertical') {
					orientation.wallSide = 'left';
				}
				else {
					orientation.wallSide = 'top';
				}
			}
			else {
				if (orientation.direction == 'vertical') {
					orientation.wallSide = 'right';
				}
				else {
					orientation.wallSide = 'bottom';
				}
			}
			return orientation;
		}

		function getRandomNumberInInterval (a, b) {
			return Math.floor(Math.random()*((b-1)-(a+1)+1)+(a+1));
		}

		function buildMaze (x1, y1, x2, y2) {
			if (x1 >= x2 || y1 >= y2) {
				return;
			}

			var orientation = getOrientation();
			// console.log(orientation);
			if (orientation.direction == 'vertical') {
				var divideCoord = getRandomNumberInInterval(y1, y2);
				var spaceCoord = getRandomNumberInInterval(x1, x2);

				for (let ii = x1; ii <= x2; ii = ii + 1) {
					if (ii != spaceCoord) {
						_maze[ii][divideCoord][orientation.wallSide + 'W'] = true;
						
					} else {_maze[ii][divideCoord].color = 'blue';}
				}

				if (orientation.wallSide == 'right') {
					buildMaze(x1, y1, x2, divideCoord);
					buildMaze(x1, divideCoord+1, x2, y2);
				}
				else {
					buildMaze(x1, y1, x2, divideCoord-1);
					buildMaze(x1, divideCoord, x2, y2);
				}
			}
			else if (orientation.direction == 'horizontal') {
				var divideCoord = getRandomNumberInInterval(x1, x2);
				var spaceCoord = getRandomNumberInInterval(y1, y2);

				for (let jj = y1; jj <= y2; jj = jj + 1) {
					if (jj != spaceCoord) {
						_maze[divideCoord][jj][orientation.wallSide + 'W'] = true;
						
					} else {_maze[jj][divideCoord].color = 'green';}
				}

				if (orientation.wallSide == 'bottom') {
					buildMaze(x1, y1, divideCoord, y2);
					buildMaze(divideCoord+1, y1, x2, y2);
				}
				else {
					buildMaze(x1, y1, divideCoord-1, y2);
					buildMaze(divideCoord, y1, x2, y2);
				}
			}
			// console.log(orientation, ' ', divideCoord);
		}
	};

	maze = new mazeGenerator(10);
	// console.log(maze.getMaze());
	maze.printMaze();
});

