import React, { Component } from 'react';

class App extends Component {

  state = {
    result: '',
    calculation: '',
    num1: '',
    num2: '',
    operator: ''
  }

  // sets state based on input from number or decimal button click
  numberClick = ( n ) => {
    let num1;
    let num2;
    let result;
    let calculation;
    if( this.state.result === '' ){
      num1 = num1 + n;
    }
    else {
      num2 = num2 + n;
      num1 = this.state.result;
    }
    calculation = num1 + num2;
    calculateResult(num1, num2, calculation);
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
