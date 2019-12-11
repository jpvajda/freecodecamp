class KeyPad extends React.Component {

  render() {
    return (
      <div className="button">
        <button name="(" onClick={e => this.props.onClick(e.target.name)}>(</button>
        <button name="CE" onClick={e => this.props.onClick(e.target.name)}>CE</button>
        <button name=")" onClick={e => this.props.onClick(e.target.name)}>)</button>
        <button name="C" onClick={e => this.props.onClick(e.target.name)}>C</button><br />

        <button name="1" onClick={e => this.props.onClick(e.target.name)}>1</button>
        <button name="2" onClick={e => this.props.onClick(e.target.name)}>2</button>
        <button name="3" onClick={e => this.props.onClick(e.target.name)}>3</button>
        <button name="+" onClick={e => this.props.onClick(e.target.name)}>+</button><br />

        <button name="4" onClick={e => this.props.onClick(e.target.name)}>4</button>
        <button name="5" onClick={e => this.props.onClick(e.target.name)}>5</button>
        <button name="6" onClick={e => this.props.onClick(e.target.name)}>6</button>
        <button name="-" onClick={e => this.props.onClick(e.target.name)}>-</button><br />

        <button name="7" onClick={e => this.props.onClick(e.target.name)}>7</button>
        <button name="8" onClick={e => this.props.onClick(e.target.name)}>8</button>
        <button name="9" onClick={e => this.props.onClick(e.target.name)}>9</button>
        <button name="*" onClick={e => this.props.onClick(e.target.name)}>x</button><br />

        <button name="." onClick={e => this.props.onClick(e.target.name)}>.</button>
        <button name="0" onClick={e => this.props.onClick(e.target.name)}>0</button>
        <button name="=" onClick={e => this.props.onClick(e.target.name)}>=</button>
        <button name="/" onClick={e => this.props.onClick(e.target.name)}>÷</button><br />
      </div>
    );
  }
 }

 const app = document.getElementById('app')
ReactDOM.render(<Keypad/>,app)

 // ================================================

 class Results extends React.Component {
  
  // results functionality 

render() {
  let { result } = this.props;
  return (
    <div className="result">
      <p>{result}</p>
    </div>
  );
};
};

const app = document.getElementById('app')
ReactDOM.render(<Results/>,app)

 // ================================================


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      result: ""
    }
  }

  onClick = button => {
    if (button === "=") {
      this.calculate()
    }

    else if (button === "C") {
      this.reset()
    }
    else if (button === "CE") {
      this.backspace()
    }

    else {
      this.setState({
        result: this.state.result + button
      })
    }
  };

  //calculate functionality 

  calculate = () => {
    var checkResult = ''
    if (this.state.result.includes('--')) {
      checkResult = this.state.result.replace('--', '+')
    }

    else {
      checkResult = this.state.result
    }

    try {
      this.setState({
        result: (eval(checkResult) || "") + ""
      })
    } catch (e) {
      this.setState({
        result: "error"
      })
    }
  };

  // reset functionality 

  reset = () => {
    this.setState({
      result: ""
    })
  };

  // backspace functionality 

  backspace = () => {
    this.setState({
      result: this.state.result.slice(0, -1)
    })
  };

  render() {
    return (
      <div>
        <div className="calculator-body">
          <h1> FCC: JS Calculator</h1>
          <Results result={this.state.result} />
          <KeyPad onClick={this.onClick} />
        </div>
      </div>
    );
  };
};

const app = document.getElementById('app')
ReactDOM.render(<App/>,app)