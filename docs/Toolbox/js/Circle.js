class Circle extends GameObject
{
	static g = 9.81;
    constructor (context, x, y, vx, vy, mass){
        super(context, x, y, vx, vy, mass);

        //Set default width and height
        //this.width = 50;
        //this.height = 50;
		this.radius = mass > 100 ? 45 : 25;
    }

    draw(){
		
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
		this.context.fill();
      
    }

    update(secondsPassed){
		
		// Apply acceleration
		this.vy += Circle.g * secondsPassed;
		
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;	
        
    }
}