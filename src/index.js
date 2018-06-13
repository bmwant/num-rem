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
      correct: 0,
      wrong: 0,
      total: 0
    };
  }

  updateInputValue(evt) {
    console.log(evt.target.value);
  }

  generateNewNumber() {
    const numbers = Array.from(Array(6), () => getRandomInt(10));
    const currentNumber = numbers.reduce((acc, val) => acc + val);
    console.log(numbers, currentNumber);

    this.setState({
      numbers: numbers,
      currentNumber: currentNumber,
      total: this.state.total + 1
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
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="answer">
          <input type="text" onChange={evt => this.updateInputValue(evt)}/>
        </div>
        <div className="controls">
          <button>Next</button>
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
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    squares[i] = this.state.xIsNext ? 'x' : 'o';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
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
