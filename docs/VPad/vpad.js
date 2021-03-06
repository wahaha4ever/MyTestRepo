// reference : http://www.aaronbell.com/mobile-touch-controls-from-scratch/
// heavy modification from http://air.github.io/encounter/js/Touch.js
(function(VPad) {
	'use strict';

	
	var CONTROLS_CSS_NOFILL = 'opacity:0.3; z-index: 11000; border-style: dashed; border-width: 1px; text-align: center';
	var CONTROLS_CSS =  'background-color: red; ' + CONTROLS_CSS_NOFILL;
	var DPAD_BUTTON_WIDTH_PERCENT = 18;
	var DPAD_BUTTON_HEIGHT_PERCENT = 12;
	var COLOR_BUTTON_PRESS = "yellow";
	var COLOR_BUTTON_UNPRESS = "red";

	var dpad = {};
	var buttons = {};
	var keyStatus = {};
	var lastDPadPressed = null;
	
	function initButton(id, txt, fnPress, fnUnpress){
		let button = document.createElement("div");
		button.id = id;
		button.className = "dp dp" + txt;
		button.style.cssText = CONTROLS_CSS;
		button.style.width = DPAD_BUTTON_WIDTH_PERCENT + '%';
		button.style.height = DPAD_BUTTON_HEIGHT_PERCENT + '%';
		button.style.backgroundColor = COLOR_BUTTON_UNPRESS;
		button.style.position = 'absolute';
		button.press = () => { if (fnPress) { button.style.backgroundColor = COLOR_BUTTON_PRESS; fnPress();} };
		button.unpress = () => { if (fnUnpress) { button.style.backgroundColor = COLOR_BUTTON_UNPRESS; fnUnpress();} };
		
		return button;
	}
	
	function createDPad(bIsEightWay) {
		let button;
		if (bIsEightWay) {
			button = createDPadButton("1", "left-down", function() { 
				keyStatus["left"] = true; keyStatus["down"] = true; writeInfo("Press 1");
			}, function() { 
				keyStatus["left"] = false; keyStatus["down"] = false; writeInfo("UnPress 1");
			});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
			button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
			dpad["1"] = button;
		}
		
		button = createDPadButton("2", "down", function() { 
			keyStatus["down"] = true; writeInfo("Press 2");
		}, function() { 
			keyStatus["down"] = false; writeInfo("UnPress 2");
		});
		button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
		button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
		dpad["2"] = button;
		
		if (bIsEightWay) {
			button = createDPadButton("3", "right-down", function() { 
				keyStatus["right"] = true; keyStatus["down"] = true; writeInfo("Press 3");
			}, function() { 
				keyStatus["right"] = false; keyStatus["down"] = false; writeInfo("UnPress 3");
			});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
			button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';
			dpad["3"] = button;
		}

		button = createDPadButton("4", "left", function() { 
			keyStatus["left"] = true; writeInfo("Press 4");
		}, function() { 
			keyStatus["left"] = false; writeInfo("UnPress 4");
		});
		button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
		button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
		dpad["4"] = button;	
		
		button = createDPadButton("5", "center", null, null);
		button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
		button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
		dpad["5"] = button;	
		
		button = createDPadButton("6", "right", function() { 
			keyStatus["right"] = true; writeInfo("Press 6");
		}, function() { 
			keyStatus["right"] = false; writeInfo("UnPress 6");
		});
		button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
		button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';
		dpad["6"] = button;	
		
		if (bIsEightWay) {
			button = createDPadButton("7", "left-up", function() { 
				keyStatus["left"] = true; keyStatus["up"] = true; writeInfo("Press 7");
			}, function() { 
				keyStatus["left"] = false; keyStatus["up"] = false; writeInfo("UnPress 7");
			});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
			button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
			dpad["7"] = button;
		}
		
		button = createDPadButton("8", "up", function() { 
			keyStatus["up"] = true; writeInfo("Press 8");
		}, function() { 
			keyStatus["up"] = false; writeInfo("UnPress 8");
		});
		button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
		button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
		dpad["8"] = button;

		if (bIsEightWay) {	
			button = createDPadButton("9", "right-up", function() { 
				keyStatus["right"] = true; keyStatus["up"] = true; writeInfo("Press 9");
			}, function() { 
				keyStatus["right"] = false; keyStatus["up"] = false; writeInfo("UnPress 9");
			});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
			button.style.left = (DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';
			dpad["9"] = button;		
		}

	}
	
	function createDPadButton(id, txt, fnPress, fnUnpress) {
		//let button = document.createElement("div");
		//button.id = id;
		//button.style.cssText = CONTROLS_CSS;
		//button.style.width = DPAD_BUTTON_WIDTH_PERCENT + '%';
		//button.style.height = DPAD_BUTTON_HEIGHT_PERCENT + '%';
		//button.style.backgroundColor = COLOR_BUTTON_UNPRESS;
		//button.style.position = 'absolute';
		//button.press = () => { button.style.backgroundColor = "yellow"; fnPress(); };
		//button.unpress = () => { button.style.backgroundColor = "red"; fnUnpress(); };
		let button = initButton(id, txt, fnPress, fnUnpress);
		
		// press handler for basic touchstart case
		button.addEventListener('touchstart', function(event) {
			lastDPadPressed = button.id;
			event.preventDefault();
			button.press();
		});
		// touch left the canvas, seems rarely called
		button.addEventListener('touchleave', function(event) {
			event.preventDefault();
			button.unpress();
		});
		// touch ended. The touch may have moved to another button, so handle that
		button.addEventListener('touchend', function(event) {
			event.preventDefault();
			var elementBeingTouched = getIdOfTouchedElement(event);
			if (elementBeingTouched in dpad)
			{
				dpad[elementBeingTouched].unpress();
			}
		});
		// if a touch has moved onto another button, unpress this and press the other one
		button.addEventListener('touchmove', function(event) {
			event.preventDefault();
			var elementBeingTouched = getIdOfTouchedElement(event);
			if (elementBeingTouched === lastDPadPressed)
			{
				// no change, no op
			}
			else if (elementBeingTouched in dpad) // verify we moved onto a dpad button
			{
				// unpress the last button if that's appropriate
				if (lastDPadPressed in dpad)
				{
					dpad[lastDPadPressed].unpress();
				}
				// press the new button
				dpad[elementBeingTouched].press();
				lastDPadPressed = elementBeingTouched;
			}
			else // we moved off the dpad
			{
				// unpress the last button if that's appropriate
				if (lastDPadPressed in dpad)
				{
					dpad[lastDPadPressed].unpress();
				}
				lastDPadPressed = null;
			}
		});
		document.body.appendChild(button);
		return button;
	}
	
	function getIdOfTouchedElement(touchEvent) {
		var touch = touchEvent.changedTouches[0];
		var element = document.elementFromPoint(touch.clientX, touch.clientY);
		// this can return null
		if (element !== null && 'id' in element)
		{
			return element.id;
		}
		else
		{
			return null;
		}
	};

	
	function createAction(txtA, txtB, txtX, txtY) {
		let button;
		if (txtA) {
			button = createActionButton("A", txtA, function() { keyStatus["A"] = true; writeInfo("Press A");}, function() { keyStatus["A"] = false; writeInfo("UnPress A");});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
			button.style.right = (DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
			buttons["A"] = button;
			//buttons["A"].innerHTML = txtA;
		}
		if (txtB) {
			button = createActionButton("B", txtB, function() { keyStatus["B"] = true; writeInfo("Press B");}, function() { keyStatus["B"] = false; writeInfo("UnPress B");});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
			button.style.right = (DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
			buttons["B"] = button;
			//buttons["B"].innerHTML = txtB;
		}
		if (txtX) {
			button = createActionButton("X", txtX, function() { keyStatus["X"] = true; writeInfo("Press X");}, function() { keyStatus["X"] = false; writeInfo("UnPress X");});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
			button.style.right = (DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
			buttons["X"] = button;
			//buttons["X"].innerHTML = txtX;
		}
		if (txtY) {
			button = createActionButton("Y", txtY, function() { keyStatus["Y"] = true; writeInfo("Press Y");}, function() { keyStatus["Y"] = false; writeInfo("UnPress Y");});
			button.style.bottom = (DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
			button.style.right = (DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
			buttons["Y"] = button;
			//buttons["Y"].innerHTML = txtY;
		}
	}
	
	function createActionButton(id, txt, fnPress, fnUnpress) {
		//let button = document.createElement("div");
		//button.id = id;
		//button.style.cssText = CONTROLS_CSS;
		//button.style.width = DPAD_BUTTON_WIDTH_PERCENT + '%';
		//button.style.height = DPAD_BUTTON_HEIGHT_PERCENT + '%';
		//button.style.position = 'absolute';
		//button.press = () => { button.style.backgroundColor = "yellow"; fnPress(); };
		//button.unpress = () => { button.style.backgroundColor = "red"; fnUnpress(); };
		let button = initButton(id, txt, fnPress, fnUnpress);
		
		// press handler for basic touchstart case
		button.addEventListener('touchstart', function(event) {
			event.preventDefault();
			button.press();
		});
		// touch left the canvas, seems rarely called
		button.addEventListener('touchleave', function(event) {
			event.preventDefault();
			button.unpress();
		});
		// touch ended. The touch may have moved to another button, so handle that
		button.addEventListener('touchend', function(event) {
			event.preventDefault();
			button.unpress();
			//var elementBeingTouched = getIdOfTouchedElement(event);
			//if (elementBeingTouched in dpad)
			//{
			//	dpad[elementBeingTouched].unpress();
			//}
		});
		//// if a touch has moved onto another button, unpress this and press the other one
		//button.addEventListener('touchmove', function(event) {
		//	event.preventDefault();
		//	var elementBeingTouched = getIdOfTouchedElement(event);
		//	if (elementBeingTouched === lastDPadPressed)
		//	{
		//		// no change, no op
		//	}
		//	else if (elementBeingTouched in dpad) // verify we moved onto a dpad button
		//	{
		//		// unpress the last button if that's appropriate
		//		if (lastDPadPressed in dpad)
		//		{
		//			dpad[lastDPadPressed].unpress();
		//		}
		//		// press the new button
		//		dpad[elementBeingTouched].press();
		//		lastDPadPressed = elementBeingTouched;
		//	}
		//	else // we moved off the dpad
		//	{
		//		// unpress the last button if that's appropriate
		//		if (lastDPadPressed in dpad)
		//		{
		//			dpad[lastDPadPressed].unpress();
		//		}
		//		lastDPadPressed = null;
		//	}
		//});
		//button.addEventListener('touchleave', function(event) {
		//	event.preventDefault();
		//	button.unpress();
		//});
		document.body.appendChild(button);
		return button;
	}
	
	function writeInfo(txt) {
		//var orgText = document.getElementById("info").innerHTML;
		//orgText = txt + "</br>" + orgText;
		//document.getElementById("info").innerHTML = orgText;
	}
	
	VPad.init = function(size, bIsEightWay, txtA, txtB, txtX, txtY) {
		if (size == "S") {
			DPAD_BUTTON_WIDTH_PERCENT = 6;
			DPAD_BUTTON_HEIGHT_PERCENT = 4;
		}
		if (size == "M") {
			DPAD_BUTTON_WIDTH_PERCENT = 12;
			DPAD_BUTTON_HEIGHT_PERCENT = 8;
		}
		createDPad(bIsEightWay);
		createAction(txtA, txtB, txtX, txtY);
	}

	VPad.getStatus = function() {
		return keyStatus;
	}
})(this.VPad = this.VPad || {});

