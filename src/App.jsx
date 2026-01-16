import { useState, useEffect } from 'react';
import HomeScreen from './views/HomeScreen';
import GameEngine from './components/GameEngine';
import ImpactLedger from './views/ImpactLedger';
import AdminDashboard from './views/AdminDashboard';
import { getStoredData, saveGameResult } from './utils/StorageManager';

function App() {
  const [currentView, setCurrentView] = useState('start'); // start, game, result, admin
  const [playerData, setPlayerData] = useState({
    nickname: 'Citizen Planner', // Default name
    choices: [],
    stats: { budget: 100, land: 100, health: 50, happiness: 50 }
  });
  const [storedData, setStoredData] = useState(null);

  useEffect(() => {
    setStoredData(getStoredData());
  }, [currentView]); // Refresh on view change

  const startGame = () => {
    setCurrentView('game');
  };

  const finishGame = (finalStats, choicesHistory) => {
    // Generate Receipt ID
    const receiptId = `URA-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    // Calculate Points (Mock logic)
    const pointsEarned = 850; // Fixed for POC or calculate based on stats

    const resultData = {
      choices: choicesHistory,
      stats: finalStats,
      pointsEarned,
      receiptId
    };

    saveGameResult(resultData);

    setPlayerData(prev => ({
      ...prev,
      stats: finalStats,
      choices: choicesHistory,
      receiptId,
      pointsEarned
    }));
    setCurrentView('result');
  };

  return (
    <div className="app-container">
      {currentView === 'start' && <HomeScreen onStart={startGame} storedData={storedData} />}
      {currentView === 'game' && <GameEngine onFinish={finishGame} nickname={playerData.nickname} />}
      {currentView === 'result' && <ImpactLedger data={playerData} onRestart={() => setCurrentView('start')} />}
      {currentView === 'admin' && <AdminDashboard />}
    </div>
  );
}

export default App;
