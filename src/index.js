import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Number(props) {
  return (
    <div className="number">
      {props.value}
    </div>
  );
}

class Display extends React.Component {
  renderNumber(i) {
    return <Number value={this.props.numbers[i]}/>;
  }

  render() {
    return (
      <div className="display-row">
        {this.renderNumber(0)}
        {this.renderNumber(1)}
        {this.renderNumber(2)}
        {this.renderNumber(3)}
        {this.renderNumber(4)}
        {this.renderNumber(5)}
      </div>
    )
  }
}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: null,
      currentNumber: null,
      enteredValue: '',
      correct: 0,
      wrong: 0,
      total: 0
    };
  }

  updateInputValue(e) {
    const guessNumber = parseInt(e.target.value);
    this.setState({
      enteredValue: guessNumber
    });

    if(e.target.value.length === this.state.numbers.length) {
      if(guessNumber === this.state.currentNumber) {
        this.setState({
          correct: this.state.correct + 1
        })
      } else {
        this.setState({
          wrong: this.state.wrong + 1
        });
      }
    }
  }

  generateNewNumber() {
    const numbers = Array.from(Array(6), () => getRandomInt(10));
    const currentNumber = numbers.reduce((acc, val, index) => acc + val*Math.pow(10, numbers.length-index-1), 0);
    console.log(numbers, currentNumber);

    this.setState({
      numbers: numbers,
      currentNumber: currentNumber,
      total: this.state.total + 1,
      enteredValue: ''
    })
  }

  componentWillMount() {
    // Set initial number
    this.generateNewNumber();
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Display
            numbers={this.state.numbers}
          />
        </div>
        <div className="answer">
          <input type="text" value={this.state.enteredValue} onChange={evt => this.updateInputValue(evt)}/>
        </div>
        <div className="controls">
          <button onClick={() => this.generateNewNumber()}>Next</button>
        </div>
        <div className="stats">
          <div>
            <strong>+/-:</strong> {this.state.correct}/{this.state.wrong}
          </div>
          <div>
            <strong>total:</strong> {this.state.total}
          </div>
        </div>
      </div>
    );
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
