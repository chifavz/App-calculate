import React, { useState, useEffect } from 'react';
import './Calculator.css';
import * as math from 'mathjs';

const Calculator = () => {
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  // Retrieve initial theme preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem('calculator-theme');
    return savedTheme ? savedTheme : 'light';
  }

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('calculator-theme', theme);
  }, [theme]);

  // Handle digit and operator clicks
  const handleButtonClick = (value) => {
    if (value === '=') {
      try {
        const parsedResult = math.evaluate(input);
        setResult(parsedResult.toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput((prevInput) => prevInput.slice(0, -1)); // Remove the last character
    } else if (value === 'RESET') {
      setInput('');
      setResult('');
    } else if (value === 'Light Theme') {
      setTheme('light');
    } else if (value === 'Dark Theme') {
      setTheme('dark');
    } else {
      setInput((prevInput) => prevInput + value);
    }
    console.log('Input:', input);
    console.log('Result:', result);
  };

  return (
    <div className={`calculator ${theme}`}>
      <div className="calculator-header">
        <h1>Calculator</h1>
        <div className="theme-toggle">
          <button onClick={() => setTheme('light')}>Light Theme</button>
          <button onClick={() => setTheme('dark')}>Dark Theme</button>
        </div>
      </div>
      <div className="calculator-display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="calculator-buttons">
        {[7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-', 0, '.', '=', '+', 'C', 'DEL', 'RESET'].map((value, index) => (
          <button key={index} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
