(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/AppSettings.ts":
/*!********************************!*\
  !*** ./src/app/AppSettings.ts ***!
  \********************************/
/*! exports provided: AppSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettings", function() { return AppSettings; });
class AppSettings {
}
AppSettings.BaseSize = 150;
AppSettings.SideCnt = 4;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _models_ITile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/ITile */ "./src/app/models/ITile.ts");
/* harmony import */ var _AppSettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppSettings */ "./src/app/AppSettings.ts");
/* harmony import */ var _pages_image_image_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/image/image.component */ "./src/app/pages/image/image.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _pages_tile_tile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/tile/tile.component */ "./src/app/pages/tile/tile.component.ts");







function AppComponent_app_tile_3_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-tile", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("childEvent", function AppComponent_app_tile_3_Template_app_tile_childEvent_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.onListenChild($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const b_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ImageUrl", ctx_r0.imageUrl)("Tile", b_r1);
} }
const _c0 = function (a0, a1) { return { "width": a0, "height": a1 }; };
class AppComponent {
    constructor() {
        this.title = 'Sliding Puzzle';
        this._tileSize = 200;
        this.timer = -1;
    }
    ngOnInit() {
        //this.Board = this.initTiles();
        console.log(`${window.innerWidth} x ${window.innerHeight}`);
        let size = Math.min(window.innerWidth, window.innerHeight);
        size = Math.floor((size - 20) / 4);
        this._tileSize = Math.min(this._tileSize, size);
        this.Board = this.initTiles(this.initEmptyValues());
    }
    onResize(event) {
        console.log(`${event.target.innerWidth} x ${event.target.innerHeight}`);
        let size = Math.min(event.target.innerWidth, event.target.innerHeight);
        //this._tileSize = Math.floor(size / AppSettings.SideCnt);
        ////console.log(this._tileSize);
    }
    get Size() {
        return (this._tileSize * _AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt) + 'px';
    }
    initTiles(result) {
        let tiles = [];
        for (var i = 0; i < result.length; i++)
            tiles.push(new _models_ITile__WEBPACK_IMPORTED_MODULE_1__["Tile"](i, result[i])
                .initImage(_AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt, this._tileSize)
                .resetPost(_AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt, this._tileSize));
        return tiles;
    }
    initEmptyValues() {
        let result = new Array(16);
        for (var i = 0; i < result.length; i++) {
            result[i] = 0;
        }
        return result;
    }
    initTestValues() {
        let result = new Array(15);
        for (var i = 0; i < result.length; i++) {
            result[i] = i + 1;
        }
        return result;
    }
    initValues() {
        let result = new Array(15);
        for (var i = 0; i < result.length; i++) {
            let isValid = false;
            while (!isValid) {
                result[i] = Math.floor(Math.random() * 15) + 1;
                // validation
                isValid = true;
                for (var j = 0; j < i; j++) {
                    if (result[j] == result[i])
                        isValid = false;
                }
            }
        }
        //console.log(result);
        return result;
    }
    onListenImage($event) {
        this.imageUrl = $event;
        this.Board = this.initTiles(this.initValues());
        //this.Board = this.initTiles(this.initTestValues());
    }
    onListenChild($event) {
        if (this.timer == -1) {
            let id = $event;
            console.log($event);
            this.checkClick(id);
        }
    }
    getIdx(ix, iy) {
        return ix * _AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt + iy;
    }
    moveTile(tile, toId, dir) {
        let limit = 0;
        let stepSize = this._tileSize / 10;
        if (dir == 1 /* Up */)
            limit = tile.top - this._tileSize;
        if (dir == 2 /* Down */)
            limit = tile.top + this._tileSize;
        if (dir == 3 /* Left */)
            limit = tile.left - this._tileSize;
        if (dir == 4 /* Right */)
            limit = tile.left + this._tileSize;
        this.timer = setInterval(() => {
            let isFinish = false;
            if (dir == 1 /* Up */) {
                tile.top -= Math.min(Math.abs(tile.top - limit), stepSize);
                isFinish = tile.top == limit;
            }
            if (dir == 2 /* Down */) {
                tile.top += Math.min(Math.abs(tile.top - limit), stepSize);
                isFinish = tile.top == limit;
            }
            if (dir == 3 /* Left */) {
                tile.left -= Math.min(Math.abs(tile.left - limit), stepSize);
                isFinish = tile.left == limit;
            }
            if (dir == 4 /* Right */) {
                tile.left += Math.min(Math.abs(tile.left - limit), stepSize);
                isFinish = tile.left == limit;
            }
            if (isFinish) {
                clearInterval(this.timer);
                tile.id = toId;
                tile.resetPost(_AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt, this._tileSize);
                this.timer = -1;
                if (this.isCompleted())
                    alert("Puzzle is completed");
            }
        }, 16, tile, dir, stepSize, limit);
        // setinteval to move tile
        // set tile.id = toID while finish
        // enable click event;
    }
    isCompleted() {
        for (let i = 0; i < this.Board.length; i++) {
            if (!this.Board[i].isValid())
                return false;
        }
        return true;
    }
    getTile(idx) {
        for (let i = 0; i < this.Board.length; i++) {
            if (this.Board[i].id == idx)
                return this.Board[i];
        }
        return null;
    }
    checkClick(idx) {
        let ix = Math.floor(idx / _AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt);
        let iy = idx % _AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt;
        console.log(`${ix}, ${iy}`);
        let currentTile = this.getTile(idx);
        let targetIdx = -1;
        let actionTaken = false;
        if (!actionTaken && (ix - 1 >= 0)) {
            //up
            targetIdx = this.getIdx(ix - 1, iy);
            if (!this.getTile(targetIdx)) {
                actionTaken = true;
                this.moveTile(currentTile, targetIdx, 1 /* Up */);
            }
        }
        if (!actionTaken && (ix + 1 < _AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt)) {
            //down
            targetIdx = this.getIdx(ix + 1, iy);
            if (!this.getTile(targetIdx)) {
                actionTaken = true;
                this.moveTile(currentTile, targetIdx, 2 /* Down */);
            }
        }
        if (!actionTaken && (iy - 1 >= 0)) {
            //left
            targetIdx = this.getIdx(ix, iy - 1);
            if (!this.getTile(targetIdx)) {
                actionTaken = true;
                this.moveTile(currentTile, targetIdx, 3 /* Left */);
            }
        }
        if (!actionTaken && (iy + 1 < _AppSettings__WEBPACK_IMPORTED_MODULE_2__["AppSettings"].SideCnt)) {
            //right
            targetIdx = this.getIdx(ix, iy + 1);
            if (!this.getTile(targetIdx)) {
                actionTaken = true;
                this.moveTile(currentTile, targetIdx, 4 /* Right */);
            }
        }
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("resize", function AppComponent_resize_HostBindingHandler($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, decls: 5, vars: 5, consts: [[1, "imageSelect"], [3, "childEvent"], [1, "tileBoard", 3, "ngStyle"], [3, "ImageUrl", "Tile", "childEvent", 4, "ngFor", "ngForOf"], [1, "testImg"], [3, "ImageUrl", "Tile", "childEvent"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "app-image", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("childEvent", function AppComponent_Template_app_image_childEvent_1_listener($event) { return ctx.onListenImage($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AppComponent_app_tile_3_Template, 1, 2, "app-tile", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div", 4);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c0, "" + ctx.Size + "", "" + ctx.Size + ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.Board);
    } }, directives: [_pages_image_image_component__WEBPACK_IMPORTED_MODULE_3__["ImageComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _pages_tile_tile_component__WEBPACK_IMPORTED_MODULE_5__["TileComponent"]], styles: [".clipImageParent[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    \r\n    -webkit-clip-path: inset(0% 0% 0% 0%);\r\n            clip-path: inset(0% 0% 0% 0%);\r\n}\r\n.testImg[_ngcontent-%COMP%]{\r\n    background-size:300px;\r\n    background-image : url('/assets/bg.jpg');\r\n}\r\n.imageSelect[_ngcontent-%COMP%]{\r\n    color: white;\r\n    padding:10px;\r\n    background-color : blue;\r\n    max-width:200px;\r\n\r\n    position:fixed;\r\n    top:0px;\r\n    right:0px;\r\n    z-index: 100;\r\n}\r\n\r\n.tileBoard[_ngcontent-%COMP%] {\r\n    \r\n    background-color: blue;  \r\n    height: 600px;\r\n    width: 600px;\r\n    margin:10px auto;\r\n    \r\n    \r\n    \r\n    \r\n    position:relative;\r\n\r\n}\r\n@media only screen and (max-width:600px) {\r\n    .tileBoard[_ngcontent-%COMP%] {\r\n        \r\n        background-color: red;  \r\n        height: 400px;\r\n        width: 400px;\r\n        margin:10px auto;\r\n        \r\n        \r\n        \r\n        \r\n        position:relative;\r\n    }\r\n    .imageSelect[_ngcontent-%COMP%]{\r\n        \r\n        position: relative;\r\n        padding:10px;\r\n        background-color : red;\r\n    }\r\n}\r\n@media only screen and (max-width:400px) {\r\n    .tileBoard[_ngcontent-%COMP%] {\r\n        \r\n        background-color: green;  \r\n        height: 300px;\r\n        width: 300px;\r\n        margin:10px auto;\r\n        \r\n        \r\n        \r\n        \r\n        position:relative;\r\n    }\r\n}\r\n@media only screen and (max-width:300px) {\r\n    .tileBoard[_ngcontent-%COMP%] {\r\n        \r\n        background-color: brown;  \r\n        height: 200px;\r\n        width: 200px;\r\n        margin:10px auto;\r\n        \r\n        \r\n        \r\n        \r\n        position:relative;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIsb0NBQW9DO0lBQ3BDLHFDQUE2QjtZQUE3Qiw2QkFBNkI7QUFDakM7QUFDQTtJQUNJLHFCQUFxQjtJQUNyQix3Q0FBd0M7QUFDNUM7QUFFQTtJQUNJLFlBQVk7SUFDWixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGVBQWU7O0lBRWYsY0FBYztJQUNkLE9BQU87SUFDUCxTQUFTO0lBQ1QsWUFBWTtBQUNoQjtBQUVBOzs7Ozs7OztFQVFFO0FBQ0Y7SUFDSSxjQUFjO0lBQ2Qsc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsMEJBQTBCO0lBQzFCLHFCQUFxQjtJQUNyQixpQkFBaUI7O0FBRXJCO0FBQ0E7SUFDSTtRQUNJLGNBQWM7UUFDZCxxQkFBcUI7UUFDckIsYUFBYTtRQUNiLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGVBQWU7UUFDZiwwQkFBMEI7UUFDMUIscUJBQXFCO1FBQ3JCLGlCQUFpQjtJQUNyQjtJQUNBO1FBQ0ksZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixZQUFZO1FBQ1osc0JBQXNCO0lBQzFCO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksY0FBYztRQUNkLHVCQUF1QjtRQUN2QixhQUFhO1FBQ2IsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsZUFBZTtRQUNmLDBCQUEwQjtRQUMxQixxQkFBcUI7UUFDckIsaUJBQWlCO0lBQ3JCO0FBQ0o7QUFDQTtJQUNJO1FBQ0ksY0FBYztRQUNkLHVCQUF1QjtRQUN2QixhQUFhO1FBQ2IsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsZUFBZTtRQUNmLDBCQUEwQjtRQUMxQixxQkFBcUI7UUFDckIsaUJBQWlCO0lBQ3JCO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jbGlwSW1hZ2VQYXJlbnQge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgLypjbGlwOiByZWN0KDEwcHgsNjBweCwyMDBweCwxMHB4KTsqL1xyXG4gICAgY2xpcC1wYXRoOiBpbnNldCgwJSAwJSAwJSAwJSk7XHJcbn1cclxuLnRlc3RJbWd7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6MzAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlIDogdXJsKCcvYXNzZXRzL2JnLmpwZycpO1xyXG59XHJcblxyXG4uaW1hZ2VTZWxlY3R7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBwYWRkaW5nOjEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yIDogYmx1ZTtcclxuICAgIG1heC13aWR0aDoyMDBweDtcclxuXHJcbiAgICBwb3NpdGlvbjpmaXhlZDtcclxuICAgIHRvcDowcHg7XHJcbiAgICByaWdodDowcHg7XHJcbiAgICB6LWluZGV4OiAxMDA7XHJcbn1cclxuXHJcbi8qQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjgwMHB4KSB7XHJcbiAgICAuaW1hZ2VTZWxlY3R7XHJcbiAgICAgICAgZmxvYXQ6bGVmdDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICAgICAgcGFkZGluZzoxMHB4O1xyXG4gICAgICAgIG1pbi13aWR0aDozMDBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yIDogcmVkO1xyXG4gICAgfVxyXG59Ki9cclxuLnRpbGVCb2FyZCB7XHJcbiAgICAvKmZsb2F0OmxlZnQ7Ki9cclxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7ICBcclxuICAgIGhlaWdodDogNjAwcHg7XHJcbiAgICB3aWR0aDogNjAwcHg7XHJcbiAgICBtYXJnaW46MTBweCBhdXRvO1xyXG4gICAgLyp3aWR0aDoxMDAlOyovXHJcbiAgICAvKndpZHRoOjgwMHB4OyovXHJcbiAgICAvKmJvcmRlcjogMTBweCBzb2xpZCByZWQ7Ki9cclxuICAgIC8qcGFkZGluZzoxMHB4IDEwcHg7Ki9cclxuICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG5cclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NjAwcHgpIHtcclxuICAgIC50aWxlQm9hcmQge1xyXG4gICAgICAgIC8qZmxvYXQ6bGVmdDsqL1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJlZDsgIFxyXG4gICAgICAgIGhlaWdodDogNDAwcHg7XHJcbiAgICAgICAgd2lkdGg6IDQwMHB4O1xyXG4gICAgICAgIG1hcmdpbjoxMHB4IGF1dG87XHJcbiAgICAgICAgLyp3aWR0aDoxMDAlOyovXHJcbiAgICAgICAgLyp3aWR0aDo4MDBweDsqL1xyXG4gICAgICAgIC8qYm9yZGVyOiAxMHB4IHNvbGlkIHJlZDsqL1xyXG4gICAgICAgIC8qcGFkZGluZzoxMHB4IDEwcHg7Ki9cclxuICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgIH1cclxuICAgIC5pbWFnZVNlbGVjdHtcclxuICAgICAgICAvKmZsb2F0OnJpZ2h0OyovXHJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICAgIHBhZGRpbmc6MTBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yIDogcmVkO1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDo0MDBweCkge1xyXG4gICAgLnRpbGVCb2FyZCB7XHJcbiAgICAgICAgLypmbG9hdDpsZWZ0OyovXHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47ICBcclxuICAgICAgICBoZWlnaHQ6IDMwMHB4O1xyXG4gICAgICAgIHdpZHRoOiAzMDBweDtcclxuICAgICAgICBtYXJnaW46MTBweCBhdXRvO1xyXG4gICAgICAgIC8qd2lkdGg6MTAwJTsqL1xyXG4gICAgICAgIC8qd2lkdGg6ODAwcHg7Ki9cclxuICAgICAgICAvKmJvcmRlcjogMTBweCBzb2xpZCByZWQ7Ki9cclxuICAgICAgICAvKnBhZGRpbmc6MTBweCAxMHB4OyovXHJcbiAgICAgICAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjMwMHB4KSB7XHJcbiAgICAudGlsZUJvYXJkIHtcclxuICAgICAgICAvKmZsb2F0OmxlZnQ7Ki9cclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBicm93bjsgIFxyXG4gICAgICAgIGhlaWdodDogMjAwcHg7XHJcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgICAgIG1hcmdpbjoxMHB4IGF1dG87XHJcbiAgICAgICAgLyp3aWR0aDoxMDAlOyovXHJcbiAgICAgICAgLyp3aWR0aDo4MDBweDsqL1xyXG4gICAgICAgIC8qYm9yZGVyOiAxMHB4IHNvbGlkIHJlZDsqL1xyXG4gICAgICAgIC8qcGFkZGluZzoxMHB4IDEwcHg7Ki9cclxuICAgICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcclxuICAgIH1cclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, { onResize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['window:resize', ['$event']]
        }] }); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _pages_block_block_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/block/block.component */ "./src/app/pages/block/block.component.ts");
/* harmony import */ var _pages_block_block2_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/block/block2.component */ "./src/app/pages/block/block2.component.ts");
/* harmony import */ var _pages_image_image_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/image/image.component */ "./src/app/pages/image/image.component.ts");
/* harmony import */ var _pages_tile_tile_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/tile/tile.component */ "./src/app/pages/tile/tile.component.ts");









class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _pages_block_block_component__WEBPACK_IMPORTED_MODULE_4__["BlockComponent"],
        _pages_block_block2_component__WEBPACK_IMPORTED_MODULE_5__["Block2Component"],
        _pages_image_image_component__WEBPACK_IMPORTED_MODULE_6__["ImageComponent"],
        _pages_tile_tile_component__WEBPACK_IMPORTED_MODULE_7__["TileComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                    _pages_block_block_component__WEBPACK_IMPORTED_MODULE_4__["BlockComponent"],
                    _pages_block_block2_component__WEBPACK_IMPORTED_MODULE_5__["Block2Component"],
                    _pages_image_image_component__WEBPACK_IMPORTED_MODULE_6__["ImageComponent"],
                    _pages_tile_tile_component__WEBPACK_IMPORTED_MODULE_7__["TileComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/models/ITile.ts":
/*!*********************************!*\
  !*** ./src/app/models/ITile.ts ***!
  \*********************************/
/*! exports provided: Tile, TileTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tile", function() { return Tile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileTest", function() { return TileTest; });
class Tile {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        //this.id = id;
        //this.value = value;
    }
    initImage(sideCnt, imageSize) {
        this.imageTop = Math.floor((this.value - 1) / sideCnt);
        this.imageLeft = (this.value - 1) % sideCnt;
        this.imageTop = this.imageTop * imageSize * -1;
        this.imageLeft = this.imageLeft * imageSize * -1;
        return this;
    }
    isValid() {
        return this.id + 1 == this.value;
    }
    resetPost(sideCnt, size) {
        this.size = size;
        this.top = Math.floor(this.id / sideCnt);
        this.left = this.id % sideCnt;
        this.top = this.top * size;
        this.left = this.left * size;
        return this;
    }
}
class TileTest {
    /**
     *
     */
    constructor(id, value) {
        this.id = id;
        this.value = value;
    }
    getSum() {
        return this.id + this.value;
    }
}
//export interface ITileList2 extends Array<ITile>{}


/***/ }),

/***/ "./src/app/pages/block/block.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/block/block.component.ts ***!
  \************************************************/
/*! exports provided: BlockComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlockComponent", function() { return BlockComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



const _c0 = function (a0) { return { "background-image": a0 }; };
class BlockComponent {
    constructor() {
        this.childEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.ClassName = `img img-${this.Value}`;
    }
    onChildClick() {
        this.childEvent.emit(this.IDD);
    }
}
BlockComponent.ɵfac = function BlockComponent_Factory(t) { return new (t || BlockComponent)(); };
BlockComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BlockComponent, selectors: [["app-block"]], inputs: { ImageUrl: "ImageUrl", IDD: "IDD", Value: "Value" }, outputs: { childEvent: "childEvent" }, decls: 2, vars: 5, consts: [[3, "click"], [3, "ngStyle"]], template: function BlockComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function BlockComponent_Template_div_click_0_listener() { return ctx.onChildClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.ClassName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](3, _c0, "url(" + ctx.ImageUrl + ")"));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"]], styles: ["div[_ngcontent-%COMP%] {\r\n    width:200px;\r\n    height:200px;\r\n    overflow:hidden;\r\n    position: relative;\r\n    background-color:grey;\r\n    \r\n}\r\n\r\n.img[_ngcontent-%COMP%] {\r\n    \r\n    \r\n    \r\n    \r\n    width: 800px;\r\n    height: 800px;\r\n    background-repeat: no-repeat;\r\n    background-size: contain;\r\n    background-position: center;\r\n    background-color: black;\r\n}\r\n\r\n.img-0[_ngcontent-%COMP%] {\r\n    top: 200px;\r\n    left: 200px;\r\n}\r\n\r\n.img-1[_ngcontent-%COMP%], .img-2[_ngcontent-%COMP%], .img-3[_ngcontent-%COMP%], .img-4[_ngcontent-%COMP%] {\r\n    top : 0px;\r\n}\r\n\r\n.img-5[_ngcontent-%COMP%], .img-6[_ngcontent-%COMP%], .img-7[_ngcontent-%COMP%], .img-8[_ngcontent-%COMP%] {\r\n    top : -200px;\r\n}\r\n\r\n.img-9[_ngcontent-%COMP%], .img-10[_ngcontent-%COMP%], .img-11[_ngcontent-%COMP%], .img-12[_ngcontent-%COMP%] {\r\n    top : -400px;\r\n}\r\n\r\n.img-13[_ngcontent-%COMP%], .img-14[_ngcontent-%COMP%], .img-15[_ngcontent-%COMP%], .img-16[_ngcontent-%COMP%] {\r\n    top : -600px;\r\n}\r\n\r\n.img-1[_ngcontent-%COMP%], .img-5[_ngcontent-%COMP%], .img-9[_ngcontent-%COMP%], .img-13[_ngcontent-%COMP%] {\r\n    left : 0px;\r\n}\r\n\r\n.img-2[_ngcontent-%COMP%], .img-6[_ngcontent-%COMP%], .img-10[_ngcontent-%COMP%], .img-14[_ngcontent-%COMP%] {\r\n    left : -200px;\r\n}\r\n\r\n.img-3[_ngcontent-%COMP%], .img-7[_ngcontent-%COMP%], .img-11[_ngcontent-%COMP%], .img-15[_ngcontent-%COMP%] {\r\n    left : -400px;\r\n}\r\n\r\n.img-4[_ngcontent-%COMP%], .img-8[_ngcontent-%COMP%], .img-12[_ngcontent-%COMP%], .img-16[_ngcontent-%COMP%] {\r\n    left : -600px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYmxvY2svYmxvY2suY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxZQUFZO0lBQ1osZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0k7O2VBRVc7SUFDWDtzQkFDa0I7SUFDbEIsc0JBQXNCO0lBQ3RCO21DQUMrQjtJQUMvQixZQUFZO0lBQ1osYUFBYTtJQUNiLDRCQUE0QjtJQUM1Qix3QkFBd0I7SUFDeEIsMkJBQTJCO0lBQzNCLHVCQUF1QjtBQUMzQjs7QUFDQTtJQUNJLFVBQVU7SUFDVixXQUFXO0FBQ2Y7O0FBQ0E7SUFDSSxTQUFTO0FBQ2I7O0FBQ0E7SUFDSSxZQUFZO0FBQ2hCOztBQUNBO0lBQ0ksWUFBWTtBQUNoQjs7QUFDQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBQ0E7SUFDSSxhQUFhO0FBQ2pCOztBQUNBO0lBQ0ksYUFBYTtBQUNqQjs7QUFDQTtJQUNJLGFBQWE7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ibG9jay9ibG9jay5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiZGl2IHtcclxuICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgb3ZlcmZsb3c6aGlkZGVuO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjpncmV5O1xyXG4gICAgLypib3JkZXI6IDFweCBzb2xpZCBibGFjazsqL1xyXG59XHJcblxyXG4uaW1nIHtcclxuICAgIC8qcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwcHg7XHJcbiAgICBsZWZ0OiAwcHg7Ki9cclxuICAgIC8qbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LWhlaWdodDogMTAwJTsqL1xyXG4gICAgLypwb3NpdGlvbjogYWJzb2x1dGU7Ki9cclxuICAgIC8qYmFja2dyb3VuZC1pbWFnZSA6IHVybCgnL2Fzc2V0cy9iZy5qcGcnKTtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0IDogbm8tcmVwZWF0OyovXHJcbiAgICB3aWR0aDogODAwcHg7XHJcbiAgICBoZWlnaHQ6IDgwMHB4O1xyXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xyXG59XHJcbi5pbWctMCB7XHJcbiAgICB0b3A6IDIwMHB4O1xyXG4gICAgbGVmdDogMjAwcHg7XHJcbn1cclxuLmltZy0xLCAuaW1nLTIsIC5pbWctMywgLmltZy00IHtcclxuICAgIHRvcCA6IDBweDtcclxufVxyXG4uaW1nLTUsIC5pbWctNiwgLmltZy03LCAuaW1nLTgge1xyXG4gICAgdG9wIDogLTIwMHB4O1xyXG59XHJcbi5pbWctOSwgLmltZy0xMCwgLmltZy0xMSwgLmltZy0xMiB7XHJcbiAgICB0b3AgOiAtNDAwcHg7XHJcbn1cclxuLmltZy0xMywgLmltZy0xNCwgLmltZy0xNSwgLmltZy0xNiB7XHJcbiAgICB0b3AgOiAtNjAwcHg7XHJcbn1cclxuXHJcbi5pbWctMSwgLmltZy01LCAuaW1nLTksIC5pbWctMTMge1xyXG4gICAgbGVmdCA6IDBweDtcclxufVxyXG4uaW1nLTIsIC5pbWctNiwgLmltZy0xMCwgLmltZy0xNCB7XHJcbiAgICBsZWZ0IDogLTIwMHB4O1xyXG59XHJcbi5pbWctMywgLmltZy03LCAuaW1nLTExLCAuaW1nLTE1IHtcclxuICAgIGxlZnQgOiAtNDAwcHg7XHJcbn1cclxuLmltZy00LCAuaW1nLTgsIC5pbWctMTIsIC5pbWctMTYge1xyXG4gICAgbGVmdCA6IC02MDBweDtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BlockComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-block',
                templateUrl: './block.component.html',
                styleUrls: ['./block.component.css']
            }]
    }], null, { ImageUrl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], IDD: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], Value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], childEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/pages/block/block2.component.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/block/block2.component.ts ***!
  \*************************************************/
/*! exports provided: Block2Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Block2Component", function() { return Block2Component; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



const _c0 = function (a0, a1) { return { "top": a0, "left": a1 }; };
class Block2Component {
    constructor() {
        this.childEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._maxRow = 4;
        this._maxCol = 4;
        this._width = 200;
        this._height = 200;
    }
    ngOnInit() {
        this.ClassNameValue = `img img-${this.Value}`;
        this.ClassNameTile = `tile tile-${this.IDD}`;
        let ix = Math.floor(this.IDD / 4);
        let iy = this.IDD % 4;
        this.postTop = ix * this._width;
        this.postLeft = iy * this._height;
    }
    ngOnDestroy() {
        if (this.timer)
            clearInterval(this.timer);
    }
    get Top() {
        return `${this.postTop}px`;
    }
    get Left() {
        return `${this.postLeft}px`;
    }
    onChildClick() {
        console.log(this.Value);
        //this.childEvent.emit(this.IDD);
        //check valid click
        this.timer = setInterval(() => {
            this.moveTileUp();
            if (this.postTop <= 0)
                clearInterval(this.timer);
        }, 16);
    }
    moveTileUp() {
        this.postTop -= 10;
    }
    moveTileDown() {
        this.postTop += 10;
    }
}
Block2Component.ɵfac = function Block2Component_Factory(t) { return new (t || Block2Component)(); };
Block2Component.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: Block2Component, selectors: [["app-block2"]], inputs: { ImageUrl: "ImageUrl", IDD: "IDD", Value: "Value" }, outputs: { childEvent: "childEvent" }, decls: 3, vars: 7, consts: [[1, "tile", 3, "ngStyle", "click"]], template: function Block2Component_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function Block2Component_Template_div_click_0_listener() { return ctx.onChildClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](4, _c0, "" + ctx.Top + "", "" + ctx.Left + ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.ClassNameValue);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.Value);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"]], styles: [".tile[_ngcontent-%COMP%] {\r\n    width:200px;\r\n    height:200px;\r\n    overflow:hidden;\r\n    position: absolute;\r\n    background-color:grey;\r\n    border: 1px solid blue;\r\n    \r\n}\r\n.tile-1[_ngcontent-%COMP%], .tile-2[_ngcontent-%COMP%], .tile-3[_ngcontent-%COMP%], .tile-4[_ngcontent-%COMP%] {\r\n    top : 0px;\r\n}\r\n.tile-5[_ngcontent-%COMP%], .tile-6[_ngcontent-%COMP%], .tile-7[_ngcontent-%COMP%], .tile-8[_ngcontent-%COMP%] {\r\n    top : 200px;\r\n}\r\n.tile-9[_ngcontent-%COMP%], .tile-10[_ngcontent-%COMP%], .tile-11[_ngcontent-%COMP%], .tile-12[_ngcontent-%COMP%] {\r\n    top : 400px;\r\n}\r\n.tile-13[_ngcontent-%COMP%], .tile-14[_ngcontent-%COMP%], .tile-15[_ngcontent-%COMP%], .tile-16[_ngcontent-%COMP%] {\r\n    top : 600px;\r\n}\r\n.tile-1[_ngcontent-%COMP%], .tile-5[_ngcontent-%COMP%], .tile-9[_ngcontent-%COMP%], .tile-13[_ngcontent-%COMP%] {\r\n    left : 0px;\r\n}\r\n.tile-2[_ngcontent-%COMP%], .tile-6[_ngcontent-%COMP%], .tile-10[_ngcontent-%COMP%], .tile-14[_ngcontent-%COMP%] {\r\n    left : 200px;\r\n}\r\n.tile-3[_ngcontent-%COMP%], .tile-7[_ngcontent-%COMP%], .tile-11[_ngcontent-%COMP%], .tile-15[_ngcontent-%COMP%] {\r\n    left : 400px;\r\n}\r\n.tile-4[_ngcontent-%COMP%], .tile-8[_ngcontent-%COMP%], .tile-12[_ngcontent-%COMP%], .tile-16[_ngcontent-%COMP%] {\r\n    left : 600px;\r\n}\r\n.img[_ngcontent-%COMP%] {\r\n    \r\n    \r\n    \r\n    position:relative;\r\n    background-image : url('/assets/bg.jpg');\r\n    width: 800px;\r\n    height: 800px;\r\n    background-repeat: no-repeat;\r\n    background-size: contain;\r\n    background-position: center;\r\n    background-color: black;\r\n}\r\n.img-0[_ngcontent-%COMP%] {\r\n    top: 200px;\r\n    left: 200px;\r\n}\r\n.img-1[_ngcontent-%COMP%], .img-2[_ngcontent-%COMP%], .img-3[_ngcontent-%COMP%], .img-4[_ngcontent-%COMP%] {\r\n    top : 0px;\r\n}\r\n.img-5[_ngcontent-%COMP%], .img-6[_ngcontent-%COMP%], .img-7[_ngcontent-%COMP%], .img-8[_ngcontent-%COMP%] {\r\n    top : -200px;\r\n}\r\n.img-9[_ngcontent-%COMP%], .img-10[_ngcontent-%COMP%], .img-11[_ngcontent-%COMP%], .img-12[_ngcontent-%COMP%] {\r\n    top : -400px;\r\n}\r\n.img-13[_ngcontent-%COMP%], .img-14[_ngcontent-%COMP%], .img-15[_ngcontent-%COMP%], .img-16[_ngcontent-%COMP%] {\r\n    top : -600px;\r\n}\r\n.img-1[_ngcontent-%COMP%], .img-5[_ngcontent-%COMP%], .img-9[_ngcontent-%COMP%], .img-13[_ngcontent-%COMP%] {\r\n    left : 0px;\r\n}\r\n.img-2[_ngcontent-%COMP%], .img-6[_ngcontent-%COMP%], .img-10[_ngcontent-%COMP%], .img-14[_ngcontent-%COMP%] {\r\n    left : -200px;\r\n}\r\n.img-3[_ngcontent-%COMP%], .img-7[_ngcontent-%COMP%], .img-11[_ngcontent-%COMP%], .img-15[_ngcontent-%COMP%] {\r\n    left : -400px;\r\n}\r\n.img-4[_ngcontent-%COMP%], .img-8[_ngcontent-%COMP%], .img-12[_ngcontent-%COMP%], .img-16[_ngcontent-%COMP%] {\r\n    left : -600px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvYmxvY2svYmxvY2syLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLHNCQUFzQjtJQUN0QiwyQkFBMkI7QUFDL0I7QUFDQTtJQUNJLFNBQVM7QUFDYjtBQUNBO0lBQ0ksV0FBVztBQUNmO0FBQ0E7SUFDSSxXQUFXO0FBQ2Y7QUFDQTtJQUNJLFdBQVc7QUFDZjtBQUNBO0lBQ0ksVUFBVTtBQUNkO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBR0E7SUFDSTs7ZUFFVztJQUNYO3NCQUNrQjtJQUNsQixzQkFBc0I7SUFDdEIsaUJBQWlCO0lBQ2pCLHdDQUF3QztJQUN4QyxZQUFZO0lBQ1osYUFBYTtJQUNiLDRCQUE0QjtJQUM1Qix3QkFBd0I7SUFDeEIsMkJBQTJCO0lBQzNCLHVCQUF1QjtBQUMzQjtBQUNBO0lBQ0ksVUFBVTtJQUNWLFdBQVc7QUFDZjtBQUNBO0lBQ0ksU0FBUztBQUNiO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxZQUFZO0FBQ2hCO0FBRUE7SUFDSSxVQUFVO0FBQ2Q7QUFDQTtJQUNJLGFBQWE7QUFDakI7QUFDQTtJQUNJLGFBQWE7QUFDakI7QUFDQTtJQUNJLGFBQWE7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9ibG9jay9ibG9jazIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aWxlIHtcclxuICAgIHdpZHRoOjIwMHB4O1xyXG4gICAgaGVpZ2h0OjIwMHB4O1xyXG4gICAgb3ZlcmZsb3c6aGlkZGVuO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjpncmV5O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmx1ZTtcclxuICAgIC8qYm9yZGVyOiAxcHggc29saWQgYmxhY2s7Ki9cclxufVxyXG4udGlsZS0xLCAudGlsZS0yLCAudGlsZS0zLCAudGlsZS00IHtcclxuICAgIHRvcCA6IDBweDtcclxufVxyXG4udGlsZS01LCAudGlsZS02LCAudGlsZS03LCAudGlsZS04IHtcclxuICAgIHRvcCA6IDIwMHB4O1xyXG59XHJcbi50aWxlLTksIC50aWxlLTEwLCAudGlsZS0xMSwgLnRpbGUtMTIge1xyXG4gICAgdG9wIDogNDAwcHg7XHJcbn1cclxuLnRpbGUtMTMsIC50aWxlLTE0LCAudGlsZS0xNSwgLnRpbGUtMTYge1xyXG4gICAgdG9wIDogNjAwcHg7XHJcbn1cclxuLnRpbGUtMSwgLnRpbGUtNSwgLnRpbGUtOSwgLnRpbGUtMTMge1xyXG4gICAgbGVmdCA6IDBweDtcclxufVxyXG4udGlsZS0yLCAudGlsZS02LCAudGlsZS0xMCwgLnRpbGUtMTQge1xyXG4gICAgbGVmdCA6IDIwMHB4O1xyXG59XHJcbi50aWxlLTMsIC50aWxlLTcsIC50aWxlLTExLCAudGlsZS0xNSB7XHJcbiAgICBsZWZ0IDogNDAwcHg7XHJcbn1cclxuLnRpbGUtNCwgLnRpbGUtOCwgLnRpbGUtMTIsIC50aWxlLTE2IHtcclxuICAgIGxlZnQgOiA2MDBweDtcclxufVxyXG5cclxuXHJcbi5pbWcge1xyXG4gICAgLypwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDBweDtcclxuICAgIGxlZnQ6IDBweDsqL1xyXG4gICAgLyptYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDAlOyovXHJcbiAgICAvKnBvc2l0aW9uOiBhYnNvbHV0ZTsqL1xyXG4gICAgcG9zaXRpb246cmVsYXRpdmU7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlIDogdXJsKCcvYXNzZXRzL2JnLmpwZycpO1xyXG4gICAgd2lkdGg6IDgwMHB4O1xyXG4gICAgaGVpZ2h0OiA4MDBweDtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XHJcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG4uaW1nLTAge1xyXG4gICAgdG9wOiAyMDBweDtcclxuICAgIGxlZnQ6IDIwMHB4O1xyXG59XHJcbi5pbWctMSwgLmltZy0yLCAuaW1nLTMsIC5pbWctNCB7XHJcbiAgICB0b3AgOiAwcHg7XHJcbn1cclxuLmltZy01LCAuaW1nLTYsIC5pbWctNywgLmltZy04IHtcclxuICAgIHRvcCA6IC0yMDBweDtcclxufVxyXG4uaW1nLTksIC5pbWctMTAsIC5pbWctMTEsIC5pbWctMTIge1xyXG4gICAgdG9wIDogLTQwMHB4O1xyXG59XHJcbi5pbWctMTMsIC5pbWctMTQsIC5pbWctMTUsIC5pbWctMTYge1xyXG4gICAgdG9wIDogLTYwMHB4O1xyXG59XHJcblxyXG4uaW1nLTEsIC5pbWctNSwgLmltZy05LCAuaW1nLTEzIHtcclxuICAgIGxlZnQgOiAwcHg7XHJcbn1cclxuLmltZy0yLCAuaW1nLTYsIC5pbWctMTAsIC5pbWctMTQge1xyXG4gICAgbGVmdCA6IC0yMDBweDtcclxufVxyXG4uaW1nLTMsIC5pbWctNywgLmltZy0xMSwgLmltZy0xNSB7XHJcbiAgICBsZWZ0IDogLTQwMHB4O1xyXG59XHJcbi5pbWctNCwgLmltZy04LCAuaW1nLTEyLCAuaW1nLTE2IHtcclxuICAgIGxlZnQgOiAtNjAwcHg7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Block2Component, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-block2',
                templateUrl: './block2.component.html',
                styleUrls: ['./block2.component.css']
            }]
    }], null, { ImageUrl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], IDD: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], Value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], childEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/pages/image/image.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/image/image.component.ts ***!
  \************************************************/
/*! exports provided: ImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageComponent", function() { return ImageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
//https://fiyazhasan.me/angular-file-upload-using-asp-net-core/



const _c0 = function (a0) { return { "background-image": a0 }; };
class ImageComponent {
    constructor() {
        this.imageUrl = "assets/480x480.png";
        this.childEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    onChange(file) {
        if (file) {
            this.file = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = event => {
                this.imageUrl = reader.result;
                this.childEvent.emit(this.imageUrl);
            };
        }
    }
}
ImageComponent.ɵfac = function ImageComponent_Factory(t) { return new (t || ImageComponent)(); };
ImageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ImageComponent, selectors: [["app-image"]], outputs: { childEvent: "childEvent" }, decls: 5, vars: 3, consts: [["type", "file", "name", "file", 1, "file-input", 3, "change"], ["fileInput", ""], [1, "parentDiv"], [1, "img", 3, "ngStyle"]], template: function ImageComponent_Template(rf, ctx) { if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "input", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function ImageComponent_Template_input_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1); return ctx.onChange(_r0.files[0]); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, "url(" + ctx.imageUrl + ")"));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"]], styles: [".parentDiv[_ngcontent-%COMP%] {\r\n    width:150px;\r\n    height:150px;\r\n    overflow:hidden;\r\n    position: relative;\r\n    background-color:grey;\r\n}\r\n.img[_ngcontent-%COMP%] {\r\n    width: 150px;\r\n    height: 150px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvaW1hZ2UvaW1hZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztFQUlFO0FBQ0Y7SUFDSSxXQUFXO0lBQ1gsWUFBWTtJQUNaLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIscUJBQXFCO0FBQ3pCO0FBQ0E7SUFDSSxZQUFZO0lBQ1osYUFBYTtBQUNqQiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ltYWdlL2ltYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKi5jbGlwSW1hZ2Uge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbGVmdCA6IDQwMHB4O1xyXG4gICAgY2xpcDogcmVjdCg1MHB4LDEzMHB4LDgwcHgsNDBweCk7XHJcbn0qL1xyXG4ucGFyZW50RGl2IHtcclxuICAgIHdpZHRoOjE1MHB4O1xyXG4gICAgaGVpZ2h0OjE1MHB4O1xyXG4gICAgb3ZlcmZsb3c6aGlkZGVuO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjpncmV5O1xyXG59XHJcbi5pbWcge1xyXG4gICAgd2lkdGg6IDE1MHB4O1xyXG4gICAgaGVpZ2h0OiAxNTBweDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ImageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-image',
                templateUrl: './image.component.html',
                styleUrls: ['./image.component.css']
            }]
    }], function () { return []; }, { childEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/pages/tile/tile.component.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/tile/tile.component.ts ***!
  \**********************************************/
/*! exports provided: TileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileComponent", function() { return TileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_AppSettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/AppSettings */ "./src/app/AppSettings.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




const _c0 = function (a0, a1, a2, a3) { return { "top": a0, "left": a1, "width": a2, "height": a3 }; };
const _c1 = function (a0, a1, a2, a3, a4) { return { "background-image": a0, "width": a1, "height": a2, "top": a3, "left": a4 }; };
class TileComponent {
    constructor() {
        this.childEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    get Top() {
        return this.Tile.top + "px";
    }
    get Left() {
        return this.Tile.left + "px";
    }
    get Size() {
        return (this.Tile.size - 8) + "px";
    }
    get ImageSize() {
        return (this.Tile.size * src_app_AppSettings__WEBPACK_IMPORTED_MODULE_1__["AppSettings"].SideCnt) + "px";
    }
    get ImageTop() {
        return this.Tile.imageTop + "px";
    }
    get ImageLeft() {
        return this.Tile.imageLeft + "px";
    }
    ngOnInit() {
        this.ClassNameValue = `img img-${this.Tile.value}`;
        //console.log(this.Tile.id);
    }
    onChildClick() {
        this.childEvent.emit(this.Tile.id);
    }
}
TileComponent.ɵfac = function TileComponent_Factory(t) { return new (t || TileComponent)(); };
TileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TileComponent, selectors: [["app-tile"]], inputs: { ImageUrl: "ImageUrl", Tile: "Tile" }, outputs: { childEvent: "childEvent" }, decls: 2, vars: 15, consts: [[1, "tile", 3, "ngStyle", "click"], [3, "ngStyle"]], template: function TileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TileComponent_Template_div_click_0_listener() { return ctx.onChildClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction4"](4, _c0, "" + ctx.Top + "", "" + ctx.Left + "", "" + ctx.Size + "", "" + ctx.Size + ""));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx.ClassNameValue);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction5"](9, _c1, "url(" + ctx.ImageUrl + ")", "" + ctx.ImageSize + "", "" + ctx.ImageSize + "", "" + ctx.ImageTop + "", "" + ctx.ImageLeft + ""));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"]], styles: [".tile[_ngcontent-%COMP%] {\r\n    \r\n    \r\n    overflow:hidden;\r\n    position: absolute;\r\n    background-color:grey;\r\n    margin: 4px;\r\n    cursor: pointer;\r\n    \r\n}\r\n\r\n.img[_ngcontent-%COMP%] {\r\n    position:relative;\r\n    \r\n    \r\n}\r\n\r\n.img-0[_ngcontent-%COMP%] {\r\n    top: 200px;\r\n    left: 200px;\r\n}\r\n\r\n.img-1[_ngcontent-%COMP%], .img-2[_ngcontent-%COMP%], .img-3[_ngcontent-%COMP%], .img-4[_ngcontent-%COMP%] {\r\n    top : 0px;\r\n}\r\n\r\n.img-5[_ngcontent-%COMP%], .img-6[_ngcontent-%COMP%], .img-7[_ngcontent-%COMP%], .img-8[_ngcontent-%COMP%] {\r\n    top : -150px;\r\n}\r\n\r\n.img-9[_ngcontent-%COMP%], .img-10[_ngcontent-%COMP%], .img-11[_ngcontent-%COMP%], .img-12[_ngcontent-%COMP%] {\r\n    top : -300px;\r\n}\r\n\r\n.img-13[_ngcontent-%COMP%], .img-14[_ngcontent-%COMP%], .img-15[_ngcontent-%COMP%], .img-16[_ngcontent-%COMP%] {\r\n    top : -450px;\r\n}\r\n\r\n.img-1[_ngcontent-%COMP%], .img-5[_ngcontent-%COMP%], .img-9[_ngcontent-%COMP%], .img-13[_ngcontent-%COMP%] {\r\n    left : 0px;\r\n}\r\n\r\n.img-2[_ngcontent-%COMP%], .img-6[_ngcontent-%COMP%], .img-10[_ngcontent-%COMP%], .img-14[_ngcontent-%COMP%] {\r\n    left : -150px;\r\n}\r\n\r\n.img-3[_ngcontent-%COMP%], .img-7[_ngcontent-%COMP%], .img-11[_ngcontent-%COMP%], .img-15[_ngcontent-%COMP%] {\r\n    left : -300px;\r\n}\r\n\r\n.img-4[_ngcontent-%COMP%], .img-8[_ngcontent-%COMP%], .img-12[_ngcontent-%COMP%], .img-16[_ngcontent-%COMP%] {\r\n    left : -450px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvdGlsZS90aWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0k7a0JBQ2M7SUFDZDtnQkFDWTtJQUNaLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLFdBQVc7SUFDWCxlQUFlO0lBQ2YsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLDRDQUE0QztJQUM1QzttQkFDZTtBQUNuQjs7QUFDQTtJQUNJLFVBQVU7SUFDVixXQUFXO0FBQ2Y7O0FBQ0E7SUFDSSxTQUFTO0FBQ2I7O0FBQ0E7SUFDSSxZQUFZO0FBQ2hCOztBQUNBO0lBQ0ksWUFBWTtBQUNoQjs7QUFDQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBQ0E7SUFDSSxhQUFhO0FBQ2pCOztBQUNBO0lBQ0ksYUFBYTtBQUNqQjs7QUFDQTtJQUNJLGFBQWE7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy90aWxlL3RpbGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4udGlsZSB7XHJcbiAgICAvKndpZHRoOjE0MnB4O1xyXG4gICAgaGVpZ2h0OjE0MnB4OyovXHJcbiAgICAvKndpZHRoOjIwJTtcclxuICAgIGhlaWdodDoyMCU7Ki9cclxuICAgIG92ZXJmbG93OmhpZGRlbjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6Z3JleTtcclxuICAgIG1hcmdpbjogNHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgLypib3JkZXI6IDFweCBzb2xpZCBibGFjazsqL1xyXG59XHJcblxyXG4uaW1nIHtcclxuICAgIHBvc2l0aW9uOnJlbGF0aXZlO1xyXG4gICAgLypiYWNrZ3JvdW5kLWltYWdlIDogdXJsKCcvYXNzZXRzL2JnLmpwZycpOyovXHJcbiAgICAvKndpZHRoOiA2MDBweDtcclxuICAgIGhlaWdodDogNjAwcHg7Ki9cclxufVxyXG4uaW1nLTAge1xyXG4gICAgdG9wOiAyMDBweDtcclxuICAgIGxlZnQ6IDIwMHB4O1xyXG59XHJcbi5pbWctMSwgLmltZy0yLCAuaW1nLTMsIC5pbWctNCB7XHJcbiAgICB0b3AgOiAwcHg7XHJcbn1cclxuLmltZy01LCAuaW1nLTYsIC5pbWctNywgLmltZy04IHtcclxuICAgIHRvcCA6IC0xNTBweDtcclxufVxyXG4uaW1nLTksIC5pbWctMTAsIC5pbWctMTEsIC5pbWctMTIge1xyXG4gICAgdG9wIDogLTMwMHB4O1xyXG59XHJcbi5pbWctMTMsIC5pbWctMTQsIC5pbWctMTUsIC5pbWctMTYge1xyXG4gICAgdG9wIDogLTQ1MHB4O1xyXG59XHJcblxyXG4uaW1nLTEsIC5pbWctNSwgLmltZy05LCAuaW1nLTEzIHtcclxuICAgIGxlZnQgOiAwcHg7XHJcbn1cclxuLmltZy0yLCAuaW1nLTYsIC5pbWctMTAsIC5pbWctMTQge1xyXG4gICAgbGVmdCA6IC0xNTBweDtcclxufVxyXG4uaW1nLTMsIC5pbWctNywgLmltZy0xMSwgLmltZy0xNSB7XHJcbiAgICBsZWZ0IDogLTMwMHB4O1xyXG59XHJcbi5pbWctNCwgLmltZy04LCAuaW1nLTEyLCAuaW1nLTE2IHtcclxuICAgIGxlZnQgOiAtNDUwcHg7XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TileComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-tile',
                templateUrl: './tile.component.html',
                styleUrls: ['./tile.component.css']
            }]
    }], null, { ImageUrl: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], Tile: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], childEvent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\Source\patrick_th_lai\Github\Angular\puzzle\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map