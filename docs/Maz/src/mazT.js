import * as THREE from 'https://unpkg.com/three@0.120.0/build/three.module.js';
//import { OrbitControls } from 'https://unpkg.com/three@0.120.0/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.120.0/examples/jsm/controls/PointerLockControls.js';
import Stats from 'https://unpkg.com/three@0.120.0/examples/jsm/libs/stats.module.js';
import { TouchPad } from './lib/TouchPad.js';
import { ButtonPad } from './lib/ButtonPad.js';
//https://sbcode.net/threejs/pointerlock-controls/
//http://mese79.github.io/TouchControls/
//http://touchcontrols.kissr.com/
//https://stackoverflow.com/questions/18546875/three-js-pointerlock-and-collision-detection
//http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/

var stats;
var camera, scene, renderer, controls;
var cameraPrivotX, cameraPrivotY;

var isTouchDevice = false;
//var cameraMove = {
//	x : 0,
//	y : 0
//}
var objects = [];
var raycasterY, raycasterXZ;
var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();

var controls = null;
var touchPad = null;
var buttonPad = null; 

var gSpeedFactor = 400;
var gRotationFactor = 0.05;
var ASSETS_PATH = 'lib/assets/models/';
var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {

	console.log( item, loaded, total );

};

var map = new Array(10);
for (var i = 0; i < 10; i++) {
	map[i] = [];
}
map[0].push( "1", "E", "1", "1", "1", "1", "1", "1", "1", "1" );
map[1].push( "1", "0", "1", "0", "0", "0", "0", "0", "0", "1" );
map[2].push( "1", "0", "1", "0", "1", "1", "1", "1", "0", "1" );
map[3].push( "1", "0", "1", "0", "0", "0", "0", "1", "0", "1" );
map[4].push( "1", "0", "1", "0", "1", "1", "9", "1", "0", "1" );
map[5].push( "1", "0", "1", "0", "1", "1", "1", "1", "0", "1" );
map[6].push( "1", "0", "1", "0", "1", "0", "0", "0", "0", "1" );
map[7].push( "1", "0", "1", "0", "1", "0", "1", "1", "1", "1" );
map[8].push( "1", "0", "0", "0", "1", "0", "0", "0", "0", "1" );
map[9].push( "1", "1", "1", "1", "1", "1", "1", "1", "S", "1" );

init();
animate();

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}		


function initTouchControl() {
	touchPad = new TouchPad("touchPad", document);
	buttonPad = new ButtonPad();
	buttonPad.init("L", true, "A", "B", "X", "Y");
}

function initKey(){
	
	var onKeyDown = function ( event ) {
		
		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; 
				break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;

			case 32: // space
				if ( canJump === true ) velocity.y += 350;
				canJump = false;
				break;

		}

	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
}
			
function writeInfo(txt){
	if (txt != "")
		document.getElementById("info").innerHTML = document.getElementById("info").innerHTML + txt;
	else
		document.getElementById("info").innerHTML = txt;
}

function initFloor(){
	var floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
	floorGeometry.rotateX( - Math.PI / 2 );

	for ( var i = 0, l = floorGeometry.vertices.length; i < l; i ++ ) {
	
		var vertex = floorGeometry.vertices[ i ];
		vertex.x += Math.random() * 20 - 10;
		vertex.y += Math.random() * 2;
		vertex.z += Math.random() * 20 - 10;
	
	}
	
	for ( var i = 0, l = floorGeometry.faces.length; i < l; i ++ ) {
	
		var face = floorGeometry.faces[ i ];
		face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	
	}

	var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );

	var floor = new THREE.Mesh( floorGeometry, floorMaterial );
	//scene.add( floor );
	return floor;
}

function initBoxArray() {
	let boxArray = [];
	//let mario = initMtlObj("mario-sculpture");
	let boxSize = 40
	var boxGeometry = new THREE.BoxGeometry( boxSize, boxSize, boxSize );
	var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
	var planeGeometry = new THREE.BoxGeometry(boxSize, 2, boxSize);
	
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++)	{
			var box = null;
			if (map[i][j] == "1") {
				for ( var f = 0, l = boxGeometry.faces.length; f < l; f ++ ) {
					var face = boxGeometry.faces[ f ];
					face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				}				
				box = new THREE.Mesh( boxGeometry, boxMaterial.clone() );
				box.position.y = Math.floor(boxSize / 2);
				box.position.x = (j - (map[i].length / 2)) * boxSize;				
				box.position.z = (i - (map.length / 2)) * boxSize - (boxSize * map.length);
				boxArray.push( box );
			}
			else if (map[i][j] == "S") {
				if (isTouchDevice) {
					cameraPrivotY.position.x = (j - (map[i].length / 2)) * boxSize;				
					cameraPrivotY.position.y = 10;
					cameraPrivotY.position.z = (i - (map.length / 2)) * boxSize - (boxSize * map.length);
				} else {
					controls.getObject().position.x = (j - (map[i].length / 2)) * boxSize;				
					controls.getObject().position.y = 10;
					controls.getObject().position.z = (i - (map.length / 2)) * boxSize - (boxSize * map.length);
				}
			}
			else if (map[i][j] == "E") {
				//initMtlObj("mario-sculpture", function(object) {
				//	object.position.x = (j - (map[i].length / 2)) * boxSize;
				//	object.position.y = 20;
				//	object.position.z = (i - (map.length / 2)) * boxSize - (boxSize * map.length);
				//			
				//	object.rotateY(Math.PI);
				//			
				//	object.scale.set(0.3, 0.3, 0.3);
				//	scene.add(object);
				//});
			}
			else if (map[i][j] == "0") {
				for ( var f = 0, l = planeGeometry.faces.length; f < l; f ++ ) {
					var face = planeGeometry.faces[ f ];
					face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
					face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
				}	
				box = new THREE.Mesh( planeGeometry, boxMaterial.clone() );
				box.position.y = boxSize - 1;
				box.position.x = (j - (map[i].length / 2)) * boxSize;				
				box.position.z = (i - (map.length / 2)) * boxSize - (boxSize * map.length);
				boxArray.push( box );
			}
		}
	}
	return boxArray;
	//let boxArray = [];
	//var boxGeometry = new THREE.BoxGeometry( 20, 20, 20 );
    //
	//for ( var i = 0, l = boxGeometry.faces.length; i < l; i ++ ) {
    //
	//	var face = boxGeometry.faces[ i ];
	//	face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	//	face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
	//	face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    //
	//}
    //
	//for ( var i = 0; i < 500; i ++ ) {
    //
	//	var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );
	//	boxMaterial.color.setHSL( Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    //
	//	var box = new THREE.Mesh( boxGeometry, boxMaterial );
	//	box.position.x = Math.floor( Math.random() * 20 - 10 ) * 20;
	//	box.position.y = Math.floor( Math.random() * 20 ) * 20 + 10;
	//	box.position.z = Math.floor( Math.random() * 20 - 10 ) * 20;
    //
	//	//scene.add( box );
	//	//objects.push( box );
	//	boxArray.push( box );
	//}	
	//return boxArray;
}

//function initMtlObj(name, fnAfterLoad) {
//	var promises = [];
//	promises.push(new Promise( function (resolve, reject) {
//		var onProgress = function ( xhr ) {
//			if ( xhr.lengthComputable ) {
//				var percentComplete = xhr.loaded / xhr.total * 100;
//				console.log( Math.round(percentComplete, 2) + '% downloaded' );
//			}
//		};
//			
//		var onError = function ( xhr ) { };		
//
//		var mtlLoader = new THREE.MTLLoader(manager);
//		mtlLoader.setPath(ASSETS_PATH);
//		mtlLoader.load(name + '.mtl', function (materials) {
//			
//			materials.preload();
//			
//			var objLoader = new THREE.OBJLoader(manager);		
//			objLoader.setMaterials(materials);
//			objLoader.setPath(ASSETS_PATH);
//			objLoader.load(name + '.obj', function (object) {			
//				fnAfterLoad(object);
//				resolve( object );
//			}, onProgress, onError );
//		});
//	}));
//	
//	Promise.all(promises).then( 
//		function (arrayOfObjects) {
//			//objGrp.add( arrayOfObjects[0] );
//			return arrayOfObjects[0];
//			//scene.add( arrayOfObjects[0] );
//		}, 
//		function (error)  {
//			console.error( "Could not load all textures:", error );			
//		}
//	);
//}
//
//function initMario() {
//	
//	var onProgress = function ( xhr ) {
//		if ( xhr.lengthComputable ) {
//			var percentComplete = xhr.loaded / xhr.total * 100;
//			console.log( Math.round(percentComplete, 2) + '% downloaded' );
//		}
//	};
//	
//	var onError = function ( xhr ) { };
//	
//	var mtlLoader = new THREE.MTLLoader();
//	mtlLoader.setPath('lib/assets/models/');
//	mtlLoader.load('mario-sculpture.mtl', function (materials) {
//		
//		materials.preload();
//		
//		var objLoader = new THREE.OBJLoader();		
//		objLoader.setMaterials(materials);
//		objLoader.setPath('lib/assets/models/');
//		objLoader.load('mario-sculpture.obj', function (object) {			
//			object.position.y = 95;
//			object.position.z = 0;
//			object.position.x = 0;
//			scene.add( object );
//			
//		}, onProgress, onError );
//	});
//}
//    //添加?理的方法
//    function setRandomColors(object, scale) {
//        //?取children??
//        var children = object.children;
//
//        //如果?前模型有子元素，?遍?子元素
//        if (children && children.length > 0) {
//            children.forEach(function (e) {
//                setRandomColors(e, scale)
//            });
//        }
//        else {
//            if (object instanceof THREE.Mesh) {
//                //如果?前的模型是??，??置固定的?色，并且透明化
//                if(Array.isArray(object.material)){
//                    for(var i = 0; i<object.material.length; i++){
//                        var material = object.material[i];
//                        var color = scale(Math.random()).hex();
//                        if (material.name.indexOf("building") === 0) {
//                            material.color = new THREE.Color(color);
//                            material.transparent = true;
//                            material.opacity = 0.7;
//                            material.depthWrite = false;
//                        }
//                    }
//                }
//                // 如果不是?景?，???前mesh添加?理
//                else{
//                    //?机?前模型的?色
//                    object.material.color = new THREE.Color(scale(Math.random()).hex());
//                }
//            }
//        }
//    }
	
function initCamera(x, y, z) {
	let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.x = x;
	camera.position.y = y;
	camera.position.z = z;
	return camera;
}

function initCameraPivot(camera) {
	let privot = new THREE.Object3D();
	privot.add(camera);
	return privot;
}

function initPointerLockControls(camera, dom) {
    //controls = new THREE.PointerLockControls( camera );
	let controls = new PointerLockControls( camera, dom );
	
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	blocker.style.display = 'block';
	instructions.style.display = '';

	instructions.addEventListener( 'click', function () {
		controls.lock();
	}, false );

	controls.addEventListener( 'lock', function () {
		instructions.style.display = 'none';
		blocker.style.display = 'none';
	} );

	controls.addEventListener( 'unlock', function () {
		blocker.style.display = 'block';
		instructions.style.display = '';
	} );

	return controls;
}

function init() {
	if(window.matchMedia("(pointer: coarse)").matches) {
		isTouchDevice = true;
	}
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );

	//camera = initCamera(0, 100, 0);
	camera = initCamera(0, 0, 0);

	if (isTouchDevice) {		
		cameraPrivotX = initCameraPivot(camera);
		cameraPrivotY = initCameraPivot(cameraPrivotX);
		scene.add(cameraPrivotY);

		initTouchControl();
	}
	else {
		controls = initPointerLockControls(camera, document.body);
		scene.add( controls.getObject() );
		
		// init key
		initKey();
	}
	
	var axes = new THREE.AxesHelper( 1000 );
	scene.add( axes );

	raycasterY = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	raycasterXZ = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(), 0, 10 );

	// floor
	let floor = initFloor();
	scene.add( floor );

	// objects
	let boxArray = initBoxArray();
	for(let i=0; i<boxArray.length; i++)
	{
		let box = boxArray[i];
		scene.add( box );
		objects.push( box );
	}
	
	//initMario();
	
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	stats = new Stats();
	stats.showPanel( 0 );
	document.body.appendChild( stats.dom );

	window.addEventListener( 'resize', onWindowResize, false );

}

function detectCollisionY(raycasterY, movingDirection, cameraPosition, objects) {

	let pDir = movingDirection.clone();
	pDir.multiply(new THREE.Vector3(0, 1, 0))
	pDir.normalize();
	
	let pPos = cameraPosition.clone();
	if (pDir.y > 0)
		pPos.y += 10;
	else
		pPos.y -= 10;
	raycasterY.set( pPos, pDir);
	var result = raycasterY.intersectObjects( objects );
	return result;

	//raycasterY.ray.origin.copy( cameraPosition );
	//raycasterY.ray.origin.y -= 10;	
	//return raycasterY.intersectObjects( objects );
}

function detectCollisionXZ(raycasterXZ, movingDirection, cameraPosition, cameraLookAt, objects) {
	// collision detection
	// modified from https://blog.csdn.net/qq_30100043/article/details/79796285
	//let rotation = controls.getDirection(new THREE.Vector3(0, 0, 0)).multiply(new THREE.Vector3(1, 0, 1));
	//let rotation = controls.getObject().getWorldDirection(vWorld).multiply(new THREE.Vector3(-1, 0, -1));
	let pDir = cameraLookAt.clone();	
	pDir.multiply(new THREE.Vector3(-1, 0, -1));
	//writeInfo(rotation.x +","+rotation.y+","+rotation.z);
	var m = new THREE.Matrix4();
	if(movingDirection.z < 0){
		if(movingDirection.x > 0){
			m.makeRotationY(Math.PI/4);
		}
		else if(movingDirection.x < 0){
			m.makeRotationY(-Math.PI/4);
		}
		else{
			m.makeRotationY(0);
		}
	}
	else if(movingDirection.z > 0){
		if(movingDirection.x > 0){
			m.makeRotationY(Math.PI/4*3);
		}
		else if(movingDirection.x < 0){
			m.makeRotationY(-Math.PI/4*3);
		}
		else{
			m.makeRotationY(Math.PI);
		}
	}
	else{
		if(movingDirection.x > 0){
			m.makeRotationY(Math.PI/2);
		}
		else if(movingDirection.x < 0){
			m.makeRotationY(-Math.PI/2);
		}
	}			
	pDir.applyMatrix4(m)
	raycasterXZ.set( cameraPosition , pDir );
	return raycasterXZ.intersectObjects( objects );
	//var xzOnObject = xzIntersections.length > 0;
}

//function detectCollisionXZ(raycasterXZ, controls, objects) {
//	// collision detection
//	// modified from https://blog.csdn.net/qq_30100043/article/details/79796285
//	//let rotation = controls.getDirection(new THREE.Vector3(0, 0, 0)).multiply(new THREE.Vector3(1, 0, 1));
//	//let rotation = controls.getObject().getWorldDirection(vWorld).multiply(new THREE.Vector3(-1, 0, -1));
//	let pDir = new THREE.Vector3();
//	controls.getDirection(pDir).clone();
//	pDir.multiply(new THREE.Vector3(-1, 0, -1));
//	//writeInfo(rotation.x +","+rotation.y+","+rotation.z);
//	var m = new THREE.Matrix4();
//	if(direction.z < 0){
//		if(direction.x > 0){
//			m.makeRotationY(Math.PI/4);
//		}
//		else if(direction.x < 0){
//			m.makeRotationY(-Math.PI/4);
//		}
//		else{
//			m.makeRotationY(0);
//		}
//	}
//	else if(direction.z > 0){
//		if(direction.x > 0){
//			m.makeRotationY(Math.PI/4*3);
//		}
//		else if(direction.x < 0){
//			m.makeRotationY(-Math.PI/4*3);
//		}
//		else{
//			m.makeRotationY(Math.PI);
//		}
//	}
//	else{
//		if(direction.x > 0){
//			m.makeRotationY(Math.PI/2);
//		}
//		else if(direction.x < 0){
//			m.makeRotationY(-Math.PI/2);
//		}
//	}			
//	pDir.applyMatrix4(m)
//	raycasterXZ.set( controls.getObject().position , pDir );
//	return raycasterXZ.intersectObjects( objects );
//	//var xzOnObject = xzIntersections.length > 0;
//}

function animate() {

	requestAnimationFrame( animate );
	stats.begin();

	if (isTouchDevice) {
		let buttonSts = buttonPad.getStatus();
		if (buttonSts["left"])	
			moveLeft = true; 
		else 
			moveLeft = false;
		if (buttonSts["right"])	
			moveRight = true; 
		else 
			moveRight = false;
		if (buttonSts["up"])	
			moveForward = true; 
		else 
			moveForward = false;
		if (buttonSts["down"])	
			moveBackward = true; 
		else 
			moveBackward = false;
		if (buttonSts["A"]) {
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
		}
		if (buttonSts["B"]) {
			cameraPrivotX.rotation.x = 0;
		}


		let cameraMove = touchPad.getRotation();
		console.log(cameraMove.x);
		if (cameraMove.x > 0.5)
			cameraPrivotY.rotateY(-gRotationFactor);		// rotate left
		else if (cameraMove.x < -0.5)
			cameraPrivotY.rotateY(gRotationFactor);		// rotate right
	
		if (cameraMove.y != 0) {
			let r = 0;
			if (cameraMove.y > 0.5)
				r = gRotationFactor;
			else if (cameraMove.y < -0.5)
				r = -gRotationFactor;
			let degreeToRadian = 60 * Math.PI / 180;
			let rx = cameraPrivotX.rotation.x + r;
			rx = Math.max(-degreeToRadian, Math.min( degreeToRadian, rx ))
			cameraPrivotX.rotation.x = rx;
		}
		//if (cameraMove.y > 0) 
		//	cameraPrivotX.rotateX(0.01);		// rotate upward
		//else if (cameraMove.y < 0)
		//	cameraPrivotX.rotateX(-0.01);		// rotate downward
	}
	if (isTouchDevice || (!isTouchDevice && controls.isLocked === true)) {


		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;	//deceleration
		velocity.z -= velocity.z * 10.0 * delta;	//deceleration
		velocity.y -= 9.8 * 100.0 * delta; 			// 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions		

		let vLookAt = new THREE.Vector3();
		let vPosition = new THREE.Vector3();
		
		if (!isTouchDevice) {
			// collision detection			
			controls.getDirection(vLookAt).clone();
			vPosition = controls.getObject().position;
		}
		else {
			camera.getWorldDirection(vLookAt).clone();
			vPosition = cameraPrivotY.position;
		}

		// common
		let intersections = detectCollisionY(raycasterY, velocity, vPosition, objects);
		let onObject = intersections.length > 0;
		let xzIntersections = detectCollisionXZ(raycasterXZ, direction, vPosition, vLookAt, objects);
		let xzOnObject = xzIntersections.length > 0;
		if(!xzOnObject){
			if ( moveForward || moveBackward ) velocity.z -= direction.z * gSpeedFactor * delta;	//400.0 = acceleration
			if ( moveLeft || moveRight ) velocity.x -= direction.x * gSpeedFactor * delta;			//400.0 = acceleration
		}

		/*if ( onObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
			canJump = true;
		}*/

		if ( onObject === true ) {
			if (velocity.y <= 0)
				canJump = true;
			velocity.y = 0;//Math.max( 0, velocity.y );
		}

			
		if (!isTouchDevice) {
			controls.moveRight( - velocity.x * delta );
			controls.moveForward( - velocity.z * delta );
			controls.getObject().position.y += ( velocity.y * delta ); // new behavior	
			if ( controls.getObject().position.y < 10 ) {
				velocity.y = 0;
				controls.getObject().position.y = 10;
				canJump = true;
			}
		}
		else {
			cameraPrivotY.translateX( - velocity.x * delta );
			cameraPrivotY.translateZ( velocity.z * delta );
			cameraPrivotY.translateY( velocity.y * delta );
			if (cameraPrivotY.position.y < 10) {
				velocity.y = 0;
				cameraPrivotY.position.y = 10;
				canJump = true;
			}
		}
		
		prevTime = time;
	}
	renderer.render( scene, camera );
	stats.end();

}