var gameCharacters = function () {
	var ctx = null;

	this.init = function () {
		let canvas = $('#canvas-main')[0];
        ctx = canvas.getContext('2d');

        CanvasRenderingContext2D.prototype.clear = function() {
            this.save();
            this.setTransform(1, 0, 0, 1, 0, 0);
            this.clearRect(0, 0, canvas.width, canvas.height);
            this.restore();
        };
	};

	this.user = function (spriteData) {
		var ready = false;
		var image = new Image();
		spriteData = $.extend({
			x: 0,
			y: 0,
			width: 15,
			height: 10,
			imageSrc: 'playerImage.png'
		}, spriteData);
		image.src = spriteData.imageSrc;

		image.onload = function () {
			ready = true;
		};

		this.update = function () {

		};

		this.draw = function () {
			ctx.save();
			ctx.translate(spriteData.x, spriteData.y);
			// ctx.translate(spriteData.x - spriteData.width/2, spriteData.y - spriteData.height/2);
			ctx.drawImage(image,spriteData.x, spriteData.y, spriteData.width, spriteData.height);
			ctx.restore();
		};

		this.move = function (direction) {

		}

		this.clear = function () {
			ctx.clear();
		}
	};

	this.paintMaze = function (maze) {

	}
};
