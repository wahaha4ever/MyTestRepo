//'use strict';
import * as THREE from 'https://unpkg.com/three@0.120.0/build/three.module.js';
import { PointerLockControls } from 'https://unpkg.com/three@0.120.0/examples/jsm/controls/PointerLockControls.js';
//import { Container } from './AbsStructure.js';
import CoreLib from './lib/Core.js';
//import { internalClass } from './lib/Core.js';
import { KeyboardAdapter } from './lib/KeyboardAdapter.js';
import Stats from 'https://unpkg.com/three@0.120.0/examples/jsm/libs/stats.module.js';
//import {NameX} from './AbsStructure.js';
//let name = new NameX("AA");
//name.publicMethod();

//CoreLib.test2();
//console.log(CoreLib.test3());

//let c = new internalClass();
//c.test2();

var container = null;
var camera = null;
var scene = null;
var renderer = null;
var clock = new THREE.Clock();

/*
Private Variable
*/
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var raycasterY, raycasterXZ;	
var controls;
var keyboard;

var objects = [];
var gSpeedFactor = 600;
var gMaxJumpVelocity = 350;
var gMaxFallVelocity = -500;
var gPlayerDiff = 12;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveJump = false;
var canJump = false;



class Container {
    constructor(ctnrID) {
        this.cid = ctnrID
        this.ctnr = document.getElementById(ctnrID);
    }
    getWidth() {
        return this.ctnr == null ? window.innerWidth : this.ctnr.offsetWidth;
    }
    getHeight() {
        return this.ctnr == null ? window.innerHeight : this.ctnr.offsetHeight;
    }
    getCtnr() {
        return this.ctnr || document.body;
    }
}

container = new Container(null);
camera = initCamera(container.getWidth(), container.getHeight());
scene = initScene();
renderer = initRenderer(container.getWidth(), container.getHeight());

var ctnr = container.getCtnr();
ctnr.appendChild( renderer.domElement );
window.addEventListener( 'resize', onWindowResize, false );

init(scene, camera, renderer);
initKey();
animate();

function animate() {
	requestAnimationFrame( animate );	
	var delta = clock.getDelta();
	render(scene, camera, delta);

	if (camera) {
		renderer.render( scene, camera );
	}
}

	function initKey(){
		//keyboard here
		var initKeyTemplate1 = function() {		
			return {
				Fwd : { Code : 87, Value : false },
				Rvr : { Code : 83, Value : false },
				TurnLeft : { Code : 65, Value : false },
				TurnRight : { Code : 68, Value : false },
				SwitchCam : { Code : 49, Value : false },
				Jump : { Code : 32, Value : false },
				SpeedUp : { Code : 16, Value : false }
			}
		}		
		keyboard = new KeyboardAdapter();
		keyboard.init(1, initKeyTemplate1());
	}

	function onWindowResize(){
        let width = container.getWidth();
        let height = container.getHeight()
		if (camera) {
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}		
		renderer.setSize( width, height );
    }
	
	function initCamera(width, height) {		
		let camera = new THREE.PerspectiveCamera( 75, width / height, 1, 1000 );
		return camera;		
	}

	function initScene() {
		let scene = new THREE.Scene();
		//scene.background = new THREE.Color( 0x000000 );
		return scene;
	}

	function initRenderer(width, height) {
		let renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setSize( width, height );
		return renderer;
	}

	
	function init(scene, camera, renderer) {
		//scene.background = new THREE.Color( 0xffffff );
		//scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
		
		scene.background = new THREE.Color( 0xccddff );
		scene.fog = new THREE.Fog( 0xccddff, 0, 750 );

		var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
		//light.position.set( 0.5, 1, 0.75 );
		scene.add( light );
		
		controls = initPointerLock(camera, document.body);
		scene.add( controls.getObject() );
		
		var axes = new THREE.AxisHelper( 1000 );
		scene.add( axes );
		
		raycasterY = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
		raycasterXZ = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3(), 0, 10 );
		
		let pLv = CoreLib.getParameterByName("l") || "001";
		let level = "./Maze" + pLv + ".json";		
		CoreLib.loadBytes(level, function(bytes) {
			var mazeJson = CoreLib.byteToJson(bytes);
			//initMap(scene, jsonInfo.map, jsonInfo.texture, jsonInfo.codemap);
			
			// floor
			let floor = initFloor(mazeJson);
			scene.add( floor );
			
			// Maze			
			let boxArray = initMaze(mazeJson);
			for(let i=0; i<boxArray.length; i++)
			{
				let box = boxArray[i];
				scene.add( box );
				objects.push( box );
			}
			
			//var grid = new THREE.GridHelper( 30 , 30 );
			//scene.add( grid );
			
		});
		
		//CoreLib.Run();
	}
	
	function render(scene, camera, delta) {
		let k = keyboard.getResult();
		
		moveForward = k.Fwd.Value;
		moveBackward = k.Rvr.Value;
		moveLeft = k.TurnLeft.Value;
		moveRight = k.TurnRight.Value;
		moveJump = k.Jump.Value;
		if (k.SpeedUp.Value) {
			gSpeedFactor = 1000;
			gMaxJumpVelocity = 700;
		}
		else {
			gSpeedFactor = 600;
			gMaxJumpVelocity = 350;
		}
		updatePointerLock(scene, camera, delta);
	}
	
	
	
	
	

	
	
	/*
	Private Function
	*/	
	function initPointerLock(camera, dom){
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

	function detectCollisionY(raycasterY, controls, objects) {
		raycasterY.ray.origin.copy( controls.getObject().position );
		raycasterY.ray.origin.y -= 10;
		return raycasterY.intersectObjects( objects );
	}
	
	function detectCollisionXZ(raycasterXZ, controls, objects) {
		// collision detection
		// modified from https://blog.csdn.net/qq_30100043/article/details/79796285
		//let rotation = controls.getDirection(new THREE.Vector3(0, 0, 0)).multiply(new THREE.Vector3(1, 0, 1));
		//let rotation = controls.getObject().getWorldDirection(vWorld).multiply(new THREE.Vector3(-1, 0, -1));
		let pDir = new THREE.Vector3();
		controls.getDirection(pDir).clone();
		pDir.multiply(new THREE.Vector3(-1, 0, -1));
		//writeInfo(rotation.x +","+rotation.y+","+rotation.z);
		var m = new THREE.Matrix4();
		if(direction.z < 0){
			if(direction.x > 0){
				m.makeRotationY(Math.PI/4);
			}
			else if(direction.x < 0){
				m.makeRotationY(-Math.PI/4);
			}
			else{
				m.makeRotationY(0);
			}
		}
		else if(direction.z > 0){
			if(direction.x > 0){
				m.makeRotationY(Math.PI/4*3);
			}
			else if(direction.x < 0){
				m.makeRotationY(-Math.PI/4*3);
			}
			else{
				m.makeRotationY(Math.PI);
			}
		}
		else{
			if(direction.x > 0){
				m.makeRotationY(Math.PI/2);
			}
			else if(direction.x < 0){
				m.makeRotationY(-Math.PI/2);
			}
		}			
		pDir.applyMatrix4(m)
		raycasterXZ.set( controls.getObject().position , pDir );
		return raycasterXZ.intersectObjects( objects );
		//var xzOnObject = xzIntersections.length > 0;
	}
	
	function updatePointerLock(scene, camera, delta) {
		if ( controls.isLocked === true ) {
			if (moveJump){
				if (canJump) {
					velocity.y += gMaxJumpVelocity;
					canJump = false;
				}
			}

			velocity.x -= velocity.x * 10.0 * delta;	//deceleration
			velocity.z -= velocity.z * 10.0 * delta;	//deceleration
			velocity.y -= 9.8 * 100.0 * delta; 			// 100.0 = mass (??)
			if (velocity.y <= gMaxFallVelocity)
				velocity.y = gMaxFallVelocity;
			

			let dirY = Math.sign(velocity.y);
			if (dirY == 0)
				dirY = -1;
			let distY = velocity.y * delta;

			direction.z = Number( moveForward ) - Number( moveBackward );
			direction.x = Number( moveRight ) - Number( moveLeft );
			direction.normalize(); // this ensures consistent movements in all directions	

			// collision detection
			let intersections = detectCollisionY(raycasterY, controls, objects);
			let onObject = intersections.length > 0;
			let xzIntersections = detectCollisionXZ(raycasterXZ, controls, objects);
			let xzOnObject = xzIntersections.length > 0;
			if(!xzOnObject){
				if ( moveForward || moveBackward ) velocity.z -= direction.z * gSpeedFactor * delta;	//400.0 = acceleration
				if ( moveLeft || moveRight ) velocity.x -= direction.x * gSpeedFactor * delta;			//400.0 = acceleration
			}

			if ( onObject === true ) {
				velocity.y = Math.max( 0, velocity.y );
				canJump = true;
			}

			controls.moveRight( - velocity.x * delta );
			controls.moveForward( - velocity.z * delta );
			controls.getObject().position.y += ( velocity.y * delta ); // new behavior	
			if ( controls.getObject().position.y < 10 ) {
				velocity.y = 0;
				controls.getObject().position.y = 10;
				canJump = true;
			}
			
			//// collision detection (Y - Axis)
			//////raycasterY.ray.origin.copy( controls.getObject().position );	
			////raycasterY.set(controls.getObject().position, new THREE.Vector3(0, dirY, 0));
			////raycasterY.ray.origin.y += gPlayerDiff * dirY;		// shift origin to head / foot
			////raycasterY.far = Math.abs(distY);
			////var intersections = raycasterY.intersectObjects( objects );
			////var onObject = intersections.length > 0;
			
			//raycasterY.set(controls.getObject().position, new THREE.Vector3(0, dirY, 0));
			//raycasterY.far = Math.max(Math.abs(distY), gPlayerDiff);
			//var intersections = raycasterY.intersectObjects( objects );
			//var onObject = intersections.length > 0;
			//if ( onObject === true ) {
			//	velocity.y = 0;
			//	distY = (intersections[0].distance - gPlayerDiff) * dirY;
			//	if (dirY < 0)
			//		canJump = true;
			//}
			//else {
			//	raycasterY.far = Math.abs(distY);
			//	raycasterY.ray.origin.y += gPlayerDiff * dirY;		// shift origin to head / foot
			//	intersections = raycasterY.intersectObjects( objects );				
			//	onObject = intersections.length > 0;
			//	if ( onObject === true ) {
			//		velocity.y = 0;
			//		distY = (intersections[0].distance) * dirY;
			//		if (dirY < 0)
			//			canJump = true;
			//	}
			//}			


			//direction.z = Number( moveForward ) - Number( moveBackward );
			//direction.x = Number( moveLeft ) - Number( moveRight );
			//direction.normalize(); // this ensures consistent movements in all directions
			//
			////writeInfo("");
			//
			//// collision detection
			//// modified from https://blog.csdn.net/qq_30100043/article/details/79796285
			////let rotation = controls.getDirection(new THREE.Vector3(0, 0, 0)).multiply(new THREE.Vector3(1, 0, 1));
			//let v3 = new THREE.Vector3(0, 0, 0);
			//controls.getObject().getWorldDirection(v3)
			//let rotation = v3.multiply(new THREE.Vector3(-1, 0, -1));
			////let rotation = controls.getObject().getWorldDirection().multiply(new THREE.Vector3(-1, 0, -1));
			//var m = new THREE.Matrix4();
			//if(direction.z > 0){
			//	if(direction.x > 0){
			//		m.makeRotationY(Math.PI/4);
			//	}
			//	else if(direction.x < 0){
			//		m.makeRotationY(-Math.PI/4);
			//	}
			//	else{
			//		m.makeRotationY(0);
			//	}
			//}
			//else if(direction.z < 0){
			//	if(direction.x > 0){
			//		m.makeRotationY(Math.PI/4*3);
			//	}
			//	else if(direction.x < 0){
			//		m.makeRotationY(-Math.PI/4*3);
			//	}
			//	else{
			//		m.makeRotationY(Math.PI);
			//	}
			//}
			//else{
			//	if(direction.x > 0){
			//		m.makeRotationY(Math.PI/2);
			//	}
			//	else if(direction.x < 0){
			//		m.makeRotationY(-Math.PI/2);
			//	}
			//}			
			//rotation.applyMatrix4(m)
			//
			//raycasterXZ.set( controls.getObject().position , rotation );
			//var xzIntersections = raycasterXZ.intersectObjects( objects );
			//var xzOnObject = xzIntersections.length > 0;			
			//if(!xzOnObject){
			//	if ( moveForward || moveBackward ) velocity.z -= direction.z * gSpeed * delta;		//400.0 = acceleration
			//	if ( moveLeft || moveRight ) velocity.x -= direction.x * gSpeed * delta;			//400.0 = acceleration
			//}
//
			////if ( onObject === true ) {
			////	velocity.y = Math.max( 0, velocity.y );
			////	canJump = true;
			////}
//
			//controls.getObject().translateX( velocity.x * delta );
			////controls.getObject().translateY( velocity.y * delta );
			//controls.getObject().translateY( distY );
			//controls.getObject().translateZ( velocity.z * delta );
//
			//if ( controls.getObject().position.y < gPlayerDiff ) {
			//	velocity.y = 0;
			//	controls.getObject().position.y = gPlayerDiff;
			//	canJump = true;
			//}	
			////console.log(controls.getObject().position.y);
		}
	}
	
	function initFloor(mazeJson) {
		let boxSize = mazeJson.size;
		let map = mazeJson.map
		let x = (map.length + 6);
		let z = (map[0].length + 6);
		let width = x * boxSize;
		let height = z * boxSize; 
		
		var geometry = new THREE.PlaneBufferGeometry( 100000, 100000 );
		var material = new THREE.MeshPhongMaterial( {color: 0x336633 } );
		//var material = new THREE.MeshToonMaterial( {color: 0x336633 } );
		var plane = new THREE.Mesh( geometry, material );
		
		plane.rotation.x = -1 * Math.PI/2;
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = 0;
		return plane;
		
		
		/*
		//// random color floor
		//var floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
		var floorGeometry = new THREE.PlaneGeometry( width, height, x, z );
		floorGeometry.rotateX( - Math.PI / 2 );
		
		
		//for ( var i = 0, l = floorGeometry.vertices.length; i < l; i ++ ) {
		//	var vertex = floorGeometry.vertices[ i ];
		//	vertex.x += Math.random() * 20 - 10;
		//	vertex.y += Math.random() * 2;
		//	vertex.z += Math.random() * 20 - 10;
		//}
		
		
		for ( var i = 0, l = floorGeometry.faces.length; i < l; i ++ ) {
			var face = floorGeometry.faces[ i ];
			face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
			face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
		}
		
		var floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
		
		var floor = new THREE.Mesh( floorGeometry, floorMaterial );
		floor.position.y = 0;
		floor.position.x = 0;
		floor.position.z = 0;
		return floor;
		*/
	}
	
	function initMaze(mazeJson) {
		let boxSize = mazeJson.size;
		//let map = mazeJson.map
		
		let boxArray = [];
		let loader = new THREE.TextureLoader();
		loader.crossOrigin = "";
		let brick01 = loader.load("../assets/images/brick01.jpg");
		let floor = loader.load("../assets/images/floor.jpg");
		let ceiling = loader.load("../assets/images/ceiling.jpg");		
		
		var boxGeometry1 = new THREE.BoxGeometry( boxSize, boxSize, boxSize );
		var boxGeometry2 = new THREE.BoxGeometry( boxSize, Math.floor(boxSize * 3 / 4), boxSize );
		var boxGeometry3 = new THREE.BoxGeometry( boxSize, Math.floor(boxSize * 2 / 4), boxSize );		
		var boxGeometry4 = new THREE.BoxGeometry( boxSize, Math.floor(boxSize * 1 / 4), boxSize );
		//var boxMaterial = new THREE.MeshPhongMaterial( { specular: 0xffffff, flatShading: true, vertexColors: THREE.VertexColors } );		
		let boxMaterials = [
			new THREE.MeshBasicMaterial({map: brick01}),	//Left
			new THREE.MeshBasicMaterial({map: brick01}),	//Right
			new THREE.MeshBasicMaterial({map: floor}),		//Top
			new THREE.MeshBasicMaterial({map: ceiling}),	//Bottom
			new THREE.MeshBasicMaterial({map: brick01}),	//Front
			new THREE.MeshBasicMaterial({map: brick01})		//End
		]
		//let boxMaterial = new THREE.MeshBasicMaterial( { map : loader.load("../assets/images/brick01.jpg") });
		
		//var planeGeometry = new THREE.BoxGeometry(boxSize, 2, boxSize);		
		var planeGeometry5 = new THREE.BoxGeometry( boxSize, 2, Math.sqrt((boxSize * boxSize) + (boxSize * boxSize)) );
		var planeGeometry0 = new THREE.BoxGeometry(boxSize, 2, boxSize);		
		let planeMaterials = [
			new THREE.MeshBasicMaterial({map: floor}),
			new THREE.MeshBasicMaterial({map: floor}),
			new THREE.MeshBasicMaterial({map: floor}),
			new THREE.MeshBasicMaterial({map: ceiling}),
			new THREE.MeshBasicMaterial({map: floor}),
			new THREE.MeshBasicMaterial({map: floor})
		];
		

		

		
		var geometryE = new THREE.DodecahedronGeometry( boxSize / 4 );
		var materialE = new THREE.MeshToonMaterial({ color: 0x44aa44 });
		
		
		for (let y = 0; y < mazeJson.map.length; y++) {
			let map = mazeJson.map[y]
			for (let i = 0; i < map.length; i++) {
				for (let j = 0; j < map[i].length; j++)	{
					var box = null;
					var x = (j - (map[i].length / 2)) * boxSize;
					var z = (i - (map.length / 2)) * boxSize;// - (boxSize * map.length);
					if (map[i][j] == "S") {		//Start
						controls.getObject().position.x = x;
						controls.getObject().position.z = z;
						controls.getObject().position.y = (y * boxSize) + 20;
					}
					else if (map[i][j] == "E") {		//END
						box = new THREE.Mesh( geometryE, materialE );
						box.position.y = (y * boxSize) + (geometryE.parameters.radius / 2);
						box.position.x = x;			
						box.position.z = z;
						boxArray.push( box );
					}
					else if (map[i][j] == "1") {
						box = new THREE.Mesh( boxGeometry1, boxMaterials );
						box.position.y = (y * boxSize) + Math.floor(boxGeometry1.parameters.height / 2);
						box.position.x = x;			
						box.position.z = z;
						boxArray.push( box );
					}
					else if (map[i][j] == "2") {
						box = new THREE.Mesh( boxGeometry2, boxMaterials );
						box.position.y = (y * boxSize) + Math.floor(boxGeometry2.parameters.height / 2);
						box.position.x = x;			
						box.position.z = z;
						boxArray.push( box );
					}
					else if (map[i][j] == "3") {
						box = new THREE.Mesh( boxGeometry3, boxMaterials );
						box.position.y = (y * boxSize) + Math.floor(boxGeometry3.parameters.height / 2);
						box.position.x = x;			
						box.position.z = z;
						boxArray.push( box );
					}
					else if (map[i][j] == "4") {
						box = new THREE.Mesh( boxGeometry4, boxMaterials );
						box.position.y = (y * boxSize) + Math.floor(boxGeometry4.parameters.height / 2);
						box.position.x = x;			
						box.position.z = z;
						boxArray.push( box );
					}
					else if (map[i][j] == "5") {
						//for ( var f = 0, l = planeGeometry.faces.length; f < l; f ++ ) {
						//	var face = planeGeometry.faces[ f ];
						//	face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//	face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//	face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//}	
						//box = new THREE.Mesh( planeGeometry, boxMaterial.clone() );
						box = new THREE.Mesh( planeGeometry5, planeMaterials );						
						box.position.y = (y * boxSize) + 1;
						box.position.x = x;
						box.position.z = z;
						box.rotation.x = Math.PI / 4;
						boxArray.push( box );
					}
					else if (map[i][j] == "8") {
						//for ( var f = 0, l = planeGeometry.faces.length; f < l; f ++ ) {
						//	var face = planeGeometry.faces[ f ];
						//	face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//	face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//	face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//}	
						//box = new THREE.Mesh( planeGeometry, boxMaterial.clone() );
						box = new THREE.Mesh( planeGeometry0, planeMaterials );						
						box.position.y = (y * boxSize) + 1;
						box.position.x = x;
						box.position.z = z;
						boxArray.push( box );
					}
					else if (map[i][j] == "0") {
						//for ( var f = 0, l = planeGeometry.faces.length; f < l; f ++ ) {
						//	var face = planeGeometry.faces[ f ];
						//	face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//	face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//	face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
						//}	
						//box = new THREE.Mesh( planeGeometry, boxMaterial.clone() );
						box = new THREE.Mesh( planeGeometry0, planeMaterials );						
						box.position.y = (y * boxSize) + boxSize - 1;
						box.position.x = x;
						box.position.z = z;
						boxArray.push( box );
					}
				}
			}
		}
		return boxArray;
	}
