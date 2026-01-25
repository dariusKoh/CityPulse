const STORAGE_KEY = 'citypulse_data';

export const getStoredData = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    if (!data) {
        return {
            walletBalance: 0,
            careerScore: 0,
            submissionHistory: [],
            lastPlayed: null
        };
    }

    const parsed = JSON.parse(data);
    
    // Migration Logic: If old data structure (totalPoints) exists but new ones don't
    if (parsed.totalPoints !== undefined && parsed.walletBalance === undefined) {
        return {
            walletBalance: parsed.totalPoints,
            careerScore: parsed.totalPoints,
            submissionHistory: parsed.submissionHistory || [],
            lastPlayed: parsed.lastPlayed
        };
    }

    // Default structure for new/migrated users
    return {
        walletBalance: parsed.walletBalance || 0,
        careerScore: parsed.careerScore || 0,
        submissionHistory: parsed.submissionHistory || [],
        lastPlayed: parsed.lastPlayed
    };

  } catch (e) {
    console.error("Failed to load data", e);
    return { walletBalance: 0, careerScore: 0, submissionHistory: [], lastPlayed: null };
  }
};

export const saveStoredData = (data) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveGameResult = (resultData) => {
  // resultData expected: { choices, stats, pointsEarned, receiptId }
  const currentData = getStoredData();
  
  const newHistoryItem = {
    date: new Date().toISOString(),
    choices: resultData.choices,
    stats: resultData.stats,
    receiptId: resultData.receiptId,
    points: resultData.pointsEarned
  };

  const newData = {
    // Add to BOTH wallet (spendable) and career (leaderboard)
    walletBalance: currentData.walletBalance + (resultData.pointsEarned || 0),
    careerScore: currentData.careerScore + (resultData.pointsEarned || 0),
    
    submissionHistory: [newHistoryItem, ...currentData.submissionHistory], // Newest first
    lastPlayed: new Date().toISOString()
  };

  saveStoredData(newData);
  return newData;
};
