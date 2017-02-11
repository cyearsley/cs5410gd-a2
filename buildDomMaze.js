$(function () {
	console.log("maze: ", maze.getMaze());
	var localMaze = maze.getMaze();
	var mazeHTML = '';
	for (let ii = 0; ii < localMaze.length; ii++) {
		mazeHTML += '<tr>';
		for (let jj = 0; jj < localMaze[ii].length; jj++) {
			var cellStyle = '';
			if (localMaze[ii][jj].topW) {
				cellStyle += 'border-top: solid black 3px;';
			}
			if (localMaze[ii][jj].rightW) {
				cellStyle += 'border-right: solid black 3px;';
			}
			if (localMaze[ii][jj].bottomW) {
				cellStyle += 'border-bottom: solid black 3px;';
			}
			if (localMaze[ii][jj].leftW) {
				cellStyle += 'border-left: solid black 3px;';
			}
			var randomColor = Math.floor(Math.random()*16777215).toString(16);
			mazeHTML += '<td style="' + cellStyle +'; background-color: ' + 1 + '; width: 100px; height: 50px"></td>';
		}
		mazeHTML += '</tr>';
	}
	console.log('HTML: ', mazeHTML);
	$('.testing-table').html(mazeHTML);
});