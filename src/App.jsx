import { useState, useEffect } from 'react';
import HomeScreen from './views/HomeScreen';
import GameEngine from './components/GameEngine';
import ImpactLedger from './views/ImpactLedger';
import AdminDashboard from './views/AdminDashboard';
import Leaderboard from './views/Leaderboard';
import RewardsScreen from './views/RewardsScreen';
import { getStoredData, saveGameResult, saveStoredData } from './utils/StorageManager';
import StatisticsScreen from './views/StatisticsScreen';
import { SCENARIOS } from './data/scenarios';
import ScenarioIntro from './views/ScenarioIntro';
import { CARDS } from './data/cards';
import City3D from './components/City3D';

function App() {
  const [currentView, setCurrentView] = useState('start');
  const [playerData, setPlayerData] = useState({
    nickname: 'Citizen Planner',
    region: 'Clementi',
    school: 'Ngee Ann Polytechnic',
    choices: [],
    stats: { budget: 100, land: 100, health: 50, happiness: 50 }
  });
  const [storedData, setStoredData] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [viewCitySource, setViewCitySource] = useState('current'); // 'current' or 'receipt'

  useEffect(() => {
    setStoredData(getStoredData());
  }, [currentView]);

  const startGame = () => {
    const rand = Math.random();
    let scenario = SCENARIOS[0];

    if (rand > 0.5 && rand <= 0.75) {
      scenario = SCENARIOS[1];
    } else if (rand > 0.75) {
      scenario = SCENARIOS[2];
    }

    setSelectedScenario(scenario);
    setCurrentView('scenario_intro');
  };

  const finishGame = (finalStats, choicesHistory) => {
    const receiptId = `URA-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    // 1. Base Score from Stats (Max 400 ~ roughly 100 each)
    // Multiplier to make it substantial, e.g. 2x -> Max 800
    const baseScore = (finalStats.happiness + finalStats.health + finalStats.budget + finalStats.land) * 2;

    // 2. Bonus Points from Actions
    let bonusScore = 0;
    choicesHistory.forEach(choice => {
      if (choice.type === 'press_conference' && choice.decision === 'submitted') {
        const card = CARDS.find(c => c.id === choice.cardId);
        if (card && card.bonusScore) {
          bonusScore += card.bonusScore;
        } else {
          bonusScore += 300; // Default fallback
        }
      } else if (choice.type === 'bonus_feedback') {
        bonusScore += 150; // Points for optional feedback
      }
    });

    const pointsEarned = Math.round(baseScore + bonusScore);

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
    const viewData = {
      choices: receipt.choices,
      stats: receipt.stats,
      receiptId: receipt.receiptId,
      pointsEarned: receipt.points
    };
    setSelectedReceipt(viewData);
    setCurrentView('receipt');
  };

  const calculateGrade = (stats) => {
    // Simple logic mirror from ImpactLedger
    const score = (stats.happiness * 0.4) + (stats.health * 0.3) + (stats.budget * 0.2) + (stats.land * 0.1);
    let grade = 'C';
    let color = '#fbbf24';
    if (score >= 80) { grade = 'A'; color = '#22c55e'; }
    else if (score >= 60) { grade = 'B'; color = '#60a5fa'; }
    else if (score < 40) { grade = 'F'; color = '#ef4444'; }
    return { grade, color };
  };

  const activeCityData = viewCitySource === 'receipt' && selectedReceipt ? selectedReceipt : playerData;

  return (
    <div className="app-container">
      {/* City Background Layer (persistent or conditional) */}
      {currentView === 'view_city' && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          <City3D
            approvedStickers={activeCityData.choices.filter(c => c.decision === 'yes').map(c => {
              const card = CARDS.find(card => card.id === c.cardId);
              return card ? card.sticker : null;
            }).filter(Boolean)}
            stats={activeCityData.stats}
            isShowcaseMode={true}
          />

          {/* Overlay UI for View Mode */}
          {/* Overlay UI for View Mode */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
            <button
              onClick={() => setCurrentView(viewCitySource === 'receipt' ? 'receipt' : 'result')}
              style={{
                background: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              ← Back to {viewCitySource === 'receipt' ? 'Receipt' : 'Results'}
            </button>
          </div>

          {/* Score Overlay (Top Right) */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, textAlign: 'right' }}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(8px)',
              padding: '1rem',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                Performance
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>
                    {calculateGrade(activeCityData.stats).grade}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: calculateGrade(activeCityData.stats).color, fontWeight: 700 }}>
                    GRADE
                  </div>
                </div>
                <div style={{ height: '30px', width: '1px', background: 'rgba(255,255,255,0.2)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#facc15' }}>
                    {activeCityData.stats.happiness}%
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>HAPPY</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#4ade80' }}>
                    {activeCityData.stats.health}%
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>HEALTH</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {
        currentView === 'start' && (
          <HomeScreen
            onStart={startGame}
            onLeaderboard={() => setCurrentView('leaderboard')}
            onRewards={() => setCurrentView('rewards')}
            onStats={() => setCurrentView('statistics')}
            storedData={storedData}
            onViewReceipt={handleViewReceipt}
            onViewLastCity={playerData.choices.length > 0 ? () => {
              setViewCitySource('current');
              setCurrentView('view_city');
            } : null}
          />
        )
      }
      {
        currentView === 'scenario_intro' && (
          <ScenarioIntro
            scenario={selectedScenario}
            onStart={() => setCurrentView('game')}
          />
        )
      }
      {currentView === 'leaderboard' && <Leaderboard onBack={() => setCurrentView('start')} userScore={storedData?.careerScore || 0} playerData={playerData} />}
      {currentView === 'game' && <GameEngine onFinish={finishGame} nickname={playerData.nickname} scenario={selectedScenario} />}

      {
        currentView === 'result' && (
          <ImpactLedger
            data={playerData}
            onRestart={() => setCurrentView('start')}
            onViewCity={() => {
              setViewCitySource('current');
              setCurrentView('view_city');
            }}
          />
        )
      }

      {currentView === 'receipt' && (
        <ImpactLedger
          data={selectedReceipt}
          onRestart={() => setCurrentView('start')}
          isReceipt={true}
          onViewCity={() => {
            setViewCitySource('receipt');
            setCurrentView('view_city');
          }}
        />
      )}
      {currentView === 'statistics' && <StatisticsScreen storedData={storedData} onBack={() => setCurrentView('start')} />}
      {currentView === 'rewards' && (
        <RewardsScreen
          onBack={() => setCurrentView('start')}
          userScore={storedData?.walletBalance || 0}
          onClaimReward={(cost) => {
            const currentBalance = storedData?.walletBalance || 0;
            const newBalance = Math.max(0, currentBalance - cost);

            // Only update walletBalance, preserve careerScore
            const newData = { ...storedData, walletBalance: newBalance };
            setStoredData(newData);
            saveStoredData(newData);
          }}
        />
      )}
      {currentView === 'admin' && <AdminDashboard />}
    </div >
  );
}

export default App;
