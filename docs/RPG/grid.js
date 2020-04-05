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
		console.log(keyConfig);
	};

	var onKeyUp = function ( event ) {
		for(var key in keyConfig) { 					
			if (event.keyCode == keyConfig[key].code) {
				keyConfig[key].value = false;
			}
		};
		console.log(keyConfig);
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
			this.SPEED = 10;
			this.width = width;
			this.height = height;
			this.img = img;		
			
		}
		
		fnMove(delta, dirX, dirY, scenario){
			this.x += dirX * this.SPEED * delta;
			this.y += dirY * this.SPEED * delta;
			
			let maxX = scenario.getWidth(this.displayTileSize);
			let maxY = scenario.getHeight(this.displayTileSize);
			
			this.x = Math.max(0, Math.min(this.x, maxX));
			this.y = Math.max(0, Math.min(this.y, maxY));
		}
	}
	
	class Scenario {
		constructor(jsonInfo) {
			this.jsonInfo = jsonInfo;
			this.currentIdx = 1;
			this.mapAssoc = [];
			
			this.mapAssoc = this._initAssocition(this.jsonInfo.map);
		}
		getImage() {
			return this.jsonInfo.image;
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
			p.push(Core.loadImage("map", Game.scenario.getImage()));
			p.push(Core.loadImage("hero", Game.scenario.getImage()));
			Promise.all(p).then(function (loaded) {				
				Game.camera = new Camera(Core.width, Core.height, Game.displayTileSize);
				Game.hero = new Hero(16, 16, Game.displayTileSize, Core.getImages("hero"));
				Game.hero.x = 300;
				Game.hero.y = 300;
				Game.camera.fnFollow(Game.hero);
				Game.camera.fnUpdate(Game.scenario);
				Game.render();
				//window.requestAnimationFrame(Game.tick);
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
		var sts = Controller.getStatus();
		let dirX = 0;
		let dirY = 0;
		for(var key in sts) {
			if (key.type == "Left" && key.value)
				dirX = -1;
			if (key.type == "Right" && key.value)
				dirX = 1;
			if (key.type == "Up" && key.value)
				dirY = -1;
			if (key.type == "Down" && key.value)
				dirY = 1;
		}
		this.hero.fnMove(delta, dirX, dirY, this.scenario);
		this.camera.fnUpdate(this.scenario);
	}
	Game.render = function() {	
		this.renderMap2(Core.ctx, this.displayTileSize);
		Core.ctx.fillRect(this.hero.screenX - (this.hero.width / 2), this.hero.screenY - (this.hero.height / 2), this.hero.width, this.hero.height);
		
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
