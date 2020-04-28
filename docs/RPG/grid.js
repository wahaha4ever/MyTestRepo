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
	Core.initCtx = function() {
		let canvas = document.getElementById("myCanvas");
		canvas.width = Core.width;//window.innerWidth;
		canvas.height = Core.height;//window.innerHeight;
		this.ctx = canvas.getContext("2d");
	}
	Core.width = 512;
	Core.height = 512
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
		constructor (width, height, displayTileSize) {
			this.displayTileSize = displayTileSize;
			this.width = width;
			this.height = height;
			this.x = 0;
			this.y = 0;
			this.following = null
		}
		fnFollow(sprite) {
			this.following = sprite;
			this.following.screenX = 0;
			this.following.screenY = 0;
		}
		fnUpdate(scenario) {
			let maxX = scenario.getWidth(this.displayTileSize) - this.width;
			let maxY = scenario.getHeight(this.displayTileSize) - this.height;
			// assume followed sprite should be placed at the center of the screen
			// whenever possible
			this.following.screenX = this.width / 2;
			this.following.screenY = this.height / 2;

			// make the camera follow the sprite
			this.x = this.following.x - this.width / 2;
			this.y = this.following.y - this.height / 2;
			// clamp values
			this.x = Math.max(0, Math.min(this.x, maxX));
			this.y = Math.max(0, Math.min(this.y, maxY));

			// in map corners, the sprite cannot be placed in the center of the screen
			// and we have to change its screen coordinates

			// left and right sides
			if (this.following.x < this.width / 2 ||
				this.following.x > maxX + this.width / 2) {
				this.following.screenX = this.following.x - this.x;
			}
			// top and bottom sides
			if (this.following.y < this.height / 2 ||
				this.following.y > maxY + this.height / 2) {
				this.following.screenY = this.following.y - this.y;
			}
		}
	}
	class Hero {
		
		constructor (width, height, displayTileSize, img) {
			this.displayTileSize = displayTileSize
			this.x = 0;
			this.y = 0;
			this.SPEED = 100;
			this.width = width;
			this.height = height;
			this.img = img;			
		}
		
		fnMove(delta, dirX, dirY, scenario){
			//this.x += dirX * this.SPEED * delta;
			//this.y += dirY * this.SPEED * delta;
			
			this.fnCollision(delta, dirX, dirY, scenario);
			
			let maxX = scenario.getWidth(this.displayTileSize);
			let maxY = scenario.getHeight(this.displayTileSize);
			
			this.x = Math.max(0, Math.min(this.x, maxX));
			this.y = Math.max(0, Math.min(this.y, maxY));
		}
		fnDraw(ctx, scenario) {
			//ctx.fillRect(this.screenX - (this.width / 2), this.screenY - (this.height / 2), this.width, this.height);
			let tilesetImage = Core.getImages("hero");
			
			ctx.save();
			ctx.translate(-1 * this.width / 2, -1 * this.height / 2);
			ctx.drawImage(tilesetImage, 0, 0, this.width, this.height, this.screenX, this.screenY, this.width, this.height);
			ctx.restore();
			
			ctx.save();
			let left = -1 * Math.abs(scenario.getHeroProp().body["offsetL"]);
			let top = -1 * Math.abs(scenario.getHeroProp().body["offsetT"]);			
			let bodyWidth = Math.abs(scenario.getHeroProp().body["offsetL"]) + Math.abs(scenario.getHeroProp().body["offsetR"]);
			let bodyHeight = Math.abs(scenario.getHeroProp().body["offsetT"]) + Math.abs(scenario.getHeroProp().body["offsetB"]);
			
			ctx.translate(left, top);
			ctx.fillRect(this.screenX, this.screenY, bodyWidth, bodyHeight);
			ctx.restore();
			//let left = this.screenX + scenario.getHeroProp().body["offsetL"];
			//let top = this.screenY + scenario.getHeroProp().body["offsetT"];			
			//let bodyWidth = Math.abs(scenario.getHeroProp().body["offsetL"]) + Math.abs(scenario.getHeroProp().body["offsetR"]);
			//let bodyHeight = Math.abs(scenario.getHeroProp().body["offsetT"]) + Math.abs(scenario.getHeroProp().body["offsetB"]);
			//
			//let tilesetImage = Core.getImages("hero");
			//
			//ctx.save();
			////ctx.translate(-1 * this.width / 2, -1 * this.height / 2);
			//ctx.drawImage(tilesetImage, 0, 0, this.width, this.height, this.screenX, this.screenY, this.width, this.height);
			//
			//ctx.fillRect(this.screenX, this.screenY, 10, 10);
			//
			////ctx.beginPath();
			////ctx.lineWidth = "1";
			////ctx.strokeStyle = "black";
			//////ctx.rect(left, top, bodyWidth, bodyHeight);
			////ctx.rect(this.screenX, this.screenY, bodyWidth, bodyHeight);
			////ctx.stroke();
			//ctx.restore();
			
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
			
			if (scenario.getTile(left + deltaX, top, this.displayTileSize) != 1
				&& scenario.getTile(left + deltaX, bottom, this.displayTileSize) != 1
				&& scenario.getTile(right + deltaX, top, this.displayTileSize) != 1
				&& scenario.getTile(right + deltaX, bottom, this.displayTileSize) != 1)
			{
				this.x += deltaX;
				// to-do : set x to tile's max / min

			}
			if (scenario.getTile(left, top + deltaY, this.displayTileSize) != 1
				&& scenario.getTile(left, bottom + deltaY, this.displayTileSize) != 1
				&& scenario.getTile(right, top + deltaY, this.displayTileSize) != 1
				&& scenario.getTile(right, bottom + deltaY, this.displayTileSize) != 1)
			{
				this.y += deltaY;
				// to-do : set y to tile's max / min
			}
			
			
			
			//if (scenario.getTile(oldX + deltaX, oldY, this.displayTileSize) != 1)
			//	this.x += deltaX;
			//if (scenario.getTile(oldX, oldY + deltaY, this.displayTileSize) != 1)
			//	this.y += deltaY;
		}
	}
	
	class Scenario {
		constructor(jsonInfo) {
			this.jsonInfo = jsonInfo;
			this.currentIdx = 1;
			this.mapAssoc = [];
			
			this.mapAssoc = this._initAssocition(this.jsonInfo.map);
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
		getWidth(displayTileSize) {
			displayTileSize = displayTileSize || this.jsonInfo.tileSize;
			return this.getCurrentMap().baseLayer.length * displayTileSize;
		}
		getHeight(displayTileSize) {
			displayTileSize = displayTileSize || this.tileSize;
			return this.getCurrentMap().baseLayer[0].length * displayTileSize;
		}		
		getTileMin(ix, displayTileSize) {
			return ix * displayTileSize;
		}
		getTileMax(ix, displayTileSize) {
			return ((ix + 1) * displayTileSize) - 1;
		}		
		getIndex(pt, displayTileSize){
			return Math.floor(pt / displayTileSize);
		}
		getTile(ptX, ptY, displayTileSize) {
			let iX = this.getIndex(ptX, displayTileSize);
			let iY = this.getIndex(ptY, displayTileSize);
			return this.getCurrentMap().baseLayer[iY][iX];
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
	Game.displayTileSize = 128;
	Game.camera = null;
	Game.hero = null;
	Game.scenario = null;
	Game._previousElapsed = 0;
	
	Game.init = function() {
		Core.loadBytes("leve1.json", function(bytes){
			//Game.jsonInfo = Core.byteToJson(bytes);
			//Game.jsonInfo.currentIdx = 0;
			//Game.jsonInfo.getCurrentMap = function() {
			//	return this.map.find(x => x.id == this.currentIdx);
			//};
			//Game.jsonInfo.getWidth = function(displayTileSize) {
			//	displayTileSize = displayTileSize || this.tileSize;
			//	return this.getCurrentMap().baseLayer.length * displayTileSize;
			//};
			//Game.jsonInfo.getHeight = function(displayTileSize) {
			//	displayTileSize = displayTileSize || this.tileSize;
			//	return this.getCurrentMap().baseLayer[0].length * displayTileSize;
			//};			
			let jsonInfo = Core.byteToJson(bytes);			
			Game.scenario = new Scenario(jsonInfo);
			
			Controller.initEventListener();
			Core.initCtx();
			
			let p = [];
			for(var i in jsonInfo.image) {
				p.push(Core.loadImage(jsonInfo.image[i].id, jsonInfo.image[i].src));
			}
			//p.push(Core.loadImage("map", Game.scenario.getImage()));
			//p.push(Core.loadImage("hero", Game.scenario.getImage()));
			Promise.all(p).then(function (loaded) {		
				Game.camera = new Camera(Core.width, Core.height, Game.displayTileSize);
				Game.hero = new Hero(16, 16, Game.displayTileSize, Core.getImages("hero"));
				Game.hero.x = 200;
				Game.hero.y = 200;
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
		this.camera.fnUpdate(this.scenario);
	}
	Game.render = function() {	
		this.renderMap2(Core.ctx, this.displayTileSize);
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
	Game.renderMap2 = function(ctx, displayTileSize) {
		let layerArray = this.scenario.getCurrentMap().layer1;
		let tilesetImage = Core.getImages("map");
		let imageNumTiles = this.scenario.jsonInfo.imageNumTiles;
		let tileSize = this.scenario.jsonInfo.tileSize;
		displayTileSize = displayTileSize || tileSize;
		
		let ixStart = Math.floor(this.camera.x / displayTileSize);
		let ixEnd = Math.ceil((this.camera.x + this.camera.width) / displayTileSize);		
		let iyStart = Math.floor(this.camera.y / displayTileSize);
		let iyEnd = Math.ceil((this.camera.y + this.camera.height) / displayTileSize);
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
	Game.renderMap = function(ctx, displayTileSize) {
		let layerArray = this.scenario.getCurrentMap().baseLayer;
		let tilesetImage = Core.getImages("map");
		let imageNumTiles = this.scenario.jsonInfo.imageNumTiles;
		let tileSize = this.scenario.jsonInfo.tileSize;
		displayTileSize = displayTileSize || tileSize;
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
