(function(window){
	var primaryCtx;
	var buffCanvas1;
	var buffCtx1;
	var buffCanvas2;
	var buffCtx2;
	
	function initCanvas() {
		let canvas = document.getElementById("myCanvas");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		primaryCtx = canvas.getContext("2d");	
		
		buffCanvas1 = document.createElement('canvas');
		buffCanvas1.width = canvas.width;
		buffCanvas1.height = canvas.height;
		buffCtx1 = buffCanvas1.getContext("2d");
		
		buffCanvas2 = document.createElement('canvas');
		buffCanvas2.width = canvas.width;
		buffCanvas2.height = canvas.height;
		buffCtx2 = buffCanvas2.getContext("2d");
	}
	
	function init() {
		//loadImage(jsonInfo.image, function() {
		let tileSize = document.getElementById("tileSize").value;
		let maxY = document.getElementById("rowCnt").value;
		let maxX = document.getElementById("colCnt").value;		
	}
	
	function drawGridline(ctx, maxX, maxY, blockSize){
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 2;
		for (var i = 0; i < maxY; i++){
			ctx.moveTo(i * blockSize, 0);
			ctx.lineTo(i * blockSize, maxY * blockSize);
			ctx.stroke();
		}
		for (var i = 0; i < maxX; i++){
			ctx.moveTo(0, i * blockSize);
			ctx.lineTo(maxX * blockSize, i * blockSize);
			ctx.stroke();
		}
	}
	
	function loadImage(path, fnDrawImage){
		tilesetImage = new Image();
		tilesetImage.src = path;
		tilesetImage.onload = fnDrawImage
	}
})(this);