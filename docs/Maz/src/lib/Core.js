//'use strict';
//https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/module_system.html

import * as THREE from 'https://unpkg.com/three@0.120.0/build/three.module.js';

var InternalCoreLib = {
	// Rotate an object around an arbitrary axis in object space	
	rotateAroundObjectAxis : function(object, axis, radians) {
		var rotObjectMatrix = new THREE.Matrix4();
		rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

		// old code for Three.JS pre r54:
		// object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
		// new code for Three.JS r55+:
		object.matrix.multiply(rotObjectMatrix);

		// old code for Three.js pre r49:
		// object.rotation.getRotationFromMatrix(object.matrix, object.scale);
		// old code for Three.js r50-r58:
		// object.rotation.setEulerFromRotationMatrix(object.matrix);
		// new code for Three.js r59+:
		object.rotation.setFromRotationMatrix(object.matrix);
	},
	
	//var rotWorldMatrix;
	// Rotate an object around an arbitrary axis in world space       
	rotateAroundWorldAxis : function(object, axis, radians) {
		var rotWorldMatrix = new THREE.Matrix4();
		rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

		// old code for Three.JS pre r54:
		//  rotWorldMatrix.multiply(object.matrix);
		// new code for Three.JS r55+:
		rotWorldMatrix.multiply(object.matrix);                // pre-multiply

		object.matrix = rotWorldMatrix;

		// old code for Three.js pre r49:
		// object.rotation.getRotationFromMatrix(object.matrix, object.scale);
		// old code for Three.js pre r59:
		// object.rotation.setEulerFromRotationMatrix(object.matrix);
		// code for r59+:
		object.rotation.setFromRotationMatrix(object.matrix);
	},

    ByteToText : function(buf)//textParseFromBytes : function(buf)
	{
		
		// Assume UTF-8 without BOM
		let enc = new TextDecoder("utf-8");
		let str = enc.decode(buf);
		return str;
	},
	
	
	getParameterByName : function(name) {
		var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },

	loadBytes : function(path/*String*/, callback)
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
	},
    
	//jsonParseFromBytes : function(buf)
	byteToJson : function(buf)
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
}

//var internalTest = (function(THREE) {
//	function test2() {
//		console.log("A");
//	}
//	function testthree() {
//		return new THREE.Vector3();
//	}
//
//	return {
//		testx : test2,
//		testThree : testthree
//	};
//})(THREE)

//var internalClass = function() {
//	this.test2 = function() {
//		console.log("B")
//	}
//}
//
//export { internalClass }

export default {  
	getParameterByName : InternalCoreLib.getParameterByName,
	loadBytes : InternalCoreLib.loadBytes,
	byteToJson : InternalCoreLib.byteToJson
	//test2 : internalTest.testx,
	//test3 : internalTest.testThree
};