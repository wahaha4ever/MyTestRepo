(function(window){
	'use strict';
	var primaryCtx;
	var buffCanvas1;
	var buffCtx1;
	var buffCanvas2;
	var buffCtx2;
	var tilesetCtx

	var tilesetImage;
	var baseLayer = [];
	var layer1 = [];
	var layer2 = [];
	var layer3 = [];
	var selectedTileID = 0;
	var imageNumTiles;
	var activeLayer = 1;
	
	var isMouseDown = false;
	
	function initCanvas() {
		let canvas = document.getElementById("myCanvas");
		canvas.width = 320;//Math.max(window.innerWidth / 2, 400);
		canvas.height = 320;//Math.max(window.innerHeight / 2 , 400);
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
	
	function initCanvasEvent(canvas, fnAction) {
		// Get the position of the mouse relative to the canvas
		function getMousePos(canvasDom, mouseEvent) {
			var rect = canvasDom.getBoundingClientRect();
			return {
				x: mouseEvent.clientX - rect.left,
				y: mouseEvent.clientY - rect.top
			};
		}
		
		canvas.addEventListener("mousedown", function (e) {
			//drawing = true;
			//lastPos = getMousePos(canvas, e);
			isMouseDown = true;
			let mousePos = getMousePos(canvas, e);
			fnAction(mousePos);
			//console.log(mousePos);
		}, false);
		canvas.addEventListener("mouseup", function (e) {
			isMouseDown = false;
			//drawing = false;
		}, false);
		canvas.addEventListener("mousemove", function (e) {
			if (isMouseDown) {
				let mousePos = getMousePos(canvas, e);
				fnAction(mousePos);
			}
		}, false);
	}
	
	function initStorage(maxX, maxY, deftValue) {
		let content = [];
		for ( var r = 0; r < maxY; r++ ){
			let data = []
			for ( var c = 0; c < maxX; c++ ){
				let value = deftValue;
				data.push(value);
			}
			content.push(data);
		}
		layer1 = JSON.parse(JSON.stringify(content));
		layer2 = JSON.parse(JSON.stringify(content));
		layer3 = JSON.parse(JSON.stringify(content));
	}
	
	function switchLayer(layerID)
	{
		let tileSize = document.getElementById("tileSize").value;
		let maxY = document.getElementById("rowCnt").value;
		let maxX = document.getElementById("colCnt").value;	
		
		primaryCtx.fillStyle = "#FFF";
		primaryCtx.fillRect(0, 0, (maxX * tileSize), (maxY * tileSize));
		
		if (layerID == 1)
			drawLayer(layer1, tileSize);
		else if (layerID == 2)
			drawLayer(layer2, tileSize);
		else if (layerID == 3)
			drawLayer(layer3, tileSize);
		else {
			drawLayer(layer1, tileSize);
			drawLayer(layer2, tileSize);
			drawLayer(layer3, tileSize);
		}
	}
	
	function drawLayer(arrLayer, tileSize){
		let maxX = 0;
		let maxY = 0;
		for (var y = 0; y < arrLayer.length; y++) {
			maxY = Math.max(y, maxY);
			for (var x = 0; x < arrLayer[y].length; x++) {
				maxX = Math.max(x, maxX);
				let id = arrLayer[y][x];
				if (id != 0) {
					let tileRow = (id / imageNumTiles) | 0;
					let tileCol = (id % imageNumTiles) | 0;
					primaryCtx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (x * tileSize), (y * tileSize), tileSize, tileSize); 
				}
			}
		}
		drawGridline(primaryCtx, maxX, maxY, tileSize);			
	}
	
	function reinit() {
	}
	
	function init(reinit) {
		reinit = reinit || false;
		//loadImage(jsonInfo.image, function() {
		let tileSize = document.getElementById("tileSize").value;
		let maxY = document.getElementById("rowCnt").value;
		let maxX = document.getElementById("colCnt").value;	
		let tileImageName = document.getElementById("tileImage").value;		
		
		initStorage(maxX, maxY, 0);
		
		let canvas = document.getElementById("myCanvas");
		canvas.width = maxY * tileSize;
		canvas.height = maxX * tileSize;
		primaryCtx = canvas.getContext("2d");
		primaryCtx.fillStyle = "#000";
		drawGridline(primaryCtx, maxX, maxY, tileSize);		
		if (!reinit) {
			initCanvasEvent(canvas, function(mousePos) {
				let ix = Math.floor(mousePos.x / tileSize);
				let iy = Math.floor(mousePos.y / tileSize);
				//console.log(ix + ":" + iy);
				if (activeLayer == 1)
					layer1[iy][ix] = selectedTileID;
				else if (activeLayer == 2)
					layer2[iy][ix] = selectedTileID;
				else if (activeLayer == 3)
					layer3[iy][ix] = selectedTileID;
				else
					layer3[iy][ix] = selectedTileID;
				
				let tileRow = (selectedTileID / imageNumTiles) | 0;
				let tileCol = (selectedTileID % imageNumTiles) | 0;
				primaryCtx.fillRect((ix * tileSize), (iy * tileSize), tileSize, tileSize);
				primaryCtx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (ix * tileSize), (iy * tileSize), tileSize, tileSize);   
				
			});		
		}
		
		
		loadImage(tileImageName, function() {
			let tilesetCanvas = document.getElementById("tilesetCanvas");
			tilesetCanvas.width = tilesetImage.width;
			tilesetCanvas.height = tilesetImage.height;
			tilesetCtx = tilesetCanvas.getContext("2d");
			
			let maxTX = tilesetImage.width / tileSize;
			let maxTY = tilesetImage.height / tileSize;
			tilesetCtx.drawImage(tilesetImage, 0,0);
			drawGridline(tilesetCtx, maxTX, maxTY, tileSize);
			
			imageNumTiles = maxTX;
			
			if (!reinit) {
				initCanvasEvent(tilesetCanvas, function(mousePos) {
					let ix = Math.floor(mousePos.x / tileSize);
					let iy = Math.floor(mousePos.y / tileSize);
					selectedTileID = (iy * imageNumTiles) + ix;
					//console.log(selectedTileID);
				});
			}
		});
		
		if (!reinit) {
			let optLayer = document.getElementById("layer");
			optLayer.addEventListener("change", function() {
				//alert(this.value);
				activeLayer = this.value;
				switchLayer(activeLayer);
			});
			
			let btnExport = document.getElementById("btnExport");
			btnExport.addEventListener("click", function() {
				document.getElementById("layerA").value = JSON.stringify(layer1);
				document.getElementById("layerB").value = JSON.stringify(layer2);
				document.getElementById("layerC").value = JSON.stringify(layer3);
			});
			
			let btnImport = document.getElementById("btnImport");
			btnImport.addEventListener("click", function() {
				layer1 = JSON.parse(document.getElementById("layerA").value);
				layer2 = JSON.parse(document.getElementById("layerB").value);
				layer3 = JSON.parse(document.getElementById("layerC").value);
			});
			
			
			let btnReload = document.getElementById("btnReload");
			btnReload.addEventListener("click", function() {
				init(true);
			});
		}
	}
	
	function drawGridline(ctx, maxX, maxY, blockSize){
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 2;
		for (var i = 0; i <= maxY; i++){
			ctx.moveTo(i * blockSize, 0);
			ctx.lineTo(i * blockSize, maxY * blockSize);
			ctx.stroke();
		}
		for (var i = 0; i <= maxX; i++){
			ctx.moveTo(0, i * blockSize);
			ctx.lineTo(maxY * blockSize, i * blockSize);
			ctx.stroke();
		}
	}
	
	function loadImage(path, fnDrawImage){
		tilesetImage = new Image();
		tilesetImage.src = path;
		tilesetImage.crossorigin = "anonymous";
		tilesetImage.onload = fnDrawImage
	}
	
	init();
})(this);