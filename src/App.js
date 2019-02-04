import React, { Component } from "react";
import World from "./features/world";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Redux Quest</h1>
        <World />
        <div className="controls">
          <h3>Controls:</h3>
          <div className="W-container">
            <div className="W">W</div>
          </div>
          <div className="ASD-container">
            <div className="A">A</div>
            <div className="S">S</div>
            <div className="D">D</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
