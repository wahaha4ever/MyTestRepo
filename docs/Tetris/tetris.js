(function(window){
	'use strict';	
	class Shape {
		content = [];
		shapeCode = 0;
		constructor(shapeCode) {
			if (shapeCode)
				this.fnInit(shapeCode);
			else
				this.fnInit(0);
		}
		fnApply = function(shapeCode, shapeArray){
			this.shapeCode = shapeCode;
			this.content = shapeArray.map(function(x) { return x.slice(); });
		}
		fnInit = function(shapeCode) {
			shapeCode = shapeCode || Math.floor(Math.random() * 10);
			this.shapeCode = shapeCode
			if (shapeCode == 1){
				this.content = [
					[0,0,0,0],
					[1,1,1,1],
					[0,0,0,0],
					[0,0,0,0]
				]
			}
			else if (shapeCode == 2){
				this.content = [
					[2,2,0],
					[0,2,2],
					[0,0,0]
				]
			}
			else if (shapeCode == 3){
				this.content = [
					[0,3,3],
					[3,3,0],
					[0,0,0]
				]
			}
			else if (shapeCode == 4){
				this.content = [
					[0,4,0],
					[4,4,4],
					[0,0,0]
				]
			}
			else if (shapeCode == 5){
				this.content = [
					[5,5],
					[5,5]
				]
			}
			else if (shapeCode == 6){
				this.content = [
					[6,0,0],
					[6,6,6],
					[0,0,0]
				]
			}
			else if (shapeCode == 7){
				this.content = [
					[0,0,7],
					[7,7,7],
					[0,0,0]
				]
			}
			else {
				this.content = [
					[8,0,8],
					[0,8,0],
					[0,8,0]
				]
				//this.content = [
				//	[1,2,3,4],
				//	[1,2,3,4],
				//	[1,2,3,4],
				//	[1,2,3,4]
				//]
			}
		}
		fnRotate = function(bClockwise) {
			//let shapeArray = this.content.map((x) => x);
			let shapeArray = this.content.map(function(x) { return x.slice(); });
			let n = this.content.length - 1;
			if (bClockwise) {
				for ( var r = 0; r < this.content.length; r++ )
					for ( var c = 0; c < this.content[r].length; c++ )
						shapeArray[c][n-r] = this.content[r][c];					
			}
			else {
				for ( var r = 0; r < this.content.length; r++ )
					for ( var c = 0; c < this.content[r].length; c++ )
						shapeArray[n-c][r] = this.content[r][c];					
			}
			//return shapeArray;
			this.content = shapeArray;
		}
		fnGetContent = function(){
			return this.content;
		}
		//fnSetContent = function(shapeArray){
		//	this.content = shapeArray;
		//}
	}

	class Grid {
		noOfRow = 0;
		noOfCol = 0;
		content = [];
		constructor(noOfRow, noOfCol) {
			this.noOfCol = noOfCol;
			this.noOfRow = noOfRow;
			this.fnInit();
		}
		fnInit = function() {
			for ( var r = 0; r < this.noOfRow; r++ ){
				let data = []
				for ( var c = 0; c < this.noOfCol; c++ ){
					let value = 0;//Math.floor(Math.random() * 10);
					data.push(value);
				}
				this.content.push(data);
			}
		}
		fnApplyShape = function(shape, ixR, ixC) {
			let shapeArray = shape.fnGetContent();
			for ( var r = 0; r < shapeArray.length; r++ )
				for ( var c = 0; c < shapeArray[r].length; c++ )
					if (shapeArray[r][c] != 0)
						this.content[ixR - r][ixC + c] = shapeArray[r][c];
		}
		fnIsValid = function(shape, ixR, ixC) {
			let shapeArray = shape.fnGetContent();
			for ( var r = 0; r < shapeArray.length; r++ ) {
				for ( var c = 0; c < shapeArray[r].length; c++ ) {
					if (shapeArray[r][c] != 0) {
						if (ixR - r < 0 || ixR - r > this.noOfRow)
							return false;
						if (ixC + c < 0 || ixC + c > this.noOfCol)
							return false;
						if (this.content[ixR - r][ixC + c] != 0)
							return false;
					}
				}
			}					
			return true;
		}
		fnGetData = function(ixR, ixC){
			return this.content[ixR][ixC];
		}
		fnGetFullRowIdx = function() {
			let fullRowIdx = [];
			for ( var r = this.content.length - 1; r >=0 ; r-- ) {
				let bIsFullRow = true;
				for ( var c = 0; c < this.content[r].length; c++ ) {
					if (this.content[r][c] == 0)
						bIsFullRow = false;
				}
				if (bIsFullRow)
					fullRowIdx.push(r);
			}
			return fullRowIdx;
		}
		fnRemoveRow = function(ixR){
			this.content.splice(ixR, 1);
			let data = [];
			for ( var c = 0; c < this.noOfCol; c++ ){
				let value = 0;
				data.push(value);
			}
			this.content.push(data);
		}
	}

	if ( !window.requestAnimationFrame ) {

		window.requestAnimationFrame = ( function() {

			return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

				window.setTimeout( callback, 1000 / 60 );

			};

		} )();

	}
	
	if ( !window.cancelAnimationFrame ) {
		window.cancelAnimationFrame = (function() {
			return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
		})();
	}

	
	
	
	var getIndexR = function(grid, y){
		return grid.noOfRow - 1 - y;
	}
	var getY = function(grid, r){
		return grid.noOfRow - 1 - r;
	}
	
	var drawGridData = function(ctx, grid, blockSize){
		for (var r = 0; r < grid.noOfRow; r++){	
			for (var c = 0; c < grid.noOfCol; c++){
				if (grid.fnGetData(r, c) != 0) {
					let y = getY(grid, r);
					ctx.fillStyle = getColor(grid.fnGetData(r, c));
					ctx.fillRect(c * blockSize, y * blockSize, blockSize, blockSize);
				}
			}
		}
	}
	
	var drawShape = function(ctx, blockSize, shape, px, py){
		let shapeArray = shape.fnGetContent();
		for ( var r = 0; r < shapeArray.length; r++ ) {
			for ( var c = 0; c < shapeArray[r].length; c++ ) {
				if (shapeArray[r][c] != 0) {
					ctx.fillStyle = getColor(shapeArray[r][c]);
					ctx.fillRect((px + c) * blockSize, (py + r) * blockSize, blockSize, blockSize);
				}
			}
		}
	}
	
	var drawGridBG = function(ctx, grid, blockSize){
		//ctx.clearRect(0,0, 100,100);
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, grid.noOfCol * blockSize, grid.noOfRow * blockSize);		
	}

	var drawGridLine = function(ctx, grid, blockSize) {
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 2;
		for (var i = 0; i < grid.noOfCol; i++){
			ctx.moveTo(i * blockSize, 0);
			ctx.lineTo(i * blockSize, grid.noOfRow * blockSize);
			ctx.stroke();
		}
		for (var i = 0; i < grid.noOfRow; i++){
			ctx.moveTo(0, i * blockSize);
			ctx.lineTo(grid.noOfCol * blockSize, i * blockSize);
			ctx.stroke();
		}
	}
	
	var getColor = function(code){
		switch (code) {
			case 0:
				return "#00f";
			case 1:
				return "#0f0";
			case 2:
				return "#0ff";
			case 3:
				return "#f00";
			case 4:
				return "#f0f";
			case 5:
				return "#ff0";
			case 6:
				return "#fff";
			default:
				return "#f82";
		}
	}
	
	var moveLeft = function(grid, shape){
		if (gameStatus != STATUS_PROCESS)
			return;
		currX--;
		if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX))
			currX++;
	}
	var moveRight = function(grid, shape){
		if (gameStatus != STATUS_PROCESS)
			return;
		currX++;
		if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX))
			currX--;
	}
	var moveDown = function(grid, shape){		
		if (gameStatus != STATUS_PROCESS)
			return;
		while (grid.fnIsValid(shape, getIndexR(grid, currY), currX))
			currY++;
		currY--;
	}
	
	var moveRotation = function(grid, shape, bClockwise) {
		let org = shape.fnGetContent();
		shape.fnRotate(bClockwise);
		if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX)){
			shape.fnApply(shape.shapeCode, org);
		}
	}
	
	var pause = function() {
		if (gameStatus == STATUS_PROCESS) {
			gameStatus = STATUS_PAUSE;
			cancelAnimationFrame(myReq);
		}
		else {
			gameStatus = STATUS_PROCESS;
			myReq = requestAnimationFrame( mainLoop );
		}
	}
	
	let deftX = 5,
		deftY = 0,
		currX = 5,
		currY = -1;

	let STATUS_INIT = 0;
	let STATUS_PROCESS = 1;
	let STATUS_REMOVING = 2;
	let STATUS_PAUSE = 3;
	let STATUS_GAMEOVER = 4;
	
	let gameStatus = STATUS_INIT;	
	let blockSize = 10;	
	let grid = new Grid(20, 10);	
	let shape = new Shape(Math.floor(Math.random() * 10));
	let nextShape = new Shape(Math.floor(Math.random() * 10));
	

	let primaryCtx;
	let buffCanvasShape;
	let buffCtxShape;
	let buffCanvas;
	let buffCtx;
	
	var initCanvas = function() {
		let canvas = document.getElementById("myCanvas");
		primaryCtx = canvas.getContext("2d");	
		
		buffCanvas = document.createElement('canvas');
		buffCanvas.width = canvas.width;
		buffCanvas.height = canvas.height;
		buffCtx = buffCanvas.getContext("2d");
		
		buffCanvasShape = document.createElement('canvas');
		buffCanvasShape.width = blockSize * 5;
		buffCanvasShape.height = blockSize * 5;
		buffCtxShape = buffCanvasShape.getContext("2d");
		
		primaryCtx.save();
		
		window.addEventListener('resize', resizeCanvas, false);

		function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
			
			buffCanvas.width = canvas.width;
			buffCanvas.height = canvas.height;
			
			let blockH = Math.floor(canvas.height / grid.noOfRow);
			let blockV = Math.floor(canvas.width / grid.noOfCol);		
			blockSize = Math.min(blockH, blockV);
			
			let margin = Math.floor((canvas.width - (blockSize * 10))/ 2);
			primaryCtx.restore();
			primaryCtx.translate(margin, 0);
			
			buffCanvasShape.width = blockSize * 5;
			buffCanvasShape.height = blockSize * 5;
			
			if (gameStatus == STATUS_PROCESS)
			{
				drawBuff(grid, blockSize);
				drawShapeBuff(shape, blockSize);
			}
		}
		resizeCanvas();
	}
	initCanvas();

	
	var init = function() {
		grid.fnInit();
		shape.fnInit();
		nextShape.fnInit();
		gameStatus = STATUS_PROCESS;		
		
		drawBuff(grid, blockSize);		
		drawShapeBuff(shape, blockSize);
		
		myReq = requestAnimationFrame( mainLoop );	
	}

	var drawRow = function(ctx, color, py, blockSize, width) {
		ctx.fillStyle = color;
		ctx.fillRect(0, py * blockSize, width, blockSize);
	}
	
	var drawBuff = function(grid, blockSize) {
		drawGridBG(buffCtx, grid, blockSize);
		drawGridLine(buffCtx, grid, blockSize);
		drawGridData(buffCtx, grid, blockSize);
	}
	
	var drawBuff2Screen = function(px, py, blockSize) {
		primaryCtx.drawImage(buffCanvas, 0, 0);
		if (gameStatus == STATUS_PROCESS)
			primaryCtx.drawImage(buffCanvasShape, px * blockSize, py * blockSize);
	}
	
	var drawShapeBuff2Buff = function(px, py, blockSize) {
		buffCtx.drawImage(buffCanvasShape, px * blockSize, py * blockSize);
	}
	
	
	var drawShapeBuff = function(shape, blockSize){
		let ctx = buffCtxShape;
		let shapeArray = shape.fnGetContent();
		ctx.clearRect(0, 0, blockSize * 5, blockSize * 5);
		for ( var r = 0; r < shapeArray.length; r++ ) {
			for ( var c = 0; c < shapeArray[r].length; c++ ) {
				if (shapeArray[r][c] != 0) {
					ctx.fillStyle = getColor(shapeArray[r][c]);
					ctx.fillRect(c * blockSize, r * blockSize, blockSize, blockSize);
				}
			}
		}
	}
	
	
	document.getElementById("btnLeft").addEventListener("click", function(){
		moveLeft(grid, shape);
	});
	document.getElementById("btnRight").addEventListener("click", function(){
		moveRight(grid, shape);
	});
	document.getElementById("btnDown").addEventListener("click", function(){
		moveDown(grid, shape);
	});
	document.getElementById("btnRotate").addEventListener("click", function(){
		moveRotation(grid, shape, true);
		drawShapeBuff(shape, blockSize);
	});
	
	var keyConfig = {
		Left : { Code : 37, Value : false },
		Right : { Code : 39, Value : false },
		Down : { Code : 40, Value : false },
		RotateC : { Code : 38, Value : false },
		RotateCA : { Code : 96, Value : false },
		Pause : { Code : 27, Value : false }
	}
	
	var onKeyDown = function ( event ) {
		for(var key in keyConfig) { 
			if (event.keyCode == keyConfig[key].Code) {
				keyConfig[key].Value = true;
			}
		};
		
		if (keyConfig.Left.Value) {
			moveLeft(grid, shape);
			//drawBuff();
		}
		if (keyConfig.Right.Value) {
			moveRight(grid, shape);
			//drawBuff();
		}
		if (keyConfig.Down.Value) {
			moveDown(grid, shape);
			//drawBuff();
		}
		if (keyConfig.RotateC.Value) {
			moveRotation(grid, shape, true);
			drawShapeBuff(shape, blockSize);
			//drawBuff();
		}
		if (keyConfig.RotateCA.Value) {			
			moveRotation(grid, shape, false);		
			drawShapeBuff(shape, blockSize);
			//drawBuff();
		}
		if (keyConfig.Pause.Value) {
			pause();
			//drawBuff();
		}
	};
		
	var onKeyUp = function ( event ) {
		for(var key in keyConfig) { 					
			if (event.keyCode == keyConfig[key].Code) {
				keyConfig[key].Value = false;
			}
		};
	};
	
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	
	
	
	// variable for animation (remove row)
	var animeID = 0
	var arrIdx = [];
	var animateInterval = 80;
	
	// variable for refresh per frame
	var then = Date.now();
	var now;	
	var actionInterval = 1000;		
	var myReq;
	
	//function run() {
	//	

	//	now = Date.now();
	//	elapsed = now - then;
	//	console.log(elapsed);
	//	if (elapsed > fpsInterval) {
	//		then = now - (elapsed % fpsInterval)
	//		
	//		// Put your drawing code here
	//	}
	//	
	//	//drawScreen();
	//	cancelAnimationFrame(myReq);
	//	myReq = requestAnimationFrame( run );	
	//	
	//}
	//myReq = requestAnimationFrame( run );	
	
	function mainLoop() {
		
		//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
		//https://medium.com/javascript-in-plain-english/better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b
		now = Date.now();
		let elapsed = now - then;
		//console.log(elapsed);
		if (elapsed > actionInterval) {
			then = now - (elapsed % actionInterval)
			
			// Put your drawing code here
			currY++;
			if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX))
			{
				currY--;
				grid.fnApplyShape(shape, getIndexR(grid, currY), currX);
				drawShapeBuff2Buff(currX, currY, blockSize);
				shape.fnInit();
				nextShape.fnInit();
				currY = deftY;
				currX = deftX;
				arrIdx = grid.fnGetFullRowIdx();
				if (arrIdx.length > 0)
				{
					//for(var i=0; i<arrIdx.length; i++) {
					//	grid.fnRemoveRow(arrIdx[i]);
					//	drawBuff();
					//}
					cancelAnimationFrame(myReq);					
					gameStatus = STATUS_REMOVING;
					//renderLoop(animateInterval, animeLoop, animeFinish);					
					myReq = requestAnimationFrame( () => renderLoop(animateInterval, animeLoop, animeFinish) );
					//arrIdx = [];
				}
				drawShapeBuff(shape, blockSize);
				
				if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX)) {
					console.log("Game Over");
					gameStatus = STATUS_GAMEOVER;
				}
			}
		}
		drawBuff2Screen(currX, currY, blockSize);

		if (gameStatus == STATUS_PROCESS) {		
			cancelAnimationFrame(myReq);
			myReq = requestAnimationFrame( mainLoop );
		}
	}
	
	function animeLoop(){
		console.log("fnAction");
		if (arrIdx.length > 0) {
			animeID++						
			if (animeID >= 10) {
				// animation finish
				grid.fnRemoveRow(arrIdx[0]);
				drawBuff(grid, blockSize);
				drawBuff2Screen(currX, currY, blockSize);
				arrIdx.splice(0, 1);
				animeID = 0;
				return true;	// to next arrIdx
			}
			else {
				// animation for row removing
				let color = "rgba(255, 255, 255, "+(animeID / 10)+")";
				drawRow(buffCtx, color, getY(grid, arrIdx[0]), blockSize, grid.noOfCol * blockSize);
				drawBuff2Screen(currX, currY, blockSize);
				return true;
			}
		}
		else {
			return false;	// no more arrIdx
		}
	}
	
	function animeFinish() {
		animeID = 0;
		arrIdx = [];
		gameStatus = STATUS_PROCESS;
		myReq = requestAnimationFrame( mainLoop );			
	}
	
	
	function renderLoop(interval, fnAction, fnFinishAction) {
		//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
		//https://medium.com/javascript-in-plain-english/better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b
		now = Date.now();
		let elapsed = now - then;
		let result = true;
		if (elapsed > interval) {
			then = now - (elapsed % interval)
			result = fnAction();			
		}
		
		cancelAnimationFrame(myReq);
		if (result) {	
			// start again
			myReq = requestAnimationFrame( () => renderLoop(interval, fnAction, fnFinishAction) );
		}
		else {
			// finish
			fnFinishAction();
		}
	}
	
	init();
	
})(this);