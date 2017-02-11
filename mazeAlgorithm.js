$(function () {
	'use strict';
	console.log("loaded!");
	var mazeGenerator = function (dimensions) {

		var _maze = [];
		var _frontierCells = [];
		// var _mazeCells = {};
		for (let ii = 0; ii < dimensions; ii = ii + 1) {
			_maze.push([]);
			for (let jj = 0; jj < dimensions; jj = jj + 1) {
				_maze[ii].push({
					topW: true,
					rightW: true,
					bottomW: true,
					leftW: true,
					partOfMaze_p: false
				});
			}
		}

		var x = getRandomNumberInInterval(0, _maze.length-1);
		var y = getRandomNumberInInterval(0, _maze[0].length-1);
		_maze[x][y].partOfMaze_p = true;
		createFrontier(x, y);
		console.log('frontier: ', _frontierCells);
		console.log ('x, y: ', x, ',', y);
		while (_frontierCells.length) {
			// select a random _frontierCell
			var fCellIndex = getRandomNumberInInterval(0, _frontierCells.length-1);
			x = _frontierCells[fCellIndex].split(',')[0];
			y = _frontierCells[fCellIndex].split(',')[1];

			var neighbors = getNeighborsPartOfMaze(x, y);
			console.log("neighbors: ", neighbors, ' - x,y: ', x,y);

			var neighborIndex = getRandomNumberInInterval(0, neighbors.length-1);
			var fx = neighbors[neighborIndex].split(',')[0]
			var fy = neighbors[neighborIndex].split(',')[1]

			_maze[x][y].partOfMaze_p = true;
			_frontierCells.splice(fCellIndex, 1);

			if (x < fx) {
				_maze[x][y].bottomW = false;
				_maze[fx][fy].topW = false;
			}
			else if (x > fx) {
				_maze[x][y].topW = false;
				_maze[fx][fy].bottomW = false;
			}
			else if (y < fy) {
				_maze[x][y].rightW = false;
				_maze[fx][fy].leftW = false;
			}
			else if (y > fy) {
				_maze[x][y].leftW = false;
				_maze[fx][fy].rightW = false;
			}


			createFrontier(x, y);
		}

		function createFrontier(x, y) {
			x = parseInt(x);
			y = parseInt(y);
			if (_maze[x+1] && _maze[x+1][y] && !_maze[x+1][y].partOfMaze_p) {
				if (!valueInArray(_frontierCells, (x+1)+','+y)) {
					_frontierCells.push((x+1)+','+y);
				}
			}
			if (_maze[x-1] && _maze[x-1][y] && !_maze[x-1][y].partOfMaze_p) {
				if (!valueInArray(_frontierCells, (x-1)+','+y)) {
					_frontierCells.push((x-1)+','+y);
				}
			}
			if (_maze[x][y+1] && !_maze[x][y+1].partOfMaze_p) {
				if (!valueInArray(_frontierCells, x+','+(y+1))) {
					_frontierCells.push(x+','+(y+1));
				}
			}
			if (_maze[x][y-1] && !_maze[x][y-1].partOfMaze_p) {
				if (!valueInArray(_frontierCells, x+','+(y-1))) {
					_frontierCells.push(x+','+(y-1));
				}
			}
			return;
		}

		function valueInArray (arr, val) {
			if (arr.indexOf(val) >= 0) {
				return true;
			}
			else {
				return false;
			}
		}

		function getNeighborsPartOfMaze(x, y) {
			var neighborList = [];
			x = parseInt(x);
			y = parseInt(y);
			// console.log(_maze[x+1][y],'_maze[x+1][y]');
			// console.log(_maze[x-1][y],'_maze[x-1][y]');
			// console.log(_maze[x][y+1],'_maze[x][y+1]');
			// console.log(_maze[x][y-1],'_maze[x][y-1]');
			if (_maze[x+1] && _maze[x+1][y] && _maze[x+1][y].partOfMaze_p) {
				neighborList.push((x+1)+','+y);
			}
			if (_maze[x-1] && _maze[x-1][y] && _maze[x-1][y].partOfMaze_p) {
				neighborList.push((x-1)+','+y);
			}
			if (_maze[x][y+1] && _maze[x][y+1].partOfMaze_p) {
				neighborList.push(x+','+(y+1));
			}
			if (_maze[x][y-1] && _maze[x][y-1].partOfMaze_p) {
				neighborList.push(x+','+(y-1));
			}
			return neighborList;
		}

		function getRandomNumberInInterval (a, b) {
			return Math.floor(Math.random()*(b-a+1)+a);
		}

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

	};

	maze = new mazeGenerator(10);
	// console.log(maze.getMaze());
	maze.printMaze();
});

