class GameWorld {

    constructor(canvasId){
        this.canvas = null;
        this.context = null;
        this.oldTimeStamp = 0;
        this.gameObjects = [];
        this.resetCounter = 0;

        this.init(canvasId);
    }

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');

        this.createWorld();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame((timeStamp) => {this.gameLoop(timeStamp)});
    }

    createWorld() {
        this.gameObjects = [
            //new Square(this.context, 250, 50, 0, 50, 1),
            //new Square(this.context, 250, 300, 0, -50, 200),
            //new Square(this.context, 200, 0, 50, 50, 1),
            //new Square(this.context, 250, 150, 50, 50, 1),
            //new Square(this.context, 300, 75, -50, 50, 1),
            //new Square(this.context, 300, 300, 50, -50, 1)
            new Circle(this.context, 250, 50, 0, 50, 1),
            new Circle(this.context, 250, 300, 0, -50, 200),
            new Circle(this.context, 200, 0, 50, 50, 1),
            new Circle(this.context, 250, 150, 50, 50, 1),
            new Circle(this.context, 300, 75, -50, 50, 1),
            new Circle(this.context, 300, 300, 50, -50, 1)
        ];
    }

    gameLoop(timeStamp) {
        // Calculate how much time has passed
        var secondsPassed = (timeStamp - this.oldTimeStamp) / 1000;
		secondsPassed = Math.min(secondsPassed, 0.0167);

        this.oldTimeStamp = timeStamp;

        // Loop over all game objects to update
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update(secondsPassed);
        }

        this.detectCollisions();
		this.detectEdgeCollisions();

        this.clearCanvas();

        // Loop over all game objects to draw
        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        // The loop function has reached it's end
        // Keep requesting new frames
        window.requestAnimationFrame((timeStamp) => this.gameLoop(timeStamp));
    }

    detectCollisions() {
        var obj1;
        var obj2;

        for (var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }

        for (var i = 0; i < this.gameObjects.length; i++)
        {
            obj1 = this.gameObjects[i];
            for (var j = i + 1; j < this.gameObjects.length; j++)
            {
                obj2 = this.gameObjects[j];

                //if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                //    obj1.isColliding = true;
                //    obj2.isColliding = true;
				//
                //    var vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                //    var distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                //    var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                //    var vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                //    var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
				//
                //    if (speed < 0) {
                //        break;
                //    }
				//
                //    var impulse = 2 * speed / (obj1.mass + obj2.mass);
                //    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                //    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                //    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                //    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                //}
				if (this.circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
					obj1.isColliding = true;
					obj2.isColliding = true;
					
                    var vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                    var distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                    var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    var vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                    var speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
				
                    if (speed < 0) {
                        break;
                    }
				
                    var impulse = 2 * speed / (obj1.mass + obj2.mass);
                    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);                
				}
            }
        }
    }
	
	
	
	 detectEdgeCollisions()
	 {
		 let restitution = 0.90;
		 let canvasWidth = this.canvas.width;
		 let canvasHeight = this.canvas.height;
		 let obj;
		 for (let i = 0; i < this.gameObjects.length; i++)
		 {
			 obj = this.gameObjects[i];

			 // Check for left and right
			 if (obj.x < obj.radius){
				 obj.vx = Math.abs(obj.vx) * restitution;
				 obj.x = obj.radius;
			 }else if (obj.x > canvasWidth - obj.radius){
				 obj.vx = -Math.abs(obj.vx) * restitution;
				 obj.x = canvasWidth - obj.radius;
			 }

			 // Check for bottom and top
			 if (obj.y < obj.radius){
				 obj.vy = Math.abs(obj.vy) * restitution;
				 obj.y = obj.radius;
			 } else if (obj.y > canvasHeight - obj.radius){
				 obj.vy = -Math.abs(obj.vy) * restitution;
				 obj.y = canvasHeight - obj.radius;
			 }
		 }
	}

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {

        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }

        return true;
    }
	
	circleIntersect(x1, y1, r1, x2, y2, r2) {

		// Calculate the distance between the two circles
		let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);

		// When the distance is smaller or equal to the sum
		// of the two radius, the circles touch or overlap
		return squareDistance <= ((r1 + r2) * (r1 + r2))
	}

    clearCanvas() {
        // Clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
