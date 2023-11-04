import React, { useState } from 'react';
import Board from './Board';
import './App.css';
// Importar los archivos de traducción
import en from './en.json';
import es from './es.json';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [language, setLanguage] = useState('en'); // Por defecto, inglés

  const translations = {
    en,
    es,
  };

  // Función para cambiar el idioma
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  function handleClick(i) {
    const squaresCopy = [...squares];
    if (calculateWinner(squares) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const currentWinner = calculateWinner(squaresCopy);
    if (currentWinner) {
      setWinner(currentWinner);
    } else if (squaresCopy.every((square) => square !== null)) {
      // Traducción del empate
      setWinner(translations[language].tie);
    }
  }

  // Función para reiniciar el juego
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1>{translations[language].title}</h1>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="next-player">
          {translations[language].nextPlayer} {xIsNext ? 'X' : 'O'}
        </div>
        {winner && (
          <div className="winner">
            {translations[language].winner} {winner}
          </div>
        )}
        {winner || squares.every((square) => square !== null) ? (
          <button className="button-reset" onClick={resetGame}>
            {translations[language].playAgain}
          </button>
        ) : null}
      </div>
      <div className="language-selector">
        <button className="button-lang" onClick={() => changeLanguage('en')}>English</button>
        <button className="button-lang" onClick={() => changeLanguage('es')}>Español</button>
      </div>
    </div>
  );
}

export default App;
