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

  updateOperators = () => {
    this.setState({
      calculation: equation,
      operator1: symbol1,
      operator2: symbol2
    })
  }

  operatorClick = ( o ) => {
    let equation;
    let symbol1;
    let symbol2;
    if (this.state.calculation !== '') {
      equation = equation + o;
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

  // sets state based on input from number or decimal button click, takes in numbers as strings
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

 

  updateNumbers = ( number1, number2, equation, answer) => {
    this.setState({
      result: answer,
      calculation: equation,
      num1: number1,
      num2: number2
    })
  }

  calculateResult = () => {

  }



  render(){
    return (
      <div>
        <form>
          <h1>{this.state.result}</h1>
          <input value={this.state.calculation}/>
          <div>
            <button onClick={() => { this.numberClick('7') }}>7</button>
            <button onClick={() => { this.numberClick('8') }}>8</button>
            <button onClick={() => { this.numberClick('9') }}>9</button>
            <button onClick={() => { this.operatorClick('/') }}>/</button>
          </div>
          <div>
            <button onClick={() => { this.numberClick('4') }}>4</button>
            <button onClick={() => { this.numberClick('5') }}>5</button>
            <button onClick={() => { this.numberClick('6') }}>6</button>
            <button onClick={() => { this.operatorClick('*') }}>x</button>
          </div>
          <div>
            <button onClick={() => { this.numberClick('1') }}>1</button>
            <button onClick={() => { this.numberClick('2') }}>2</button>
            <button onClick={() => { this.numberClick('3') }}>3</button>
            <button onClick={() => { this.operatorClick('-') }}>-</button>
          </div>
          <div>
            <button onClick={() => { this.numberClick('0') }}>0</button>
            <button onClick={() => { this.numberClick('.') }}>.</button>
            <button onClick={() => { this.operatorClick('C') }}>C</button>
            <button onClick={() => { this.operatorClick('+') }}>+</button>
          </div>
          <button onClick = {() => { this.calculateResult() }}>=</button>
        </form>
      </div>
    )
  }
}


export default App;
