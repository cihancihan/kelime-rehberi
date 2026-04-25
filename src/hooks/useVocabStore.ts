import { Word, Level, ieltsWords } from '../data/words';
import { useState, useEffect } from 'react';

export interface UserStats {
  learnedWordIds: number[];
  wordRatings: Record<number, number>;
  dailyStreak: number;
  lastStudyDate: string | null;
  dailyGoal: number;
  preferredLevel: Level | 'All';
}

const DEFAULT_STATS: UserStats = {
  learnedWordIds: [],
  wordRatings: {},
  dailyStreak: 0,
  lastStudyDate: null,
  dailyGoal: 10,
  preferredLevel: 'All',
};

export const useVocabStore = () => {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('ielts_vocab_stats');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATS,
          ...parsed,
          wordRatings: parsed.wordRatings || {},
        };
      } catch (e) {
        console.error('Failed to parse stats');
      }
    }
    return DEFAULT_STATS;
  });

  useEffect(() => {
    localStorage.setItem('ielts_vocab_stats', JSON.stringify(stats));
  }, [stats]);

  // Check and update streak based on today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastStudyDate && stats.lastStudyDate !== today) {
        const lastDate = new Date(stats.lastStudyDate);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        // If more than 1 day missed, reset streak. 
        if (diffDays > 1) {
            setStats(prev => ({...prev, dailyStreak: 0}));
        }
    }
  }, []);

  const markWordLearned = (wordId: number) => {
    const today = new Date().toISOString().split('T')[0];
    
    setStats(prev => {
      const isAlreadyLearned = prev.learnedWordIds.includes(wordId);
      const newLearnedList = isAlreadyLearned ? prev.learnedWordIds : [...prev.learnedWordIds, wordId];
      
      let newStreak = prev.dailyStreak;
      // If we studied a new word today, and last study date wasn't today, increase streak
      if (!isAlreadyLearned && prev.lastStudyDate !== today) {
        newStreak = prev.dailyStreak === 0 ? 1 : prev.dailyStreak + 1;
      }

      return {
        ...prev,
        learnedWordIds: newLearnedList,
        lastStudyDate: today,
        dailyStreak: newStreak,
      };
    });
  };

  const setDailyGoal = (goal: number) => {
    setStats(prev => ({ ...prev, dailyGoal: goal }));
  };
  
  const rateWord = (wordId: number, rating: number) => {
    setStats(prev => ({
      ...prev,
      wordRatings: {
        ...prev.wordRatings,
        [wordId]: rating
      }
    }));
  };

  const setPreferredLevel = (level: Level | 'All') => {
    setStats(prev => ({ ...prev, preferredLevel: level }));
  };

  const resetProgress = () => {
      if (window.confirm("Bütün ilerlemen silinecek. Emin misin?")) {
           setStats(DEFAULT_STATS);
      }
  }

  // Calculate today's progress 
  // We can't perfectly track "today's learned words" with simple IDs if they learn over multiple days, 
  // but for simplicity, we'll assume the session progress is what matters, or we can improve it.
  // For a precise app, we would store { wordId, dateLearned }
  // To keep it simple for the hook, we'll expose a session learned count.
  const [sessionLearned, setSessionLearned] = useState<Set<number>>(new Set());
  
  const markSessionLearned = (wordId: number) => {
      setSessionLearned(prev => new Set([...prev, wordId]));
      markWordLearned(wordId);
  }

  return {
    stats,
    markWordLearned: markSessionLearned,
    rateWord,
    setDailyGoal,
    setPreferredLevel,
    sessionLearnedCount: sessionLearned.size,
    totalWords: ieltsWords.length,
    resetProgress
  };
};
