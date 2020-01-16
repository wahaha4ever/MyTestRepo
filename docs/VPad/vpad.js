// reference : http://www.aaronbell.com/mobile-touch-controls-from-scratch/
// heavy modification from http://air.github.io/encounter/js/Touch.js
(function(VPad) {
	'use strict';

	VPad.CONTROLS_CSS_NOFILL = 'opacity:0.1; z-index: 11000; border-style: dashed; border-width: 1px';
	VPad.CONTROLS_CSS =  'background-color: red; ' + VPad.CONTROLS_CSS_NOFILL;
	VPad.DPAD_BUTTON_WIDTH_PERCENT = 18;
	VPad.DPAD_BUTTON_HEIGHT_PERCENT = 12;

	var dpad = {};
	var buttons = {};
	var keyStatus = {};
	var lastDPadPressed = null;
	
	function createDPad(intWays) {
		
		let button = createDPadButton("1", function() { 
			keyStatus["left"] = true; keyStatus["down"] = true; writeInfo("Press 1");
		}, function() { 
			keyStatus["left"] = false; keyStatus["down"] = false; writeInfo("UnPress 1");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
		dpad["1"] = button;
		
		button = createDPadButton("2", function() { 
			keyStatus["down"] = true; writeInfo("Press 2");
		}, function() { 
			keyStatus["down"] = false; writeInfo("UnPress 2");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
		dpad["2"] = button;
		
		button = createDPadButton("3", function() { 
			keyStatus["right"] = true; keyStatus["down"] = true;  writeInfo("Press 3");
		}, function() { 
			keyStatus["right"] = false; keyStatus["down"] = false;  writeInfo("UnPress 3");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';
		dpad["3"] = button;

		button = createDPadButton("4", function() { 
			keyStatus["left"] = true; writeInfo("Press 4");
		}, function() { 
			keyStatus["left"] = false; writeInfo("UnPress 4");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
		dpad["4"] = button;	
		
		button = createDPadButton("5", function() {}, function() {});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
		dpad["5"] = button;	
		
		button = createDPadButton("6", function() { 
			keyStatus["right"] = true; writeInfo("Press 6");
		}, function() { 
			keyStatus["right"] = false; writeInfo("UnPress 6");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';
		dpad["6"] = button;	
		
		button = createDPadButton("7", function() { 
			keyStatus["left"] = true; keyStatus["up"] = true;  writeInfo("Press 7");
		}, function() { 
			keyStatus["left"] = false; keyStatus["up"] = false;  writeInfo("UnPress 7");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
		dpad["7"] = button;
		
		button = createDPadButton("8", function() { 
			keyStatus["up"] = true; writeInfo("Press 8");
		}, function() { 
			keyStatus["up"] = false; writeInfo("UnPress 8");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 1) + '%';
		dpad["8"] = button;
		
		button = createDPadButton("9", function() { 
			keyStatus["right"] = true; keyStatus["up"] = true; writeInfo("Press 9");
		}, function() { 
			keyStatus["right"] = false; keyStatus["up"] = false; writeInfo("UnPress 9");
		});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
		button.style.left = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';
		dpad["9"] = button;		

	}
	
	function createDPadButton(id, fnPress, fnUnpress) {
		let button = document.createElement("div");
		button.id = id;
		button.style.cssText = VPad.CONTROLS_CSS;
		button.style.width = VPad.DPAD_BUTTON_WIDTH_PERCENT + '%';
		button.style.height = VPad.DPAD_BUTTON_HEIGHT_PERCENT + '%';
		button.style.position = 'absolute';
		button.press = () => { button.style.backgroundColor = "yellow"; fnPress(); };
		button.unpress = () => { button.style.backgroundColor = "red"; fnUnpress(); };
		
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
	
	function createAction() {
		let button = createActionButton("A", function() { keyStatus["A"] = true; writeInfo("Press A");}, function() { keyStatus["A"] = false; writeInfo("UnPress A");});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 0) + '%';
		button.style.right = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
		buttons["A"] = button;
		
		button = createActionButton("B", function() { keyStatus["B"] = true; writeInfo("Press B");}, function() { keyStatus["B"] = false; writeInfo("UnPress B");});
		button.style.bottom = (VPad.DPAD_BUTTON_HEIGHT_PERCENT * 1) + '%';
		button.style.right = (VPad.DPAD_BUTTON_WIDTH_PERCENT * 0) + '%';
		buttons["B"] = button;
	}
	
	function createActionButton(id, fnPress, fnUnpress) {
		let button = document.createElement("div");
		button.id = id;
		button.style.cssText = VPad.CONTROLS_CSS;
		button.style.width = VPad.DPAD_BUTTON_WIDTH_PERCENT + '%';
		button.style.height = VPad.DPAD_BUTTON_HEIGHT_PERCENT + '%';
		button.style.position = 'absolute';
		button.press = fnPress;
		button.unpress = fnUnpress;
		
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
	
	VPad.init = function() {
		createDPad();
		createAction();
	}

	VPad.getStatus = function() {
		return keyStatus;
	}
})(this.VPad = this.VPad || {});

