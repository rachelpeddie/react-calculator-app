import React, { Component } from 'react';

class App extends Component {

  state = {
    result: '',
    calculation: '',
    num1: '',
    num2: '',
    operator: ''
  }

  // sets state based on input from number or decimal button click, takes in numbers as strings
  numberClick = ( n ) => {
    let num1;
    let num2;
    let result;
    let calculation;
    // if operator is empty string, concatenate to get num1, concatenate calculation, set result to integer num1
    if (this.state.operator === '' ){
      num1 = num1 + n;
      calculation = calculation + num1;
      result = Number(num1)
      updateState(num1, num2, calculation);
    }
    // if operator is not empty string, set num1 to current result, concatenate num2, concatenate calculation
    else { 
      num1 = this.state.result;
      num2 = num2 + n;
      calculation = calculation + num2;
      calculateResult(num1, num2, calculation);
    }
  }

  render(){
    let answer;
    let equation;
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
          <button>=</button>
        </form>
      </div>
    )
  }
}


export default App;
