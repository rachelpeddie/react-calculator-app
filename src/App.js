import React, { Component } from 'react';

class App extends Component {

  state = {
    result: '',
    calculation: '',
    num1: '',
    num2: '',
    operator1: '',
    operator2: ''
  }

  // resets all state values to clear any existing operation data
  clearEquation = () => {
    this.setState({
      result: '',
      calculation: '',
      num1: '',
      num2: '',
      operator1: '',
      operator2: ''
    })
  }

  // takes in an operator, triggers calculation and changes symbols to indicate which number should be concatenated
  operatorClick = ( o ) => {
    let equation;
    let symbol1;
    let symbol2;
    // if num2 is not empty, result should be calculated
    if( this.state.num2 !== ''){
      this.calculateResult();
    }
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
    this.updateOperators(equation, symbol1, symbol2)
  }

  // sets state based on operatorClick values
  updateOperators = (equation, symbol1, symbol2) => {
    this.setState({
      calculation: equation,
      operator1: symbol1,
      operator2: symbol2
    })
  }

  // sets state based on input from number or decimal button click, takes in numbers as strings
  // *** NOTE *** check for redudancy with result calculation when num2 doesn't exist
  // *** TO CONSIDER *** hitting equals when num2 doesn't exist could use last operator clicked and default num2 to num1
  numberClick = ( n ) => {
    let number1;
    let number2;
    let answer;
    let equation;
    // if operator is empty string, concatenate to get num1, concatenate calculation, set result to integer num1
    if ( this.state.operator === '' ){
      number1 = number1 + n;
      number2 = '';
      equation = equation + n;
      answer = Number(number1);
      this.updateNumbers(number1, number2, equation, answer);
    }
    // if operator is not empty string, set num1 to current result, concatenate num2, concatenate equation
    else { 
      number1 = this.state.result;
      number2 = number2 + n;
      equation = equation + n;
    }
  }

  // sets state based on numberClick values
  updateNumbers = ( number1, number2, equation, answer) => {
    this.setState({
      result: answer,
      calculation: equation,
      num1: number1,
      num2: number2
    })
  }

  // evlauates last operator clicked and calculates result based on this value
  // *** TO CONSIDER *** how to keep result displayed after clicking = button but on next button click reset to start over
  calculateResult = () => {
    let number1 = parseFloat(this.state.num1);
    let number2 = parseFloat(this.state.num2);
    let symbol;
    let answer;
    if( this.state.symbol1 === '' ){
      symbol = this.state.symbol2;
    }
    else{
      symbol = this.state.symbol1;
    }
    if( symbol === '/'){
      answer =  number1/number2;
    }
    if( symbol === 'x' ){
      answer = number1*number2;
    }
    if( symbol === '-'){
      answer = number1-number2;
    }
    if( symbol === '+'){
      answer = number1+number2;
    }
    this.updateResult(answer);
  }

  // updates state with calculateResult value, rounded to nearest two decimals
  // *** TO CONSIDER *** use if(math.floor(answer) === answer{ solution = answer } ) to determine if decimals are needed
  updateResult = ( answer ) =>{
    let solution = answer.toFixed(2);
    this.setState({
      result: solution,
      num1: solution,
      num2: ''
    })
  }

  render(){
    // *** TO CONSIDER *** adding a button that changes number input to negative
    return (
      <div>
        <form>
          <h1>{this.state.result}</h1>
          <input value={this.state.calculation}/>
          <div>
            <button value='7' onClick={() => { this.numberClick() }}>7</button>
            <button value='8' onClick={() => { this.numberClick() }}>8</button>
            <button value='9' onClick={() => { this.numberClick() }}>9</button>
            <button value='/' onClick={() => { this.operatorClick() }}>/</button>
          </div>
          <div>
            <button value='4' onClick={() => { this.numberClick() }}>4</button>
            <button value='5' onClick={() => { this.numberClick() }}>5</button>
            <button value='6' onClick={() => { this.numberClick() }}>6</button>
            <button value='*' onClick={() => { this.operatorClick() }}>x</button>
          </div>
          <div>
            <button value='1' onClick={() => { this.numberClick() }}>1</button>
            <button value='2' onClick={() => { this.numberClick() }}>2</button>
            <button value='3' onClick={() => { this.numberClick() }}>3</button>
            <button value='-' onClick={() => { this.operatorClick() }}>-</button>
          </div>
          <div>
            <button value='0' onClick={() => { this.numberClick() }}>0</button>
            <button value='.' onClick={() => { this.numberClick() }}>.</button>
            <button value='C' onClick={() => { this.clearEquation() }}>C</button>
            <button value='+' onClick={() => { this.operatorClick() }}>+</button>
          </div>
          <button onClick = {() => { this.calculateResult() }}>=</button>
        </form>
      </div>
    )
  }
}


export default App;
