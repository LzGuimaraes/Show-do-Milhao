import { useState } from 'react'
import './App.css'
import Quiz from './components/Quiz'
import StartScreen from './components/StartScreen'

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app-container">
      {gameStarted ? (
        <Quiz />
      ) : (
        <StartScreen onStartGame={handleStartGame} />
      )}
    </div>
  )
}

export default App
