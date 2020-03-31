
//function initQuestion() {
//	let questions = [];
//	let a = 0;
//	let b = 0;
//	let oper = 0;
//	let max = 99;
//	let min = 1;
//	for(var i = 0; i < 10; i++){
//		let correct = false;
//		oper = getRandomInt(2);	//0 : +; 1 : -
//
//		while (!correct) {
//			b = getRandomInt(max) + min;
//			for (j = 0; j < 10; j++) {
//				a = getRandomInt(max) + min;
//				if (oper == 0) {
//					correct = true;
//					break;
//				}
//				if (oper == 1 && a >= b) {
//					correct = true;
//					break;
//				}
//			}
//		}
//		questions.push({ a : a, b : b, oper : oper});
//	}
//	
//	console.log(questions);
//	return questions;
//}
//
//
//function getRandomInt(max) {
//	return Math.floor(Math.random() * Math.floor(max));
//}
//
//initQuestion();