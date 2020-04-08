//import React from 'react';
//import ReactDOM from 'react-dom';

//const myelement = <h1>I Love JSX!</h1>;

//ReactDOM.render(myelement, document.getElementById('hello-example'));

let GameStatus = {}
GameStatus.INIT = "10";
GameStatus.PROCESS = "20";
GameStatus.END = "30"

function UserButton(props) {
	return(
		<button type="button" class="btn btn-secondary btn-lg" value={props.value} onClick={props.onClick}>
			{props.text}
		</button>
	);
}
{/*<li><a class="page-link" href="#" data_a={props.a} data_b={props.b} data_oper={props.oper} key={props.keyx}>{props.keyx}</a></li>*/}
function QuestionItem(props) {
	const classNameBase = "btn btn-lg";
	let className = props.selected ? "btn-primary" : "btn-outline-primary";
	if (props.isans) {
		if (props.iscorrect)
			className = props.selected ? "btn-success" : "btn-outline-success";
		else 
			className = props.selected ? "btn-danger" : "btn-outline-danger";
	}
	
	className = classNameBase + " " + className;
	return(			
		<button type="button" class={className} value={props.keyx} onClick={props.onClick}>
			{props.keyx}
		</button>
	)
}

function DisplayItem(props) {
	let q = props.question;
	let className = "";
	if (q.ans && q.correct)
		className = "correct";
	else if (q.ans && !q.correct)
		className = "error";
	const symbol = q.oper == "0" ? "+" : "-";
	return(
		<div class={className}>{q.a} {symbol} {q.b} = {q.ans}</div>
	)
}

function checkAns(a, b, oper, ans){
	if (!ans)
		return false;
	if (oper == "0") {
		return (a + b == ans);
	}
	else {
		return (a - b == ans);
	}		
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
	}
	render() {
		const list = this.props.questions.map((x, i) => {
			let selected = false;
			if (this.props.currentIdx == i)
				selected = true;
				
			let isAns = false;
			let isCorrect = null;
			if (this.props.status == GameStatus.END) {
				isAns = x.ans == null ? false : true;
				isCorrect = checkAns(x.a, x.b, x.oper, x.ans);
			}
			
			return(
				<QuestionItem keyx={i+1} selected={selected} isans={isAns} iscorrect={isCorrect} onClick={()=> this.props.onClick(i)}/>
			)
		});

		return(
			<div class="btn-group" role="group">
				{list}
			</div>
		)
	}
}


class UserInput extends React.Component {
	renderUserButton(text, value) {
		return(
			<UserButton text={text} value={value} onClick={() => this.props.onClick(value)} />
		);
	}

	render() {
		let className = "btn-group-vertical";
		if (this.props.status != GameStatus.PROCESS)
			className += " hide";
		return(
			<div class={className}>
				<div class="btn-group" role="group">
					{this.renderUserButton("7", "7")}
					{this.renderUserButton("8", "8")}
					{this.renderUserButton("9", "9")}
				</div>
				<div class="btn-group" role="group">
					{this.renderUserButton("4", "4")}
					{this.renderUserButton("5", "5")}
					{this.renderUserButton("6", "6")}
				</div>
				<div class="btn-group" role="group">
					{this.renderUserButton("1", "1")}
					{this.renderUserButton("2", "2")}
					{this.renderUserButton("3", "3")}
				</div>
				<div class="btn-group" role="group">
					{this.renderUserButton("Clear", "C")}
					{this.renderUserButton("0", "0")}
					{this.renderUserButton("OK", "Y")}
				</div>
			</div>
		);
	}
}

class Result extends React.Component {
	constructor(props) {
		super(props);		
	}
	
	render() {
		let cnt = 0;
		let ans = 0;
		this.props.questions.map((x, i) => {
			if (!(x.ans === null)) {
				ans++;
				if (x.correct)
					cnt++;
			}
		});
		const result = ans == this.props.questions.length
		let className = "btn-group-vertical";
		if (this.props.status != GameStatus.END)
			className += " hide";
		return(
			<div class={className}>
				<span>Game Completed!</span><br/>
				<span>You got {cnt} out of {this.props.questions.length}</span><br/>
				<button type="button" class="btn btn-primary" onClick={this.props.onClick}>Retry</button>
			</div>
		)
	}
}


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status : GameStatus.PROCESS, 
			gameType : 1,			// "1" : one way;
			questions : initQuestion(),
			currentIdx : 0,
			currentAns : null
		}
	}
	
	fnQestionChange(i) {
		// mark answer for old question
		const q = this.state.questions;
		const currentQ = q[this.state.currentIdx];
		currentQ.ans = this.state.currentAns;
		if (!(currentQ.ans == null)) {
			currentQ.correct = checkAns(currentQ.a, currentQ.b, currentQ.oper, currentQ.ans);
		}
		else {
			currentQ.correct = null;
		}
		this.setState({
			currentIdx: i,
			currentAns: q[i].ans
		});
	}
	
	handleRetryClick() {
		this.setState({
			status : GameStatus.PROCESS,
			questions : initQuestion(),
			currentIdx : 0,
			currentAns : null
		})	
	}	
	
	//change question by user
	handleQuestionClick(i) {
	
		//if (this.state.gameType != "1") {
		if (this.state.status == GameStatus.END) {
			this.fnQestionChange(i);
		}
	}
	
	handleClick(i) { 
		let ans = this.state.currentAns;
		if (i == "C") {
			ans = null;
			this.setState({
				currentAns: ans
			});
		}
		else if (i == "Y") {
			{/* answer and open next question */}
			console.log(ans);
			if (!(ans == null)) {
				if (this.state.gameType == "1") {
					if ((this.state.currentIdx + 1) == this.state.questions.length) {
						this.setState({
							status : GameStatus.END
						});
					}
				}
				let nextIdx = this.state.currentIdx + 1;
				if (nextIdx >= this.state.questions.length){
					nextIdx = 0;
				}
				this.fnQestionChange(nextIdx);
				
			}
		}
		else {
			ans = this.state.currentAns ? this.state.currentAns + i : i;
			ans = parseInt(ans, 10);
			this.setState({
				currentAns: ans
			});
		}
	}
	
	render() {
		const currentQ = this.state.questions[this.state.currentIdx];
		const symbol = currentQ.oper == "0" ? "+" : "-";
		return(
			<div>
				<QuestionList questions={this.state.questions} currentIdx={this.state.currentIdx} status={this.state.status} onClick={(i) => this.handleQuestionClick(i)}/>	
				<div class="display"><h1>{currentQ.a} {symbol} {currentQ.b} = {this.state.currentAns}</h1></div>				
				{/*<DisplayItem question={currentQ}/>*/}
				<UserInput questions={this.state.questions} status={this.state.status} onClick={(i) => this.handleClick(i)}/>
				<Result questions={this.state.questions} status={this.state.status} onClick={() => this.handleRetryClick()}/>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));