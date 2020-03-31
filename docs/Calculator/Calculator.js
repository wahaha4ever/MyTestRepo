//import React from 'react';
//import ReactDOM from 'react-dom';

const myelement = <h1>I Love JSX!</h1>;

ReactDOM.render(myelement, document.getElementById('hello-example'));

function UserButton(props) {
	return(
		<button type="button" class="btn btn-secondary" value={props.value} onClick={props.onClick}>
			{props.value}
		</button>
	);
}

function QuestionItem(props) {
	return(
		<li><a class="page-link" href="#" data_a={props.a} data_b={props.b} data_oper={props.oper} key={props.keyx}>{props.keyx}</a></li>
	)
}


function initQuestion() {
	let questions = [];
	let a = 0;
	let b = 0;
	let oper = 0;
	let max = 99;
	let min = 1;
	for(var i = 0; i < 10; i++){
		let correct = false;
		oper = getRandomInt(2);	//0 : +; 1 : -

		while (!correct) {
			b = getRandomInt(max) + min;
			for (var j = 0; j < 10; j++) {
				a = getRandomInt(max) + min;
				if (oper == 0) {
					correct = true;
					break;
				}
				if (oper == 1 && a >= b) {
					correct = true;
					break;
				}
			}
		}
		questions.push({ a : a, b : b, oper : oper});
	}
	
	console.log(questions);
	return questions;
}


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

class QuestionList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question : initQuestion()
		}
	}
	
	render() {
		const list = this.state.question.map((x, i) => {
			return(
				<QuestionItem a={x.a} b={x.b} keyx={i+1} oper={x.oper}/>
			)
		});
		return(
			<nav aria-label="Page navigation example">
				<ul class="pagination justify-content-center">
					{list}
				</ul>
			</nav>
		)
	}
}

class UserInput extends React.Component {
	renderUserButton(i) {
		return(
			<UserButton value={i} onClick={() => this.props.onClick(i)} />
		);
	}

	render() {

		return(
			<div class="btn-group-vertical">
				<div class="btn-group" role="group">
					{this.renderUserButton("7")}
					{this.renderUserButton("8")}
					{this.renderUserButton("9")}
				</div>
				<div class="btn-group" role="group">
					{this.renderUserButton("4")}
					{this.renderUserButton("5")}
					{this.renderUserButton("6")}
				</div>
				<div class="btn-group" role="group">
					{this.renderUserButton("1")}
					{this.renderUserButton("2")}
					{this.renderUserButton("3")}
				</div>
				<div class="btn-group" role="group">
					{this.renderUserButton("N")}
					{this.renderUserButton("0")}
					{this.renderUserButton("Y")}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
	}
	
	handleClick(i) { 
		alert(i);
	}
	
	//
	//
	render() {
		return(
			<div>
				<QuestionList/>	
				<UserInput onClick={(i) => this.handleClick(i)}/>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('react-input'));