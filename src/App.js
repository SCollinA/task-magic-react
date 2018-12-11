import React, { Component } from 'react';
import './App.css';
import TaskDisplay from './TaskDisplay';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TaskDisplay/>
      </div>
    );
  }
}

export default App;
