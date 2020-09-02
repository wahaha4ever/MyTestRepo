'use strict';
import * as THREE from 'https://unpkg.com/three@0.120.0/build/three.module.js';
//import { isConstructorDeclaration } from 'typescript';

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

class BaseClass {

    constructor() {
        this.container = null;
        this.camera = null;
        this.scene = null;
        this.renderer = null;

        //if (this.constructor == BaseClass)
        //    throw new Error ("Abstract classes can't be instantiated");
    }

    initCamera(width, height) {
        return null;
    }

    initScene() {
        return null;
    }

    initRenderer(width, height) {
        return null;
    }

	onWindowResize(){
        let width = this.container.getWidth();
        let height = this.container.getHeight()
		if (this.camera) {
			this.camera.aspect = width / height;
			this.camera.updateProjectionMatrix();
		}		
		this.renderer.setSize( width, height );
    }

    init(ctnrID) {
        this.container = this.initContainer(ctnrID);
        this.camera = this.initCamera(container.getWidth(), container.getHeight());
        this.scene = this.initScene();
        this.renderer = this.initRenderer(container.getWidth(), container.getHeight());
    }

    _start(container, camera, scene, renderer) {

    }

    _animate() {

    }
    initContainer(ctnrID) {
        return new Container(ctnrID);
    }
}

var NameX = (function() {
    const _privateHello = function() {
        console.log("Hello");
    }

    class Name {
      constructor(name) {
          this.name = name;
      }
  
      publicMethod() {
        _privateHello();
      }
    }
  
    return Name;
})();

export { BaseClass, Container, NameX };