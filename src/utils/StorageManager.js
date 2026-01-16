const STORAGE_KEY = 'citypulse_data';

export const getStoredData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {
      totalPoints: 0,
      submissionHistory: [], // Array of { date, choices, stats, receiptId }
      lastPlayed: null
    };
  } catch (e) {
    console.error("Failed to load data", e);
    return { totalPoints: 0, submissionHistory: [], lastPlayed: null };
  }
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
    totalPoints: currentData.totalPoints + (resultData.pointsEarned || 0),
    submissionHistory: [newHistoryItem, ...currentData.submissionHistory], // Newest first
    lastPlayed: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  return newData;
};
