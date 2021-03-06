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
	
	// init	
	var Core = {};
	Core.init = function(){};
	Core.update = function(delta){};
	Core.render = function(){};
	//Core.width = 512;
	//Core.height = 512;
	Core.displayTileSize = 64;
	Core.ctx = null;	
	Core.images = {};
	Core.loadImage = function(key, src) {
		let img = new Image();		
		var p = new Promise(function (resolve, reject) {
			img.onload = function () {
				this.images[key] = img;
				resolve(img);
			}.bind(this);

			img.onerror = function () {
				reject('Could not load image: ' + src);
			};
		}.bind(this));		
		img.crossorigin = "anonymous";
		img.src = src;
		return p;
	};
	Core.getImages = function(key) {
		return key in this.images ? this.images[key] : null;
	}
	
	
	Core.loadBytes = function (path/*String*/, callback)
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
	}
	
	Core.byteToJson = function (buf)
	{
		// Assume UTF-8 without BOM
		let enc = new TextDecoder("utf-8");
		let jsonStr = enc.decode(buf);
		let jsonObj = JSON.parse(jsonStr);
		return jsonObj;
	}
	
	Core.getCanvas = function() {
		return document.getElementById("myCanvas");
	}
	Core.resizeCanvas = function() {
		let canvas = Core.getCanvas();
		canvas.style.width ='100%';
		canvas.style.height ='100%';
		
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		
		let blockH = Math.floor(canvas.height / 8);
		let blockV = Math.floor(canvas.width / 8);		
		Core.displayTileSize = Math.max(blockH, blockV);
		//if (Game.scenario)
		//	Game.scenario.displayTileSize = Core.displayTileSize;
	}
	Core.initCtx = function() {
		let canvas = this.getCanvas();
		//canvas.width = Core.width;//window.innerWidth;
		//canvas.height = Core.height;//window.innerHeight;
		window.addEventListener('resize', Core.resizeCanvas, false);
		window.addEventListener('orientationchange', Core.resizeCanvas, false);
		this.resizeCanvas();
		this.ctx = canvas.getContext("2d");
	}
	
	var keyConfig = {
		Left : { code : 37, value : false },
		Right : { code : 39, value : false },
		Up : { code : 38, value : false },
		Down : { code : 40, value : false }
	}

	var onKeyDown = function ( event ) {
		for(var key in keyConfig) { 
			if (event.keyCode == keyConfig[key].code) {
				keyConfig[key].value = true;
			}
		};
	};

	var onKeyUp = function ( event ) {
		for(var key in keyConfig) { 					
			if (event.keyCode == keyConfig[key].code) {
				keyConfig[key].value = false;
			}
		};
	};
	
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	var Controller = {};
	Controller.initEventListener = function(){
		//document.addEventListener('keydown', onKeyDown, false);
		//document.addEventListener('keyup', onKeyUp, false);	
	};
	Controller.getStatus = function(){
		return keyConfig;
	};
	
	
	/* =============== framework end ==================== */
	class Camera {	
		constructor (canvas) {
			this.canvas = canvas;
			this.x = 0;
			this.y = 0;
			this.following = null
		}
		fnGetWidth() {
			return this.canvas.width;			
		}
		fnGetHeight() {
			return this.canvas.height;
		}
		fnFollow(sprite) {
			this.following = sprite;
			this.following.screenX = 0;
			this.following.screenY = 0;
		}
		fnUpdate(scenario) {
			let maxX = scenario.getWidth() - this.fnGetWidth();
			let maxY = scenario.getHeight() - this.fnGetHeight();
			// assume followed sprite should be placed at the center of the screen
			// whenever possible
			this.following.screenX = this.fnGetWidth() / 2;
			this.following.screenY = this.fnGetHeight() / 2;

			// make the camera follow the sprite
			this.x = this.following.x - this.fnGetWidth() / 2;
			this.y = this.following.y - this.fnGetHeight() / 2;
			// clamp values
			this.x = Math.max(0, Math.min(this.x, maxX));
			this.y = Math.max(0, Math.min(this.y, maxY));

			// in map corners, the sprite cannot be placed in the center of the screen
			// and we have to change its screen coordinates

			// left and right sides
			if (this.following.x < this.fnGetWidth() / 2 ||
				this.following.x > maxX + this.fnGetWidth() / 2) {
				this.following.screenX = this.following.x - this.x;
			}
			// top and bottom sides
			if (this.following.y < this.fnGetHeight() / 2 ||
				this.following.y > maxY + this.fnGetHeight() / 2) {
				this.following.screenY = this.following.y - this.y;
			}
		}
	}
	class Hero {
		
		constructor (width, height, img) {
			this.x = 0;
			this.y = 0;
			this.SPEED = 300;
			this.width = width;
			this.height = height;
			this.displayTileWidth = width;
			this.displayTileHeight = height;
			this.img = img;
			this.curFrame = 0;
			this.maxFrame = 3;
			this.curFrameDuration = 0;
			this.maxFrameDuration = 60;
			this.tileX = 0;
			this.tileY = 0;
			this.currentTileNo = -1;
			
		}
		
		fnMove(delta, dirX, dirY, scenario){
			//this.x += dirX * this.SPEED * delta;
			//this.y += dirY * this.SPEED * delta;
			
			this.fnCollision(delta, dirX, dirY, scenario);
			
			
			if (dirY > 0)
				this.tileY = 0 * this.height;
			if (dirY < 0)
				this.tileY = 1 * this.height;
			if (dirX > 0)
				this.tileY = 2 * this.height;
			if (dirX < 0)
				this.tileY = 3 * this.height;
			
			if (dirX == 0 && dirY == 0)
				this._fnSetFrame(true);
			else
				this._fnSetFrame(false);

			let maxX = scenario.getWidth();
			let maxY = scenario.getHeight();
			
			this.x = Math.max(0, Math.min(this.x, maxX));
			this.y = Math.max(0, Math.min(this.y, maxY));
		}
		_fnSetFrame(isReset) {
			//https://www.simplifiedcoding.net/javascript-sprite-animation-tutorial-html5-canvas/
			isReset = isReset || false;
			if (isReset) {
				this.curFrame = 0;
				this.curFrameDuration = 0;
			}
			else {
				this.curFrameDuration = ++this.curFrameDuration % this.maxFrameDuration;
				if (this.curFrameDuration == 0)
				{
					this.curFrame = ++this.curFrame % this.maxFrame;
				}
			}
			this.tileX = this.curFrame * this.width;
			//let srcY = 0;
			//return { x : srcX, y : srcY };
		}
		fnDraw(ctx, scenario) {
			let tilesetImage = Core.getImages("hero");
			ctx.save();
			ctx.translate(-1 * this.displayTileWidth / 2, -1 * this.displayTileHeight / 2);
			ctx.drawImage(tilesetImage, this.tileX, this.tileY, this.width, this.height, this.screenX, this.screenY, this.displayTileWidth, this.displayTileHeight);
			//ctx.translate(-1 * this.width / 2, -1 * this.height / 2);
			//ctx.drawImage(tilesetImage, this.tileX, this.tileY, this.width, this.height, this.screenX, this.screenY, this.width, this.height);
			ctx.restore();
			
			ctx.save();
			let left = -1 * Math.abs(scenario.getHeroProp().body["offsetL"]);
			let top = -1 * Math.abs(scenario.getHeroProp().body["offsetT"]);			
			let bodyWidth = Math.abs(scenario.getHeroProp().body["offsetL"]) + Math.abs(scenario.getHeroProp().body["offsetR"]);
			let bodyHeight = Math.abs(scenario.getHeroProp().body["offsetT"]) + Math.abs(scenario.getHeroProp().body["offsetB"]);
			
			ctx.translate(left, top);
			ctx.fillRect(this.screenX, this.screenY, bodyWidth, bodyHeight);
			ctx.restore();			
		}
		
		fnCollision(delta, dirX, dirY, scenario) {
			let oldX = this.x;
			let oldY = this.y;
			//let newX = this.x + dirX * this.SPEED * delta;
			//let newY = this.y + dirY * this.SPEED * delta;
			let deltaX = dirX * this.SPEED * delta;
			let deltaY = dirY * this.SPEED * delta;
			
			let left = oldX + scenario.getHeroProp().body["offsetL"];
			let right = oldX + scenario.getHeroProp().body["offsetR"];
			let top = oldY + scenario.getHeroProp().body["offsetT"];
			let bottom = oldY + scenario.getHeroProp().body["offsetB"];
			
			if (scenario.getTile(left + deltaX, top) != 1
				&& scenario.getTile(left + deltaX, bottom) != 1
				&& scenario.getTile(right + deltaX, top) != 1
				&& scenario.getTile(right + deltaX, bottom) != 1)
			{
				this.x += deltaX;
				// to-do : set x to tile's max / min

			}
			if (scenario.getTile(left, top + deltaY) != 1
				&& scenario.getTile(left, bottom + deltaY) != 1
				&& scenario.getTile(right, top + deltaY) != 1
				&& scenario.getTile(right, bottom + deltaY) != 1)
			{
				this.y += deltaY;
				// to-do : set y to tile's max / min
			}
			
			
		}
	}
	
	class Scenario {
		constructor(jsonInfo, displayTileSize) {
			this.jsonInfo = jsonInfo;
			this.currentIdx = 1;
			this.mapAssoc = [];
			this.displayTileSize = displayTileSize;
			this.mapAssoc = this._initAssocition(this.jsonInfo.map);
		}
		isHit(postX, postY) {
			let ix = this.getIndex(postX);
			let iy = this.getIndex(postY);
			let min = Math.floor(this.displayTileSize / 2) - 6;
			let max = Math.floor(this.displayTileSize / 2) + 6;
			
			let x = postX - this.getTileMin(ix);
			let y = postY - this.getTileMin(iy);
			
			if (x >= min && x <= max)
				if (y >= min && y <= max)
					return true;
				
			return false;
			//for(let y in this.getCurrentMap().baseLayer) {
			//	for(let x in this.getCurrentMap().baseLayer[y]) {
			//		if (this.getCurrentMap().baseLayer[y][x] != 0 && this.getCurrentMap().baseLayer[y][x] != 1) {
			//			
			//			result.x = this.getTileMin(x) + this.displayTileSize / 2;
			//			result.y = this.getTileMin(y) + this.displayTileSize / 2;
			//		}
			//	}
			//}
		}
		getInitPost(doorID) {
			let result = { x : 100, y : 100 }
			for(let y in this.getCurrentMap().baseLayer) {
				for(let x in this.getCurrentMap().baseLayer[y]) {
					if (this.getCurrentMap().baseLayer[y][x] == doorID) {
						result.x = this.getTileMin(x) + this.displayTileSize / 2;
						result.y = this.getTileMin(y) + this.displayTileSize / 2;
					}
				}
			}
			return result;
		}
		getHeroProp() {
			return this.jsonInfo.hero;
		}
		getImage(key) {
			return this.jsonInfo.image.find(x => x.id == key);
		}
		getCurrentMap() {
			return this.jsonInfo.map.find(x => x.id == this.currentIdx);
		}		
		getWidth() {
			return this.getCurrentMap().baseLayer[0].length * this.displayTileSize;
		}
		getHeight() {
			return this.getCurrentMap().baseLayer.length * this.displayTileSize;
		}		
		getTileMin(i) {
			return i * this.displayTileSize;
		}
		getTileMax(i) {
			return ((i + 1) * this.displayTileSize) - 1;
		}		
		getIndex(pt){
			return Math.floor(pt / this.displayTileSize);
		}
		getTile(ptX, ptY) {
			let result = 1;
			let iX = this.getIndex(ptX, this.displayTileSize);
			let iY = this.getIndex(ptY, this.displayTileSize);
			if (iY < this.getCurrentMap().baseLayer.length)
				if (iX < this.getCurrentMap().baseLayer[iY].length)
					return this.getCurrentMap().baseLayer[iY][iX];
			return result;			
		}		
		setCurrentMap(id) {
			this.currentIdx = id;
		}
		switchMap(doorId) {
			this.currentIdx = this._getMapID(doorId, this.currentIdx, this.mapAssoc);
		}
		_getMapID(doorID, currentMapID, mapAssoc) {
			for(var i = 0; i< mapAssoc.length; i++) {
				if (mapAssoc[i].door == doorID && mapAssoc[i].id != currentMapID) {
					// change map
					return mapAssoc[i].id;
				}
			}
			return 0;
		}
		_initAssocition(mapArray) {
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
	}
	
	
	var Game = {}
	//Game.displayTileSize = 64;
	Game.camera = null;
	Game.hero = null;
	Game.scenario = null;
	Game._previousElapsed = 0;
	
	Game.init = function() {
		Core.loadBytes("leve1.json", function(bytes){		
			let jsonInfo = Core.byteToJson(bytes);			
			Game.scenario = new Scenario(jsonInfo, Core.displayTileSize);
			
			Controller.initEventListener();
			Core.initCtx();
			
			let p = [];
			for(var i in jsonInfo.image) {
				p.push(Core.loadImage(jsonInfo.image[i].id, jsonInfo.image[i].src));
			}
			Promise.all(p).then(function (loaded) {		
				Game.camera = new Camera(Core.getCanvas());
				
				let heroProp = Game.scenario.getHeroProp();
				Game.hero = new Hero(heroProp.tileSizeWidth, heroProp.tileSizeHeight, Core.getImages("hero"));
				Game.hero.displayTileWidth = heroProp.displayTileWidth;
				Game.hero.displayTileHeight = heroProp.displayTileHeight;
				let post = Game.scenario.getInitPost(-1);
				//console.log(post);
				Game.hero.currentTileNo = -1;
				Game.hero.x = post.x;
				Game.hero.y = post.y;
				Game.camera.fnFollow(Game.hero);
				Game.camera.fnUpdate(Game.scenario);
				//Game.render();
				window.requestAnimationFrame(Game.tick);
			});
			
		});
	}
	
	Game.tick = function(elapsed) {
		window.requestAnimationFrame(Game.tick);
        
		// clear previous frame
		//this.ctx.clearRect(0, 0, 512, 512);
        
		// compute delta time in seconds -- also cap it
		var delta = (elapsed - Game._previousElapsed) / 1000.0;
		delta = Math.min(delta, 0.25); // maximum delta of 250 ms
		Game._previousElapsed = elapsed;
        
		Game.update(delta);
		Game.render();
	};
	Game.update = function(delta) {
		var sts = JSON.parse(JSON.stringify(Controller.getStatus()));
		let dirX = 0;
		let dirY = 0;
		for(var key in sts) {
			if (key == "Left" && sts[key].value)
				dirX = -1;
			if (key == "Right" && sts[key].value)
				dirX = 1;
			if (key == "Up" && sts[key].value)
				dirY = -1;
			if (key == "Down" && sts[key].value)
				dirY = 1;
		}
		this.hero.fnMove(delta, dirX, dirY, this.scenario);
		
		let tileNo = this.scenario.getTile(this.hero.x, this.hero.y)
		if (tileNo != this.hero.currentTileNo) {
			if (this.scenario.isHit(this.hero.x, this.hero.y)	
				&& tileNo > 1)
				this.UpdateMap(tileNo);
			else
				this.hero.currentTileNo = -1;
		}
		else{			
		}
		
		this.camera.fnUpdate(this.scenario);
	}
	
	Game.UpdateMap = function(doorID) {
		this.scenario.switchMap(doorID);
		let post = this.scenario.getInitPost(doorID);
		//console.log(post);
		this.hero.currentTileNo = doorID;
		this.hero.x = post.x;
		this.hero.y = post.y;
		this.camera.fnFollow(this.hero);		
	}
	Game.render = function() {	
		Core.ctx.clearRect(0, 0, Core.getCanvas().width, Core.getCanvas().height);
		this.renderMap2(Core.ctx);
		this.hero.fnDraw(Core.ctx, this.scenario);
		//Core.ctx.fillRect(this.hero.screenX - (this.hero.width / 2), this.hero.screenY - (this.hero.height / 2), this.hero.width, this.hero.height);
		
		//myReq = requestAnimationFrame(() => renderLoop(1000, Game.update, fnStdAction, fnFinishAction));
		//Core.ctx.drawImage(
		//	this.hero.img, 
		//	this.hero.screenX - this.hero.width / 2,
		//	this.hero.screenY - this.hero.height / 2,
		//	0,0,19,10
		//	
		//);
	}
	Game.renderMap2 = function(ctx) {
		let layerArray = this.scenario.getCurrentMap().layer1;
		let tilesetImage = Core.getImages(this.scenario.getCurrentMap().texture || "map");
		let imageNumTiles = this.scenario.jsonInfo.imageNumTiles;
		let tileSize = this.scenario.jsonInfo.tileSize;
		let displayTileSize = this.scenario.displayTileSize;
		
		let ixStart = Math.floor(this.camera.x / displayTileSize);
		let ixEnd = Math.ceil((this.camera.x + this.camera.fnGetWidth()) / displayTileSize);
		ixEnd = Math.min(ixEnd, this.scenario.getCurrentMap().baseLayer[0].length);
		let iyStart = Math.floor(this.camera.y / displayTileSize);
		let iyEnd = Math.ceil((this.camera.y + this.camera.fnGetHeight()) / displayTileSize);
		iyEnd = Math.min(iyEnd, this.scenario.getCurrentMap().baseLayer.length);
		let xOffset = this.camera.x - (ixStart * displayTileSize);
		let yOffset = this.camera.y - (iyStart * displayTileSize);
		
		for(var y = iyStart; y < iyEnd; y++) {
			for(var x = ixStart; x < ixEnd; x++) {
				if (layerArray[y][x] != 0)
				{
					var tile = layerArray[y][x];
					var tileRow = Math.floor(tile / imageNumTiles) | 0;
					var tileCol = Math.floor(tile % imageNumTiles) | 0;
					//ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (x * tileSize), (y * tileSize), tileSize, tileSize);      
					ctx.drawImage(
						tilesetImage
						, (tileCol * tileSize), (tileRow * tileSize)
						, tileSize, tileSize
						, ((x - ixStart) * displayTileSize) - xOffset, ((y - iyStart) * displayTileSize) - yOffset
						, displayTileSize, displayTileSize
					);   
				}
			}
		}
				
		
	}
	//Game.renderMap = function(ctx, displayTileSize) {
	//	let layerArray = this.scenario.getCurrentMap().baseLayer;
	//	let tilesetImage = Core.getImages("map");
	//	let imageNumTiles = this.scenario.jsonInfo.imageNumTiles;
	//	let tileSize = this.scenario.jsonInfo.tileSize;
	//	displayTileSize = displayTileSize || tileSize;
	//	for (var y = 0; y < layerArray.length; y++)
	//		for (var x = 0; x < layerArray[y].length; x++)
	//			if (layerArray[y][x] != 0)
	//			{
	//				var tile = layerArray[y][x];
	//				var tileRow = Math.floor(tile / imageNumTiles) | 0;
	//				var tileCol = Math.floor(tile % imageNumTiles) | 0;
	//				//ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (x * tileSize), (y * tileSize), tileSize, tileSize);      
	//				ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (x * displayTileSize), (y * displayTileSize), displayTileSize, displayTileSize);      
	//				//ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
	//			}
	//}
