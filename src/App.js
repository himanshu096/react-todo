import React from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock'
import Todo from './components/todo/Todo'

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <h2>My TODO App </h2>

        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <Todo/>
    </div>
  );
}



export default App;
