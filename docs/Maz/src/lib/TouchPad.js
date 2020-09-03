'use strict';

var TouchPad = function(containerID, domElement, zIndex) {
    
    /* private variable */
    var rotate = {};
    var container = document.createElement("div");
    var touchArea = document.createElement("div");
    var touchHandler = document.createElement("div");

    function initDivControl() {

        let mouseDown = false;
        //let touchArea = domElement.getElementById("touchArea");
        zIndex = zIndex || 10000;

        container.setAttribute("id", containerID);
        container.className = "touchPad";
        domElement.body.appendChild(container);

        touchArea.setAttribute("id", "touchArea");
        touchArea.className = "touchArea";
        container.appendChild(touchArea);

        touchHandler.setAttribute("id", "touchHandler");
        touchHandler.className = "touchHandler";
        touchArea.appendChild(touchHandler);

        let handlerCursor = document.createElement("div");
        handlerCursor.className = "touchHandlerCursor";
        touchHandler.appendChild(handlerCursor);
        
        //let container = domElement.getElementById(containerID);
        

        // mouse event
        touchArea.addEventListener("mousedown", function(event){
            mouseDown = true;
            //event.preventDefault();
            update(event.pageX, event.pageY);
        });    
        document.addEventListener("mouseup", function () {
            mouseDown = false;
            //event.preventDefault();
            reset();
        });    
        document.addEventListener("mousemove", function(event) {
            //event.preventDefault();
            if (mouseDown) 
                update(event.pageX, event.pageY);
        });

        //touch event
        touchArea.addEventListener("touchstart", function (event) {
            mouseDown = true;
            //event.preventDefault();
            update(event.targetTouches[0].pageX, event.targetTouches[0].pageY);
        });
    
        document.addEventListener("touchend", function (event) {
            //event.preventDefault();
            mouseDown = false;
            reset();
        });
    
        document.addEventListener("touchmove", function(event) {
            //event.preventDefault();
            if (mouseDown) 
                update(event.touches[0].pageX, event.touches[0].pageY);
        });

        reset();
    }   

    function reset() {
        rotate = { x : 0, y : 0 };
        updateHandler(rotate.x, rotate.y);
        //console.log(`reset ${rotate.x}, ${rotate.y}`);
    }
    
    function updateHandler(nx, ny) {
        /*let dom = touchArea.getBoundingClientRect();
        let radius = dom.width / 2;
        let centerX = dom.left + radius;
        let centerY = dom.top + radius;*/

        /* convert -1 .. +1 to 0 .. 100% */
        let dom = touchArea.getBoundingClientRect();
        let radius = dom.width
        let left = nx + 1       // tranform -1 .. +1 to 0 .. 2
        left *= 50;             // tranform 0 .. 2 to 0 .. 100;

        let top = (ny * -1)     // transform upward positive to downward positive
        top = top + 1           // tranform -1 .. +1 to 0 .. 2
        top *= 50;              // tranform 0 .. 2 to 0 .. 100;

        touchHandler.style.left = left + '%';
        touchHandler.style.top = top + '%';
    }

    function update(x, y) {
        //let distanceSqrt = Math.pow(x - prop.centerX, 2) + Math.pow(y - prop.centerY, 2);
        
        let dom = touchArea.getBoundingClientRect();
        let radius = dom.width / 2;
        let centerX = dom.left + radius;
        let centerY = dom.top + radius;

        // x and y from center
        let nx = x - centerX;
        let ny = y - centerY;
        //console.log(`before ${nx}, ${ny}`);
        //calculate distance between user point and the center
        let distance = Math.sqrt(Math.pow(nx, 2) + Math.pow(ny, 2));
        //normalize
        nx = nx / distance;             //left should be +ve
        ny = ny / distance * -1;        //make sure upward should be +ve

        rotate = { x : nx, y : ny};
        updateHandler(rotate.x, rotate.y);

        //console.log(`after ${nx}, ${ny}`);
    }

    /* public function */
    this.getRotation = function() {
        return rotate;
    };

    initDivControl();
};

//TouchPad.prototype.constructor = TouchPad;
export { TouchPad };