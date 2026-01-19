import { useState, useEffect } from 'react';
import HomeScreen from './views/HomeScreen';
import GameEngine from './components/GameEngine';
import ImpactLedger from './views/ImpactLedger';
import AdminDashboard from './views/AdminDashboard';
import Leaderboard from './views/Leaderboard';
import { getStoredData, saveGameResult } from './utils/StorageManager';

import StatisticsScreen from './views/StatisticsScreen';
import { SCENARIOS } from './data/scenarios';

function App() {
  const [currentView, setCurrentView] = useState('start'); // start, game, result, admin, leaderboard, statistics
  const [playerData, setPlayerData] = useState({
    nickname: 'Citizen Planner', // Default name
    choices: [],
    stats: { budget: 100, land: 100, health: 50, happiness: 50 }
  });
  const [storedData, setStoredData] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);

  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    setStoredData(getStoredData());
  }, [currentView]); // Refresh on view change

  const startGame = () => {
    // Random Scenario Logic
    // 50% Standard
    // 25% Silver Tsunami
    // 25% Climate Siege
    const rand = Math.random();
    let scenario = SCENARIOS[0]; // Standard default

    if (rand > 0.5 && rand <= 0.75) {
      scenario = SCENARIOS[1]; // Silver Tsunami
    } else if (rand > 0.75) {
      scenario = SCENARIOS[2]; // Climate Siege
    }

    setSelectedScenario(scenario);
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

  const handleViewReceipt = (receipt) => {
    // Transform receipt data to match ImpactLedger expectation
    // ImpactLedger expects 'data' prop with { choices, stats } and optionally points/receiptId embedded or separate
    // The storing logic saves: { date, choices, stats, receiptId, points }
    // We map it to what ImpactLedger needs.
    const viewData = {
      choices: receipt.choices,
      stats: receipt.stats,
      receiptId: receipt.receiptId,
      pointsEarned: receipt.points
    };
    setSelectedReceipt(viewData);
    setCurrentView('receipt');
  };

  return (
    <div className="app-container">
      {currentView === 'start' && (
        <HomeScreen
          onStart={startGame}
          onLeaderboard={() => setCurrentView('leaderboard')}
          onStats={() => setCurrentView('statistics')}
          storedData={storedData}
          onViewReceipt={handleViewReceipt}
        />
      )}
      {currentView === 'leaderboard' && <Leaderboard onBack={() => setCurrentView('start')} userScore={storedData?.totalPoints || 0} />}
      {currentView === 'game' && <GameEngine onFinish={finishGame} nickname={playerData.nickname} scenario={selectedScenario} />}
      {currentView === 'result' && <ImpactLedger data={playerData} onRestart={() => setCurrentView('start')} />}
      {currentView === 'receipt' && <ImpactLedger data={selectedReceipt} onRestart={() => setCurrentView('start')} />}
      {currentView === 'statistics' && <StatisticsScreen storedData={storedData} onBack={() => setCurrentView('start')} />}
      {currentView === 'admin' && <AdminDashboard />}
    </div>
  );
}

export default App;
