import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import Counter from './components/Counter/Counter';
import TheNextMarvelMovie from './components/TheNextMarvelMovie/TheNextMarvelMovie';
import Light from './components/Semafore/Light/Light';

function App() {
  return (
    <div className="App">
      <Light color="yellow" isOn />
      <TodoList />
      <Counter />
      <TheNextMarvelMovie />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
