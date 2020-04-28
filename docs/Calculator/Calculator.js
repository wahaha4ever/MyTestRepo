//import React from 'react';
//import ReactDOM from 'react-dom';

//const myelement = <h1>I Love JSX!</h1>;

//ReactDOM.render(myelement, document.getElementById('hello-example'));

let GameStatus = {}
GameStatus.INIT = "10";
GameStatus.STANDBY = "15";
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
	const classNameBase = "btn";
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
	let status = props.status;
	let currentAns = props.currentAns;
	
	let className = status == GameStatus.INIT || status == GameStatus.STANDBY ? "hide" : "";
	
	//if (status == GameStatus.END) {
	//	if (q.ans && q.correct)
	//		className += " correct";
	//	else if (q.ans && !q.correct)
	//		className += " error";
	//}
	let symbol = ""
	if (q.oper == "0") 
		symbol = "+";
	else if (q.oper == "1")
		symbol = "-";
	else
		symbol = "X";
	return(
		<div class={className}>
			<h1>{q.a} {symbol} {q.b} = {currentAns}</h1>
		</div>
	)
}

function checkAns(a, b, oper, ans){
	if (!ans)
		return false;
	if (oper == "0") {
		return (a + b == ans);
	}
	else if (oper == "1") {
		return (a - b == ans);
	}		
	else {
		return (a * b == ans);
	}
}

function initQuestion2(config) {
	let operator = [];
	let questions = [];
	if (config.plus)
		operator.push(0);	//+
	if (config.sub)
		operator.push(1);	//-
	if (config.multiply)
		operator.push(2);	//*
		
	var fnMax = function(digit) {
		let result = "0";
		for (var i=0; i<digit; i++)
			result += "9";
		return parseInt(result, 10);	
	}
	
	const plusMax = fnMax(config.plusDigit);
	const subMax = fnMax(config.subDigit);
	const multiplyMaxX = config.multiplyX;
	const multiplyMaxY = config.multiplyY;
	for(var i = 0; i < 10; i++){
		let correct = false;
		let oper = operator[getRandomInt(operator.length)];
		let a = 0;
		let b = 0;
		let min = 1;
		let max = 0;
		if (oper == 0)
			max = plusMax;
		if (oper == 1)
			max = subMax;
		if (oper == 2)
			max = multiplyMaxY;
			
		while (!correct) {			
			b = getRandomInt(max) + min;
			console.log(oper);
			console.log(b);
			for (var j = 0; j < 10; j++) {
				a = getRandomInt(max) + min;
				if (oper == 0) {
					correct = true;
					break;
				}
				if (oper == 1 && a > b) {
					correct = true;
					break;
				}
				if (oper == 2) {
					a = getRandomInt(multiplyMaxX) + min;
					correct = true;
					break;
				}
			}
		}
		questions.push({ a : a, b : b, oper : oper});
	}
		
	return questions;	
	
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

class Start extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<button type="button" class="btn btn-Primary btn-lg" onClick={this.props.onClick}>Start!</button>
			</div>
		)
	}
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
		
		const className = this.props.status == GameStatus.INIT ? "hide" : "";

		return(
			<div class={className}>
				<div class="btn-group" role="group">
					{list}
				</div>
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
				<div>
					<span>Game Completed!</span><br/>
					<span>You got {cnt} out of {this.props.questions.length}</span><br/>
				</div>
				<div class="btn-group">
					<button type="button" class="btn btn-primary" value="reinit" onClick={this.props.onClickReinit}>ReInit</button>
					<button type="button" class="btn btn-primary" value="retry" onClick={this.props.onClickRetry}>Retry</button>
				</div>
			</div>
		)
	}
}

class Setup extends React.Component {
	constructor(props) {
		super(props);		
	}
	

	render() {
		let className = this.props.status == GameStatus.INIT ? "" : "hide";
		const { plus, plusDigit, sub, subDigit, multiply, multiplyX, multiplyY } =  this.props.config;
		return(
			<div class={className}>
				<div class="container text-left">
					<div class="card">
						<div class="card-header bg-primary text-white">
							<span>Setup</span>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-12 offset-md-2 col-md-2">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" id="plus" value="plus" checked={plus} onChange={this.props.onChangeChk} />
										<label class="form-check-label" for="plus">Plus</label>
									</div>
								</div>
								<div class="col-5 col-md-1"><input class="form-control" type="text" value={plusDigit} name="plusDigit" onChange={this.props.onChangeTxt} /></div>
							</div>
							<div class="row">
								<div class="col-12 offset-md-2 col-md-2">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" id="sub" value="sub" checked={sub} onChange={this.props.onChangeChk} />
										<label class="form-check-label" for="sub">Minus</label>
									</div>
								</div>
								<div class="col-5 col-md-1"><input class="form-control" type="text" value={subDigit} name="subDigit" onChange={this.props.onChangeTxt} /></div>
							</div>
							<div class="row">
								<div class="col-12 offset-md-2 col-md-2">
									<div class="form-check">
										<input class="form-check-input" type="checkbox" id="multiply" value="multiply" checked={multiply} onChange={this.props.onChangeChk} />
										<label class="form-check-label" for="multiply">Multiply</label>										
									</div>
								</div>
								<div class="col-5 col-md-1"><input class="form-control" type="text" value={multiplyX} name="multiplyX" onChange={this.props.onChangeTxt} /></div>
								<div class="col-1 col-md-1"><label class="form-check-label">X</label></div>
								<div class="col-5 col-md-1"><input class="form-control" type="text" value={multiplyX} name="multiplyX" onChange={this.props.onChangeTxt} /></div>
							</div>
							<div class="row">
								<div class="col-12 offset-md-2 col-md-2">
									<button class="btn btn-primary btn-block" type="button" onClick={this.props.onClickStart}>Start</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			config : {
				plus : true,
				plusDigit : 2,
				sub : true,
				subDigit : 2,
				multiply : true,
				multiplyX : 10,
				multiplyY : 10
			},
			status : GameStatus.INIT, 
			gameType : 1,			// "1" : one way;
			questions : [],//initQuestion(),
			currentIdx : 0,
			currentAns : null,
			startTime : null
		}
	}
	
	fnInit(config) {
		let questions = initQuestion2(config);
		this.setState({
			questions : questions,
			status : GameStatus.STANDBY,
			currentIdx : 0,
			currentAns : null
		});
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
	
	handleInit = e =>  {
		this.fnInit(this.state.config);
	}
	
	handleStart = e => {
		this.setState({
			status : GameStatus.PROCESS,
			startTime : Date.now()
		});
	}
	
	handleTxtChanged = e => {
		const key = e.target.name;
		let value = e.target.value;
		if (value < 1)
			value = 2;
		console.log(value);
		this.setState({
			config :{
				...this.state.config,
				[key] : value
			}
		});
	}
	
	handleTickChanged = e => {
		const key = e.target.value;
		console.log(e.target);
		this.setState({
			config :{
				...this.state.config,
				[key] : !this.state.config[key]
			}
		});
		console.log(this.state.config[key]);
	}
	
	handleResultClick = e => {
		const value = e.target.value;
		if (value == "retry") {
			this.fnInit(this.state.config);
		}
		else {
			this.setState({
				status : GameStatus.INIT
			});
		}
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
		const currentQ = this.state.questions.length > this.state.currentIdx ? this.state.questions[this.state.currentIdx] : null;
		//const symbol = currentQ.oper == "0" ? "+" : "-";
		const status = this.state.status;
		return(
			<div>				
				<Setup status={this.state.status} config={this.state.config} onChangeChk={this.handleTickChanged} onChangeTxt={this.handleTxtChanged} onClickStart={this.handleInit} />
				<QuestionList questions={this.state.questions} currentIdx={this.state.currentIdx} status={this.state.status} onClick={(i) => this.handleQuestionClick(i)}/>	
				{/*<div class="display"><h1>{currentQ.a} {symbol} {currentQ.b} = {this.state.currentAns}</h1></div>*/}
				{ currentQ ? <DisplayItem question={currentQ} status={this.state.status} currentAns={this.state.currentAns}/> : null }
				{ status == GameStatus.STANDBY && <Start onClick={this.handleStart}/> }
				<UserInput questions={this.state.questions} status={this.state.status} onClick={(i) => this.handleClick(i)}/>
				<Result questions={this.state.questions} status={this.state.status} onClickRetry={this.handleResultClick} onClickReinit={this.handleResultClick}/>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));