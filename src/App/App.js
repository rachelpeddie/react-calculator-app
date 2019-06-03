import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {

  state = {
    result: '',
    calculation: '',
    num1: '',
    num2: '',
    operator1: '',
    operator2: '',
    current: '',
  }

  componentDidMount = () => {
    // ensures last 10 calculations from all users displays for all users -- alternatively could have used web socket, decided this app wasn't big enough to warrent that implementation
    setInterval(() => {
      this.props.dispatch({ type: 'GET_LAST_CALCULATIONS' });
    }, 10000);
  }

  // resets all state values to clear any existing operation data
  clearEquation = () => {
    this.setState({
      result: '',
      calculation: '',
      num1: '',
      num2: '',
      operator1: '',
      operator2: '',
      current: '',
    })
  }

  // takes in an operator, triggers calculation and changes symbols to indicate which number should be concatenated
  operatorClick = ( o ) => {
    console.log(`o is`, o);
    
    let equation = this.state.equation;
    let symbol1;
    let symbol2;

    // if num2 is not empty, result should be calculated
    if( this.state.num2 !== ''){
      this.calculateResult();
    }
    // checks to see if previous answer is being used for next equation
    if (this.state.calculation === '' && this.state.current !== '') {
      this.newCalculation();
      symbol1 = o;
      symbol2 = '';
      equation = this.state.current + o;
    }
    else {
      // if calculation is not empty, operator should be concatenated
      if (this.state.calculation !== '') {
        equation = this.state.calculation + o;
        if (this.state.operator1 === '') {
          symbol1 = o;
          symbol2 = '';
        }
        else {
          symbol1 = '';
          symbol2 = o;
        }
      }
  }
    this.updateOperators(equation, symbol1, symbol2);
  }

  // sets number1 state to this.state.current if new equation is started with previous result
  newCalculation = () => {
    this.setState({
      num1: this.state.current,
      result: this.state.current,
    })
  }

  // sets state based on operatorClick values
  updateOperators = (equation, symbol1, symbol2) => {
    this.setState({
      calculation: equation,
      operator1: symbol1,
      operator2: symbol2,
    })
  }

  // sets state based on input from number or decimal button click, takes in numbers as strings
  // *** TO CONSIDER *** hitting equals when num2 doesn't exist could use last operator clicked and default num2 to num1
  numberClick = ( n ) => {
    console.log(`n is`, n);
    let number1;
    // sets number1 to result once first number is entered, allows for continued calculations
    if (this.state.result === ''){
      number1 = this.state.num1;
    }
    else {
      number1 = this.state.result;
    }
    let number2 = this.state.num2;
    let answer = this.state.result;
    let equation = this.state.calculation;
    let current;
    // if result is empty string, concatenate to get num1, concatenate calculation, set result to integer num1
    if ( this.state.operator1 === '' && this.state.operator2 === '' ){
      number1 = number1 + n;
      number2 = '';
      answer = number1;
      current = number1;
    }
    // if result is not empty string, set num1 to current result, concatenate num2, concatenate equation
    else { 
      number1 = this.state.result;
      number2 = number2 + n;
      current = number2;
    }
    equation = equation + n;
    this.updateNumbers(number1, number2, equation, answer, current);
  }

  // sets state based on numberClick values
  updateNumbers = ( number1, number2, equation, answer, current ) => {
    this.setState({
      result: answer,
      calculation: equation,
      num1: number1,
      num2: number2,
      current: current
    })
  }

  // evlauates last operator clicked and calculates result based on this value
  calculateResult = () => {
    let number1 = parseFloat(this.state.num1);
    let number2 = parseFloat(this.state.num2);
    let symbol;
    let answer;
    let solution;
      if( this.state.operator1 === '' ){
      symbol = this.state.operator2;
      }
      else{
        symbol = this.state.operator1;
      }
      // conditinally calculates result based on last entered symbol
      if( symbol === '/' ){
        answer =  number1 / number2;
      }
      if( symbol === '*' ){
        answer = number1 * number2;
      }
      if( symbol === '-'){
        answer = number1 - number2;
      }
      if( symbol === '+' ){
        answer = number1 + number2;
      }
        // checks for need for decimals, if integer is passed in, integer will be returned
      if (answer === Math.floor(answer)) {
        solution = answer;
      }
      else {
        solution = answer.toFixed(2);
      }
    this.updateResult(solution);
    return solution;
  }

  // updates state with calculateResult value, rounded to nearest two decimals
  updateResult = ( solution ) =>{
    this.setState({
      result: solution,
      num1: solution,
      num2: '',
      current: solution
    })
  }

  // action to dispatch to save most recent calculation to database
  saveResult = () => {
    // checks for empty values and NaN values
    if (this.state.num1 === '' || isNaN(this.state.num1) === true || this.state.num2 === '' || isNaN(this.state.num2) === true) {
      alert(`Please enter valid equation.`);
    }
    else{ 
      this.calculateResult();
      // sets new payload to return of function in case state isn't updated in time to send complete data
      let newPayload = { result: this.calculateResult(), calculation: this.state.calculation }
      this.props.dispatch({ type: 'SAVE_CALCULATION', payload: newPayload });
      this.finalState(newPayload.result);
    }
  }

  // sets all states to empty string except current, this will hold result value for dispay on input and use in next equation
  finalState = (result) => {
    this.setState({
      result: '',
      calculation: '',
      num1: '',
      num2: '',
      operator1: '',
      operator2: '',
      current: result,
    })

  }

  // maps through last 10 calculations and renders to DOM
  renderEquations = () => {
    return (
      this.props.reduxState.map((calc, i) =>
        <div key={i}>
          <h4>{calc.equation} = {calc.solution}</h4>
        </div>
      ))
  }

  render(){
    // *** TO CONSIDER *** adding a button that changes number input to negative
    return (
      <center>
      <div>
        <input value={this.state.current}/>
          <div>
            <button name='7' onClick={() => { this.numberClick('7') }}>7</button>
            <button name='8' onClick={() => { this.numberClick('8') }}>8</button>
            <button name='9' onClick={() => { this.numberClick('9') }}>9</button>
            <button name='/' onClick={() => { this.operatorClick('/') }}>/</button>
          </div>
          <div>
            <button name='4' onClick={() => { this.numberClick('4') }}>4</button>
            <button name='5' onClick={() => { this.numberClick('5') }}>5</button>
            <button name='6' onClick={() => { this.numberClick('6') }}>6</button>
            <button name='*' onClick={() => { this.operatorClick('*') }}>x</button>
          </div>
          <div>
            <button name='1' onClick={() => { this.numberClick('1') }}>1</button>
            <button name='2' onClick={() => { this.numberClick('2') }}>2</button>
            <button name='3' onClick={() => { this.numberClick('3') }}>3</button>
            <button name='-' onClick={() => { this.operatorClick('-') }}>-</button>
          </div>
          <div>
            <button name='0' onClick={() => { this.numberClick('0') }}>0</button>
            <button name='.' onClick={() => { this.numberClick('.') }}>.</button>
            <button name='C' onClick={() => { this.clearEquation('C') }}>C</button>
            <button name='+' onClick={() => { this.operatorClick('+') }}>+</button>
          </div>
          <button name='=' onClick={() => { this.saveResult() }} id='equal-button'>=</button>
        <h3>Previous Calculations</h3>
        {this.renderEquations()}
      </div>
      </center>
    )
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(App);
