import React, { Component } from 'react';
import '../styles/Clock.css'; // Importamos un archivo CSS para estilos

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
      <div className="clock-container">
        <h1 className="clock-title">Hora actual:</h1>
        <div className="clock">
          <p className="clock-time">
            {`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
          </p>
        </div>
      </div>
    );
  }
}

export default Clock;
