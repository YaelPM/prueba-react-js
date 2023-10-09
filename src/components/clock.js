import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ time: new Date() });
  }

  render() {
    const { time } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return (
      <div>
        <h1>Reloj en React.js</h1>
        <p>Hora actual: {`${hours}:${minutes}:${seconds}`}</p>
      </div>
    );
  }
}

export default Clock;
