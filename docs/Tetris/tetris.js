(function(window, VPad){
	'use strict';	
	class Shape {
	//	content = [];
	//	shapeCode = 0;
		constructor(shapeCode) {
			this.content = [];
			this.shapeCode = shapeCode || Math.floor(Math.random() * 8) + 1;
			this.fnInit(this.shapeCode);
			this.offsetX = 1;
			this.offsetY = 1;
		}
		fnAllowRotate() {
			if (this.shapeCode == 5)
				return false;
			if (this.shapeCode == 8)
				return false;
			return true;
		}
		fnIsBoom() {
			return (this.shapeCode == 8);
		}
		fnApply(shapeCode, shapeArray){
			this.shapeCode = shapeCode;
			this.content = shapeArray.map(function(x) { return x.slice(); });
		}
		fnInit(shapeCode) {
			shapeCode = shapeCode || Math.floor(Math.random() * 8) + 1;
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
			}
		}
		fnRotate(bClockwise) {
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
		fnGetShapeCode() {
			return this.shapeCode;
		}
		fnGetContent() {
			return this.content;
		}
		//fnSetContent = function(shapeArray){
		//	this.content = shapeArray;
		//}
	}
	
	class Grid {
		//noOfRow = 0;
		//noOfCol = 0;
		//content = [];
		constructor(noOfRow, noOfCol) {
			this.content = [];
			this.noOfCol = noOfCol;
			this.noOfRow = noOfRow;
			this.fnInit();
		}
		fnInit() {
			this.content = [];
			for ( var r = 0; r < this.noOfRow; r++ ){
				let data = []
				for ( var c = 0; c < this.noOfCol; c++ ){
					let value = 0;//Math.floor(Math.random() * 10);
					data.push(value);
				}
				this.content.push(data);
			}
		}
		fnApplyShape(shape, ixR, ixC) {
			let shapeArray = shape.fnGetContent();
			for ( var r = 0; r < shapeArray.length; r++ )
				for ( var c = 0; c < shapeArray[r].length; c++ )
					if (shapeArray[r][c] != 0)
						this.content[ixR - r][ixC + c] = shapeArray[r][c];
		}
		fnIsValid(shape, ixR, ixC) {
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
		fnGetData(ixR, ixC){
			return this.content[ixR][ixC];
		}
		fnGetFullRowIdx() {
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
		fnClearData(ixR, ixC) {
			console.log(ixR, ixC);
			if (ixR >= 0 && ixR < this.noOfRow && ixC >=0 && ixC < this.noOfCol)
				this.content[ixR][ixC] = 0;
		}
		fnRemoveRow(ixR){
			this.content.splice(ixR, 1);
			let data = [];
			for ( var c = 0; c < this.noOfCol; c++ ){
				let value = 0;
				data.push(value);
			}
			this.content.push(data);
		}
	}
	
	//if ( !window.requestAnimationFrame ) {
	//
	//	window.requestAnimationFrame = ( function() {
	//
	//		return window.webkitRequestAnimationFrame ||
	//		window.mozRequestAnimationFrame ||
	//		window.oRequestAnimationFrame ||
	//		window.msRequestAnimationFrame ||
	//		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
	//
	//			window.setTimeout( callback, 1000 / 60 );
	//
	//		};
	//
	//	} )();
	//
	//}
	//
	//if ( !window.cancelAnimationFrame ) {
	//	window.cancelAnimationFrame = (function() {
	//		return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	//	})();
	//}
	
	
	
	
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
	
	var drawArea = function(ctx, color, x, y, width, height) {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, width, height);
	}
	
	var drawRow = function(ctx, color, py, blockSize, width) {
		drawArea(ctx, color, 0, py * blockSize, width, blockSize);
		//ctx.fillStyle = color;
		//ctx.fillRect(0, py * blockSize, width, blockSize);
	}
	
	var drawGridBG = function(ctx, grid, blockSize){
		drawArea(ctx, "#000", 0, 0, grid.noOfCol * blockSize, grid.noOfRow * blockSize);
		////ctx.clearRect(0,0, 100,100);
		//ctx.fillStyle = "#000";
		//ctx.fillRect(0, 0, grid.noOfCol * blockSize, grid.noOfRow * blockSize);		
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
			case 1:
				return "red";
			case 2:
				return "orange";
			case 3:
				return "yellow";
			case 4:
				return "greenyellow";
			case 5:
				return "green";
			case 6:
				return "lightblue";
			case 7:
				return "blueviolet";
			case 8:
				return "white"
			default:
				return "black";
		}
	}
	
	var calcY = function(grid, shape, cx, cy){
		let py = cy;
		while (grid.fnIsValid(shape, getIndexR(grid, py), cx))
			py++;
		py--;
		
		return py;
	}
	
	var moveLeft = function(grid, shape){
		if (gameStatus != STATUS_PROCESS)
			return;
		currX--;
		if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX))
			currX++;
		
		predY = calcY(grid, shape, currX, currY);
	}
	var moveRight = function(grid, shape){
		if (gameStatus != STATUS_PROCESS)
			return;
		currX++;
		if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX))
			currX--;
		
		predY = calcY(grid, shape, currX, currY);
	}
	var moveDown = function(grid, shape){		
		if (gameStatus != STATUS_PROCESS)
			return;
		currY = calcY(grid, shape, currX, currY);
		//while (grid.fnIsValid(shape, getIndexR(grid, currY), currX))
		//	currY++;
		//currY--;
	}
	
	var moveRotation = function(grid, shape, bClockwise) {
		if (gameStatus != STATUS_PROCESS)
			return;
		if (!shape.fnAllowRotate())
			return;
		let org = shape.fnGetContent();
		shape.fnRotate(bClockwise);
		if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX)){
			shape.fnApply(shape.shapeCode, org);
		}		
		predY = calcY(grid, shape, currX, currY);
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
		currY = -1,
		predY = currY;
	
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
	
	// variable for animation (remove row)
	var animeID = 0
	var arrIdx = [];
	var animateInterval = 80;
	
	// variable for refresh per frame
	var then = Date.now();
	var now;	
	var actionInterval = 1000;		
	var myReq;
	
	var vpadConfig = {};
	
	let primaryCtx;
	let buffCanvasShape;
	let buffCtxShape;	
	let buffCanvas;
	let buffCtx;	
	let buffCanvasGridLine;
	let buffCtxGridLine
	
	var initCanvas = function() {
		let canvas = document.getElementById("myCanvas");
		primaryCtx = canvas.getContext("2d");	
		
		buffCanvas = document.createElement('canvas');
		buffCanvas.width = canvas.width;
		buffCanvas.height = canvas.height;
		buffCtx = buffCanvas.getContext("2d");
		
		buffCanvasGridLine = document.createElement('canvas');
		buffCanvasGridLine.width = canvas.width;
		buffCanvasGridLine.height = canvas.height;
		buffCtxGridLine = buffCanvasGridLine.getContext("2d");
		
		buffCanvasShape = document.createElement('canvas');
		buffCanvasShape.width = blockSize * 5;
		buffCanvasShape.height = blockSize * 5;
		buffCtxShape = buffCanvasShape.getContext("2d");
		
		//buffCanvasShapePred = document.createElement('canvas');
		//buffCanvasShapePred.width = blockSize * 5;
		//buffCanvasShapePred.height = blockSize * 5;
		//buffCtxShapePred = buffCanvasShapePred.getContext("2d");
		
		primaryCtx.save();
		
		function resizeCanvas() {
			
			let devicePixelRatio = window.devicePixelRatio !== undefined ? window.devicePixelRatio : 1;
			
			document.getElementById("info").innerHTML = window.innerWidth;
			
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
			
			buffCanvas.width = canvas.width;
			buffCanvas.height = canvas.height;
			
			buffCanvasGridLine.width = canvas.width;
			buffCanvasGridLine.height = canvas.height;
			
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
		window.addEventListener('resize', resizeCanvas, false);
		window.addEventListener('orientationchange', resizeCanvas, false);
		resizeCanvas();
	}
	initCanvas();
	
	
	var init = function() {
		grid.fnInit();
		drawBuff(grid, blockSize);
		
		nextShape.fnInit();
		initFromNext();
		
		//shape.fnInit();
		//nextShape.fnInit();
		gameStatus = STATUS_PROCESS;		
		
		
		//drawShapeBuff(shape, blockSize);
		
		//predY = calcY(grid, shape, currX, currY);
		
		myReq = requestAnimationFrame( mainLoop );	
	}
	
	var initFromNext = function() {
		shape.fnInit(nextShape.fnGetShapeCode());
		drawShapeBuff(shape, blockSize);
		
		currY = deftY;
		currX = deftX;
		predY = calcY(grid, shape, currX, currY);
		nextShape.fnInit();
	}
	
	var drawStatus = function() {
		var element = document.getElementById("infoGameOver");
		if (gameStatus == STATUS_GAMEOVER) {			
			element.classList.add("infoShow");
		}
		else {
			element.classList.remove("infoShow");
		}
	}
	
	var drawBuff = function(grid, blockSize) {
		drawGridBG(buffCtx, grid, blockSize);
		drawGridLine(buffCtxGridLine, grid, blockSize);
		drawGridData(buffCtx, grid, blockSize);
	}
	
	var drawBuff2Screen = function(px, py, blockSize, predY) {
		primaryCtx.drawImage(buffCanvas, 0, 0);
		if (gameStatus == STATUS_PROCESS) {
			primaryCtx.drawImage(buffCanvasShape, px * blockSize, py * blockSize);
			primaryCtx.save();
			primaryCtx.globalAlpha = 0.4;
			primaryCtx.drawImage(buffCanvasShape, px * blockSize, predY * blockSize);
			primaryCtx.restore();
		}
		primaryCtx.drawImage(buffCanvasGridLine, 0, 0);
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
	var drawShapeBuff2Buff = function(px, py, blockSize) {
		buffCtx.drawImage(buffCanvasShape, px * blockSize, py * blockSize);
	}

	
	

	
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
	document.getElementById("btnRetry").addEventListener("click", function(){
		init();
		drawStatus();		
	});
	
	

	
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
		
		
		var keyConfig = VPad.getStatus();	
		if (gameStatus == STATUS_PROCESS) {
			if (!vpadConfig["left"] && keyConfig["left"])
				moveLeft(grid, shape);
			if (!vpadConfig["right"] && keyConfig["right"])
				moveRight(grid, shape);
			if (!vpadConfig["down"] && keyConfig["down"])
				moveDown(grid, shape);
			if (!vpadConfig["A"] && keyConfig["A"]) {
				moveRotation(grid, shape, true);
				drawShapeBuff(shape, blockSize);
			}
			if (!vpadConfig["B"] && keyConfig["B"]) {
				moveRotation(grid, shape, false);
				drawShapeBuff(shape, blockSize);
			}				
		}
		vpadConfig = JSON.parse(JSON.stringify(keyConfig));
		
		if (elapsed > actionInterval) {
			then = now - (elapsed % actionInterval)
			
			// Put your drawing code here
			currY++;
			if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX))
			{
				currY--;
				
				// apply data and screen image into grid
				grid.fnApplyShape(shape, getIndexR(grid, currY), currX);
				drawShapeBuff2Buff(currX, currY, blockSize);
				
				if (shape.fnIsBoom()){
					// boom
					cancelAnimationFrame(myReq);					
					gameStatus = STATUS_REMOVING;
					animeID = 0;
					myReq = requestAnimationFrame( () => renderLoop(animateInterval, animeBoomLoop, null, animeFinish) );
				}
				else {				
					arrIdx = grid.fnGetFullRowIdx();
					if (arrIdx.length > 0)
					{
						// remove row
						cancelAnimationFrame(myReq);					
						gameStatus = STATUS_REMOVING;
						animeID = 0;
						myReq = requestAnimationFrame( () => renderLoop(animateInterval, animeLoop, null, animeFinish) );
					}
					else {
						// normal flow
						initFromNext();
						if (!grid.fnIsValid(shape, getIndexR(grid, currY), currX)) {
							console.log("Game Over");
							gameStatus = STATUS_GAMEOVER;
							drawStatus();
						}
					}
				}
			}
		}	
		
		drawBuff2Screen(currX, currY, blockSize, predY);
		if (gameStatus == STATUS_PROCESS) {
			cancelAnimationFrame(myReq);
			myReq = requestAnimationFrame( mainLoop );
		}
	}

	function animeBoomLoop() {
		console.log("fnBoom");
		
		if (animeID < 10) {
			animeID++
			// animation for removing blocks
			//var rx = currX;
			//var ry = getY(grid, currY);
			let color = "rgba(255, 255, 255, "+(animeID / 10)+")";			
			drawArea(buffCtx, color, (currX - 1) * blockSize, (currY - 1) * blockSize, blockSize * 5, blockSize * 5);
			drawBuff2Screen(currX, currY, blockSize, predY);
			return true;
		}
		else {
			// animation finish
			var ix = currX - 1;
			var iy = getIndexR(grid, currY - 1);
			
			for (let r = 0; r<5; r++)
				for (let c = 0; c<5; c++)
					grid.fnClearData(iy-r, ix+c);
			drawBuff(grid, blockSize);
			drawBuff2Screen(currX, currY, blockSize, predY);
			return false;
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
				drawBuff2Screen(currX, currY, blockSize, predY);
				arrIdx.splice(0, 1);
				animeID = 0;
				return true;	// to next arrIdx
			}
			else {
				// animation for row removing
				let color = "rgba(255, 255, 255, "+(animeID / 10)+")";
				drawRow(buffCtx, color, getY(grid, arrIdx[0]), blockSize, grid.noOfCol * blockSize);
				drawBuff2Screen(currX, currY, blockSize, predY);
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
		initFromNext();
		predY = calcY(grid, shape, currX, currY);
		myReq = requestAnimationFrame( mainLoop );			
	}
	
	
	function renderLoop(interval, fnAction, fnStdAction, fnFinishAction) {
		//https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
		//https://medium.com/javascript-in-plain-english/better-understanding-of-timers-in-javascript-settimeout-vs-requestanimationframe-bf7f99b9ff9b
		now = Date.now();
		let elapsed = now - then;
		let result = true;
		if (elapsed > interval) {
			then = now - (elapsed % interval)
			if (fnAction)
				result = fnAction();			
		}
		if (fnStdAction)
			fnStdAction();
		
		cancelAnimationFrame(myReq);
		if (result) {	
			// start again
			myReq = requestAnimationFrame( () => renderLoop(interval, fnAction, fnStdAction, fnFinishAction) );
		}
		else {
			// finish
			if (fnFinishAction)
				fnFinishAction();
		}
	}

	VPad.init("M", false, 2);
	init();
	
})(this, VPad);