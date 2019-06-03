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
    lastTen: [],
  }
  componentDidMount = () => {
    setInterval(() => {
      this.props.dispatch({ type: 'GET_LAST_CALCULATIONS' });
    }, 5000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.reduxState.calcReducer !== this.props.reduxState.calcReducer) {
      this.setState({ ...this.state, lastTen: this.props.reduxState.calcReducer });
      console.log(`Count:`, this.state.lastTen);
    }
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
    console.log(`in operatorClick, symbol1 is`, symbol1);
    console.log(`in operatorClick, symbol2 is`, symbol2);
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
  // *** NOTE *** check for redudancy with result calculation when num2 doesn't exist
  // *** TO CONSIDER *** hitting equals when num2 doesn't exist could use last operator clicked and default num2 to num1
  numberClick = ( n ) => {
    console.log(`n is`, n);
    let number1;
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
      // equation = equation + n;
      answer = number1;
      current = number1;
      console.log(`in numberClicka, number1 is`, number1);
      console.log(`in numberClicka, number2 is`, number2);
      console.log(`in numberClicka, answer is`, answer);
      console.log(`in numberClicka, equation is`, equation);

    }
    // if result is not empty string, set num1 to current result, concatenate num2, concatenate equation
    else { 
      number1 = this.state.result;
      number2 = number2 + n;
      current = number2;
      console.log(`in numberClickb, number2 string is`, number2);

      // this.updateNumbers(number1, number2, equation, answer);
    }
    equation = equation + n;
    this.updateNumbers(number1, number2, equation, answer, current);

  }

  // sets state based on numberClick values
  updateNumbers = ( number1, number2, equation, answer, current ) => {
    console.log(`in updateNumbers, number1 is`, number1);
    console.log(`in updateNumbers, number2 is`, number2);
    console.log(`in updateNumbers, answer is`, answer);
    console.log(`in updateNumbers, equation is`, equation);
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
    console.log(`in calculate result, num1`, this.state.num1);
    console.log(`in calculate result, num2`, this.state.num2);
    let number1 = parseFloat(this.state.num1);
    let number2 = parseFloat(this.state.num2);
    console.log(`in calculate result, number1 is`, number1);
    console.log(`in calculate result, number2 is`, number2);
    let symbol;
    let answer;
    let solution;
    if( this.state.operator1 === '' ){
      symbol = this.state.operator2;
    }
    else{
      symbol = this.state.operator1;
    }
    console.log(`in calculate result, symbol is`, symbol);
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
    console.log(`in updateResult`, solution);
    
    this.setState({
      result: solution,
      num1: solution,
      num2: '',
      current: solution
    })
  }


  saveResult = () => {
    this.calculateResult();
    console.log(`in saveResult`, this.calculateResult());
    let newPayload = { result: this.calculateResult(), calculation: this.state.calculation }
    console.log(`in saveResult, payload is`, newPayload );
    
    this.props.dispatch({ type: 'SAVE_CALCULATION', payload: newPayload });
    this.finalState(newPayload.result);
  }

  finalState = (result) => {
    console.log(`this.state.result is`, result);
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

  renderEquations = () => {
    return (
      this.state.lastTen.map((calc, i) =>
        <div>
          <h4>{calc.equation} = {calc.result}</h4>
        </div>
      ))
  }

  render(){
    // *** TO CONSIDER *** adding a button that changes number input to negative
    return (
      <div>
          {/* <h1>{this.state.result}</h1> */}
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
    )
  }
}

const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect(mapReduxStateToProps)(App);
