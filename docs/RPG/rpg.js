//reference : http://blog.sklambert.com/create-a-canvas-tileset-background/
//reference : http://blog.sklambert.com/html5-game-tutorial-prototypal-inheritance/
//reference : https://github.com/straker/endless-runner-html5-game
//https://www.uihere.com/free-cliparts/sprite-tile-based-video-game-opengameart-org-tiles-2186332
(function(window){
	
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
	
	
	var drawing = false;
	var mousePos = { x:0, y:0 };
	var charPos = { x:33, y:0 };
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
	
	function init() {
		initCanvas();
		initCanvasTouchEvent();
		CoreLib.LoadBytes("leve1.json", function(bytes) {
			jsonInfo = CoreLib.ByteToJson(bytes);
			loadImage(jsonInfo.image, function() {
				initMap(buffCtx1, jsonInfo.layer1, tilesetImage, jsonInfo.tileSize, jsonInfo.imageNumTiles);
				//initMap(buffCtx2, jsonInfo.layer2, tilesetImage, jsonInfo.tileSize, jsonInfo.imageNumTiles);
			});
			then = Date.now();
			myReq = requestAnimationFrame( () => renderLoop(1000, null, drawBuff2Screen, null) );
		});
	}
	
	function loadImage(path, fnDrawImage){
		tilesetImage = new Image();
		tilesetImage.src = path;
		tilesetImage.onload = fnDrawImage
	}
	
	
	function initMap(ctx, layerArray, tilesetImage, tileSize, imageNumTiles) {	
		ctx.fillStyle = "#f00";
		for (var y = 0; y < layerArray.length; y++)
			for (var x = 0; x < layerArray[y].length; x++)
				if (layerArray[y][x] != 0)
				{
					var tile = layerArray[y][x];
					var tileRow = (tile / imageNumTiles) | 0;
					var tileCol = (tile % imageNumTiles) | 0;
					ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (x * tileSize), (y * tileSize), tileSize, tileSize);      
					//ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
				}
	}
	
	function getData(layerArray, x, y, tileSize) {
		let r = Math.floor(y / tileSize);
		let c = Math.floor(x / tileSize);
		let data = layerArray[r][c];
		
		let y1 = (y % tileSize);
		let x1 = (x % tileSize);
		
		return data;
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
		let y = Math.abs(mousePos.y - charPos.y);
		let x = Math.abs(mousePos.x - charPos.x);
		
		let orgCharPos = {};
		orgCharPos.x = charPos.x;
		orgCharPos.y = charPos.y;
		
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
		let data = getData(jsonInfo.baseLayer, charPos.x, charPos.y, jsonInfo.tileSize);
		if (data != 0){
			charPos.x = orgCharPos.x;
			charPos.y = orgCharPos.y;
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