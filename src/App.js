import React, { Component } from 'react';

class App extends Component {

  state = {
    result: 0,
    calculation: '',
    firstNumber: 0,
    secondNumber: 0
  }

  handleClick = ( number ) => {

  }

  render(){
    let number;
    let equation;
    return (
      <div>
        <form>
          <h1>{this.state.result}</h1>
          <input value={this.state.calculation}/>
          <div>
            <button onClick={() => { this.handleClick(7) }}>7</button>
            <button onClick={() => { this.handleClick(8) }}>8</button>
            <button onClick={() => { this.handleClick(9) }}>9</button>
            <button onClick={() => { this.handleClick('/') }}>/</button>
          </div>
          <div>
            <button onClick={() => { this.handleClick(4) }}>4</button>
            <button onClick={() => { this.handleClick(5) }}>5</button>
            <button onClick={() => { this.handleClick(6) }}>6</button>
            <button onClick={() => { this.handleClick('*') }}>x</button>
          </div>
          <div>
            <button onClick={() => { this.handleClick(1) }}>1</button>
            <button onClick={() => { this.handleClick(2) }}>2</button>
            <button onClick={() => { this.handleClick(3) }}>3</button>
            <button onClick={() => { this.handleClick('-') }}>-</button>
          </div>
          <div>
            <button onClick={() => { this.handleClick(0) }}>0</button>
            <button onClick={() => { this.handleClick('.') }}>.</button>
            <button onClick={() => { this.handleClick('C') }}>C</button>
            <button onClick={() => { this.handleClick('+') }}>+</button>
          </div>
          <button>=</button>
        </form>
      </div>
    )
  }
}


export default App;
