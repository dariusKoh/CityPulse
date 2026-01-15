import { useState } from 'react';
import StartScreen from './views/StartScreen';
import GameEngine from './components/GameEngine';
import ImpactLedger from './views/ImpactLedger';
import AdminDashboard from './views/AdminDashboard';

function App() {
  const [currentView, setCurrentView] = useState('start'); // start, game, result, admin
  const [playerData, setPlayerData] = useState({
    nickname: '',
    choices: [], // Array of { cardId, accepted: boolean }
    stats: { budget: 100, land: 100, health: 50, happiness: 50 }
  });

  const startGame = (nickname) => {
    setPlayerData(prev => ({ ...prev, nickname }));
    setCurrentView('game');
  };

  const finishGame = (finalStats, choicesHistory) => {
    setPlayerData(prev => ({ 
      ...prev, 
      stats: finalStats,
      choices: choicesHistory 
    }));
    setCurrentView('result');
  };

  return (
    <div className="app-container">
      {currentView === 'start' && <StartScreen onStart={startGame} />}
      {currentView === 'game' && <GameEngine onFinish={finishGame} nickname={playerData.nickname} />}
      {currentView === 'result' && <ImpactLedger data={playerData} onRestart={() => setCurrentView('start')} />}
      {currentView === 'admin' && <AdminDashboard />}
    </div>
  );
}

export default App;
