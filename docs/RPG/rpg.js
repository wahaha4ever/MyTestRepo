//reference : http://blog.sklambert.com/create-a-canvas-tileset-background/
//reference : http://blog.sklambert.com/html5-game-tutorial-prototypal-inheritance/
//reference : https://github.com/straker/endless-runner-html5-game
//https://www.uihere.com/free-cliparts/sprite-tile-based-video-game-opengameart-org-tiles-2186332
(function(window){
	'use strict';
	var CoreLib = {}
	CoreLib.LoadBytes = function (path/*String*/, callback)
	{
		var request = new XMLHttpRequest();
		request.open("GET", path, true);
		request.responseType = "arraybuffer";
		request.onload = function(){
			switch(request.status){
			case 200:
				callback(request.response);
				break;
			default:
				console.error("Failed to load (" + request.status + ") : " + path);
				break;
			}
		}
		request.send(null);
		//return request;
	}
	
	CoreLib.ByteToJson = function (buf)
	{
		
		// Assume UTF-8 without BOM
		let enc = new TextDecoder("utf-8");
		let jsonStr = enc.decode(buf);
		let jsonObj = JSON.parse(jsonStr);
		return jsonObj;
		//var jsonStr;
		//
		//
		//
		//var bomCode = new Uint8Array(buf, 0, 3);
		//if (bomCode[0] == 239 && bomCode[1] == 187 && bomCode[2] == 191) {
		//    jsonStr = String.fromCharCode.apply(null, new Uint8Array(buf, 3));
		//} else {
		//    jsonStr = String.fromCharCode.apply(null, new Uint8Array(buf));
		//}
		//
		//var jsonObj = JSON.parse(jsonStr);
		//
		//return jsonObj;
	}
	
	var primaryCtx;
	var buffCanvas1;
	var buffCtx1;
	var buffCanvas2;
	var buffCtx2;
	var buffCanvasChar;
	var buffCtxChar;
	
	var tilesetImage;
	var jsonInfo;
	var mapAssoc = [];
	var currentMap = null;
	var currentData = 0;
	
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var charPos = { x:0, y:0 };
	var lastPos = mousePos;
	var ratio = 0;
	
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
		
		buffCanvasChar = document.createElement('canvas');
		buffCanvasChar.width = 10;
		buffCanvasChar.height = 10;
		buffCtxChar = buffCanvasChar.getContext("2d");
		buffCtxChar.fillStyle = "#f00";
		buffCtxChar.fillRect(0,0,10,10);
	}
	
	function initCanvasTouchEvent() {
		//http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
		let canvas = document.getElementById("myCanvas");
		
		canvas.addEventListener("mousedown", function (e) {
			drawing = true;
			lastPos = getMousePos(canvas, e);
			mousePos = getMousePos(canvas, e);
			let x = Math.abs(mousePos.x - charPos.x);
			let y = Math.abs(mousePos.y - charPos.y);
			ratio = y / x;
			console.log(ratio);
		}, false);
		canvas.addEventListener("mouseup", function (e) {
			drawing = false;
		}, false);
		canvas.addEventListener("mousemove", function (e) {
			if (drawing)
				mousePos = getMousePos(canvas, e);
		}, false);
		
		// Get the position of the mouse relative to the canvas
		function getMousePos(canvasDom, mouseEvent) {
			var rect = canvasDom.getBoundingClientRect();
			return {
				x: mouseEvent.clientX - rect.left,
				y: mouseEvent.clientY - rect.top
			};
		}
		
		
		// Set up touch events for mobile, etc
		canvas.addEventListener("touchstart", function (e) {
			mousePos = getTouchPos(canvas, e);
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousedown", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			canvas.dispatchEvent(mouseEvent);
		}, false);
		canvas.addEventListener("touchend", function (e) {
			var mouseEvent = new MouseEvent("mouseup", {});
			canvas.dispatchEvent(mouseEvent);
		}, false);
		canvas.addEventListener("touchmove", function (e) {
			var touch = e.touches[0];
			var mouseEvent = new MouseEvent("mousemove", {
				clientX: touch.clientX,
				clientY: touch.clientY
			});
			canvas.dispatchEvent(mouseEvent);
		}, false);

		// Get the position of a touch relative to the canvas
		function getTouchPos(canvasDom, touchEvent) {
			var rect = canvasDom.getBoundingClientRect();
			return {
				x: touchEvent.touches[0].clientX - rect.left,
				y: touchEvent.touches[0].clientY - rect.top
			};
		}
		
		
		// Prevent scrolling when touching the canvas
		document.body.addEventListener("touchstart", function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);
		document.body.addEventListener("touchend", function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);
		document.body.addEventListener("touchmove", function (e) {
			if (e.target == canvas) {
				e.preventDefault();
			}
		}, false);
		
	}
	
	function initKeyboard() {
		/* keyboard control */
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
			
			//if (keyConfig.Left.Value) {
			//	moveLeft(grid, shape);
			//	//drawBuff();
			//}
			//if (keyConfig.Right.Value) {
			//	moveRight(grid, shape);
			//	//drawBuff();
			//}
			//if (keyConfig.Down.Value) {
			//	moveDown(grid, shape);
			//	//drawBuff();
			//}
			//if (keyConfig.RotateC.Value) {
			//	moveRotation(grid, shape, true);
			//	drawShapeBuff(shape, blockSize);
			//	//drawBuff();
			//}
			//if (keyConfig.RotateCA.Value) {			
			//	moveRotation(grid, shape, false);		
			//	drawShapeBuff(shape, blockSize);
			//	//drawBuff();
			//}
			//if (keyConfig.Pause.Value) {
			//	pause();
			//	//drawBuff();
			//}
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
	}
	
	function init() {
		initCanvas();
		initCanvasTouchEvent();
		CoreLib.LoadBytes("leve1.json", function(bytes) {
			jsonInfo = CoreLib.ByteToJson(bytes);
			loadImage(jsonInfo.image, function() {
				mapAssoc = initMapAssociation(jsonInfo.map);				
				//currentMap = jsonInfo.map.find(x => x.id == 1);
				//currentData = -1;
				//charPos = getCharPost(currentData, currentMap.baseLayer, jsonInfo.tileSize);
				//showMap(buffCtx1, currentMap.baseLayer, tilesetImage, jsonInfo.tileSize, jsonInfo.imageNumTiles);
				
				
				switchMap(-1, -1, mapAssoc, jsonInfo, buffCtx1);
				//initMap(buffCtx1, jsonInfo.layer1, tilesetImage, jsonInfo.tileSize, jsonInfo.imageNumTiles);
				//initMap(buffCtx2, jsonInfo.layer2, tilesetImage, jsonInfo.tileSize, jsonInfo.imageNumTiles);
				
				then = Date.now();
				myReq = requestAnimationFrame( () => renderLoop(1000, null, drawBuff2Screen, null) );
			});

		});
	}
	
	function loadImage(path, fnDrawImage){
		tilesetImage = new Image();
		tilesetImage.src = path;
		tilesetImage.crossorigin = "anonymous";
		tilesetImage.onload = fnDrawImage
	}
	
	function showMap(ctx, layerArray, tilesetImage, tileSize, imageNumTiles) {	
		//ctx.fillStyle = "#f00";
		let displayTileSize = tileSize;//24;
		for (var y = 0; y < layerArray.length; y++)
			for (var x = 0; x < layerArray[y].length; x++)
				if (layerArray[y][x] != 0)
				{
					var tile = layerArray[y][x];
					var tileRow = Math.floor(tile / imageNumTiles) | 0;
					var tileCol = Math.floor(tile % imageNumTiles) | 0;
					//ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (x * tileSize), (y * tileSize), tileSize, tileSize);      
					ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (x * displayTileSize), (y * displayTileSize), displayTileSize, displayTileSize);      
					//ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
				}
	}
	

	
	
	function initMapAssociation(mapArray){
		let mapAssoc = [];	
		for (var i = 0; i<mapArray.length; i++){
			let id = mapArray[i].id;
			let baseLayer = mapArray[i].baseLayer;
			for (var y = 0; y < baseLayer.length; y++) {
				for (var x = 0; x < baseLayer[y].length; x++) {
					if (baseLayer[y][x] != 0) {
						mapAssoc.push({ id : id, door : baseLayer[y][x]});
					}
				}
			}
		}
		return mapAssoc;
	}
	
	function getCharPost(doorID, baseLayer, tileSize) {
		let charPost = {};
		charPost.x = Math.floor(tileSize / 2);
		charPost.y = Math.floor(tileSize / 2);
		for (var y = 0; y < baseLayer.length; y++) {
			for (var x = 0; x < baseLayer[y].length; x++) {
				if (baseLayer[y][x] == doorID) {
					charPost.x = x * tileSize + Math.floor(tileSize / 2);
					charPost.y = y * tileSize + Math.floor(tileSize / 2);
					return charPost;
				}
			}
		}
		return charPost;
	}
	
	function isEnter(tileSize, tileX, tileY, posX, posY) {
		//let dx = posX % tileSize;
		//let dy = posY % tileSize;
		
		//let hitArea = Math.max(tileSize * 0.1, 4);
		//if (dx <= tileSize = hitArea
		return true;
	}
	
	function getMapID(doorID, currentMapID, mapAssoc) {
		for(var i = 0; i< mapAssoc.length; i++) {
			if (mapAssoc[i].door == doorID && mapAssoc[i].id != currentMapID) {
				// change map
				return mapAssoc[i].id;
			}
		}
		return 0;
	}
	
	function switchMap(doorID, currentMapID, mapAssoc, jsonInfo, ctx) {
		let newMapID = getMapID(doorID, currentMapID, mapAssoc);
		console.log(newMapID);
		if (newMapID == 0)
			return;
			
		if (currentMap) {
			ctx.fillStyle = "#FFF";
			ctx.fillRect(0, 0, 1000, 1000);		
		}
		else {
			ctx.fillStyle = "#FFF";
			ctx.fillRect(0, 0, 1000, 1000);
		}
		currentMap = jsonInfo.map.find(x => x.id == newMapID);		
		currentData = doorID;
		charPos = getCharPost(currentData, currentMap.baseLayer, jsonInfo.tileSize);
		mousePos.x = charPos.x;
		mousePos.y = charPos.y;
		showMap(ctx, currentMap.layer1, tilesetImage, jsonInfo.tileSize, jsonInfo.imageNumTiles);
	}
	
	function getData(layerArray, x, y, tileSize) {
		let r = Math.floor(y / tileSize);
		let c = Math.floor(x / tileSize);
		
		let data = 1;
		if (layerArray.length > r && r >= 0) {
			if (layerArray[r].length > c && c >= 0) {
				data = layerArray[r][c];
			}
		}
		return data;
		
		//let y1 = (y % tileSize);
		//let x1 = (x % tileSize);	
		//
		//if (data != 0) {
		//	// one tile split into 4 cells			
		//	// 1 2
		//	// 4 8
		//	let current = 0;
		//	if (y1 < tileSize / 2) {
		//		if (x1 < tileSize / 2) {
		//			current = 1;
		//		}
		//		else {
		//			current = 2;
		//		}
		//	} else {
		//		if (x1 < tileSize / 2) {
		//			current = 4;
		//		}
		//		else {
		//			current = 8;
		//		}
		//	}
		//	if ((data & current) != current)
		//		return 0;
		//	else 
		//		return 1;
		//}
		//return 0;
	}
	
	function drawBuff2Screen() {
		//console.log(mousePos);
		let y = Math.abs(mousePos.y - charPos.y);
		let x = Math.abs(mousePos.x - charPos.x);
		
		let orgCharPos = {};
		orgCharPos.x = charPos.x;
		orgCharPos.y = charPos.y;	
		
		//let newCharPos = {};
		//newCharPos.x = charPos.x;
		//newCharPos.y = charPos.y;
		//
		//if (mousePos.y > charPos.y)
		//	newCharPos.y++;
		//else if (mousePos.y < charPos.y)
		//	newCharPos.y--;		
		//if (mousePos.x > charPos.x)
		//	newCharPos.x++;
		//else if (mousePos.x < charPos.x)
		//	newCharPos.x--;
		//	
        //
		//
		//if ((y / x) >= ratio) {
		//	// handle y first
		//	if (getData(currentMap.baseLayer, orgCharPos.x, newCharPos.y, jsonInfo.tileSize) != 1) {
		//		charPos.x = orgCharPos.x;
		//		charPos.y = newCharPos.y;
		//	}
		//	else if (getData(currentMap.baseLayer, newCharPos.x, orgCharPos.y, jsonInfo.tileSize) != 1) {
		//		charPos.x = newCharPos.x;
		//		charPos.y = orgCharPos.y;
		//	}
		//} else {
		//	// handle x first
		//	if (getData(currentMap.baseLayer, newCharPos.x, orgCharPos.y, jsonInfo.tileSize) != 1) {
		//		charPos.x = newCharPos.x;
		//		charPos.y = orgCharPos.y;
		//	}
		//	else if (getData(currentMap.baseLayer, orgCharPos.x, newCharPos.y, jsonInfo.tileSize) != 1) {
		//		charPos.x = orgCharPos.x;
		//		charPos.y = newCharPos.y;
		//	}
		//}
		
		//let data = getData(jsonInfo.baseLayer, charPos.x, charPos.y, jsonInfo.tileSize);
		//if (data != currentData) {
		//	currentData = data;
		//	if (data > 1) {
		//		switchMap(data, currentMap.id, mapAssoc, jsonInfo, buffCtx1);
		//	}
		//}
		
		if ((y / x) >= ratio) {		
			// handle y
			if (mousePos.y > charPos.y)
				charPos.y++;
			else if (mousePos.y < charPos.y)
				charPos.y--;
		}
		else {
			// handle x
			if (mousePos.x > charPos.x)
				charPos.x++;
			else if (mousePos.x < charPos.x)
				charPos.x--;
		}

		
		//let data = getData(jsonInfo.baseLayer, charPos.x, charPos.y, jsonInfo.tileSize);
		let data = getData(currentMap.baseLayer, charPos.x, charPos.y, jsonInfo.tileSize);
		if (data == 1){
			// rollback
			charPos.x = orgCharPos.x;
			charPos.y = orgCharPos.y;
		}
		else {
			if (data != currentData) {
				currentData = data;
				console.log(currentData);
				if (data > 1) {
					switchMap(data, currentMap.id, mapAssoc, jsonInfo, buffCtx1);
				}
				
				
			}
			
		}

		primaryCtx.drawImage(buffCanvas1, 0, 0);
		primaryCtx.drawImage(buffCanvasChar, charPos.x - buffCanvasChar.width / 2, charPos.y - buffCanvasChar.height / 2);
		primaryCtx.drawImage(buffCanvas2, 0, 0);
	}
	
	
	
	
	
	var now, then
	var myReq;
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
	
	init();
	
	
})(this);