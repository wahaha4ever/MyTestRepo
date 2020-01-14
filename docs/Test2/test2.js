	(function(window){
		'use strict';
		let myReq;
		function run() {
			let canvas = document.getElementById("myCanvas");
			let ctx = canvas.getContext("2d");
			
			ctx.clearRect(0,0, 100,100);
			
			ctx.strokeStyle = "#000";
			ctx.lineWidth = 2;
			ctx.moveTo(0, 0);
			ctx.lineTo(100, 100);
			ctx.stroke();
			
			
			//var canvas = document.getElementById('canvas');
			//var ctx = canvas.getContext('2d');
			ctx.lineJoin = ctx.lineCap = 'round';
			
			// Draw a Blue dot on the middle of the canvas
			ctx.beginPath();
			ctx.lineWidth = 50;
			ctx.strokeStyle = 'blue';
			ctx.lineTo(canvas.width / 2, canvas.height / 2);
			ctx.stroke();
			
			// Draw a diagonal Red line on the canvas
			ctx.beginPath();
			ctx.lineWidth = 5;
			ctx.strokeStyle = '#FF0';
			ctx.moveTo(20, 20);
			ctx.lineTo(canvas.width - 20, canvas.height - 20);
			ctx.stroke();
			
			cancelAnimationFrame(myReq);
			myReq = requestAnimationFrame( run );

		}
		myReq = requestAnimationFrame ( run );
	})(this);