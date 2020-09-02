var KeyboardAdapter = function(){
	'use strict';
	
	var index;
	var keyConfig;
	this.init = function(index, keyConfig) {
		this.index = index;
		this.keyConfig = keyConfig;
		let that = this;
		
		var onKeyDown = function ( event ) {
			for(var key in that.keyConfig) { 
				if (event.keyCode == that.keyConfig[key].Code) {
					that.keyConfig[key].Value = true;
				}
			};
		};
			
		var onKeyUp = function ( event ) {
			for(var key in that.keyConfig) { 					
				if (event.keyCode == that.keyConfig[key].Code) {
					that.keyConfig[key].Value = false;
				}
			};
		};
		
		document.addEventListener( 'keydown', onKeyDown, false );
		document.addEventListener( 'keyup', onKeyUp, false );
	};
		
	this.getIndex = function() {
		return this.index;
	};
	
	this.getResult = function() {
		return this.keyConfig;
	};
		
		//var isPressed = function(gp, code) {
		//	let type = keyConfig[code].type
		//	let idx = keyConfig[code].idx
		//	if (type == "buttons")
		//	{
		//		if (gp.buttons.length > idx)
		//			return gp.buttons[idx].pressed;
		//		else
		//			return false;
		//	}
		//	else if (type == "axes+") {
		//		if (gp.axes.length > idx)
		//			return gp.axes[idx] > 0.5;
		//		else
		//			return false;
		//	}
		//	else if (type == "axes-") {
		//		if (gp.axes.length > idx)
		//			return gp.axes[idx] < -0.5;
		//		else
		//			return false;
		//	}
		//	else {
		//		return false
		//	}
		//};
		//
		//var getValue = function(gp, code) {
		//	let type = keyConfig[code].type
		//	let idx = keyConfig[code].idx
		//	if (type == "buttons")
		//	{
		//		if (gp.buttons.length > idx)
		//			return gp.buttons[idx].value;
		//		else
		//			return 0;
		//	}
		//	else if (type == "axes+") {
		//		if (gp.axes[idx] > 0.5) 
		//			return gp.axes[idx]
		//		else 
		//			return 0;
		//	}
		//	else if (type == "axes-") {
		//		if (gp.axes[idx] < -0.5) 
		//			return gp.axes[idx]
		//		else 
		//			return 0;
		//	}
		//	else {
		//		return 0
		//	}
		//};
}

export { KeyboardAdapter }