import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Number(props) {
  return (
    <div className="number">
      {props.visible ? props.value : ''}
    </div>
  );
}

function Stats(props) {
  return (
    <div className="stats">
      <div className="pos">
        {props.correct}
      </div>
      <div className="neg">
        {props.wrong}
      </div>
      <div className="tot">
        {props.total}
      </div>
    </div>
  )
}

class Display extends React.Component {
  renderNumber(i) {
    return <Number value={this.props.numbers[i]} visible={this.props.revealed}/>;
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
      revealed: true,
      correct: 0,
      wrong: 0,
      total: 0
    };
  }

  updateInputValue(e) {
    const guessNumber = parseInt(e.target.value, 10);
    if(isNaN(guessNumber)) {
      return;
    }
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

      this.setState({
        revealed: true
      });
    }
  }

  generateNewNumber() {
    const numbers = Array.from(Array(6), () => getRandomInt(10));
    const currentNumber = numbers.reduce((acc, val, index) => acc + val*Math.pow(10, numbers.length-index-1), 0);

    this.setState({
      numbers: numbers,
      currentNumber: currentNumber,
      total: this.state.total + 1,
      enteredValue: '',
      revealed: true
    });
    this.autoHide();
  }

  componentWillMount() {
    // Set initial number
    this.generateNewNumber();
  }

  autoHide() {
    // Hide number after 3 seconds
    setTimeout(function() { this.setState({revealed: false}); }.bind(this), 3000);
  }
  
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Display
            numbers={this.state.numbers}
            revealed={this.state.revealed}
          />
        </div>
        <div className="answer">
          <input type="text" value={this.state.enteredValue} onChange={evt => this.updateInputValue(evt)}/>
        </div>
        <div className="controls">
          <button onClick={() => this.generateNewNumber()}>Next</button>
        </div>
        <Stats
          correct={this.state.correct}
          wrong={this.state.wrong}
          total={this.state.total}
        />
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
