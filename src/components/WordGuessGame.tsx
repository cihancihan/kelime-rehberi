import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Word, ieltsWords } from '../data/words';
import { useVocabStore } from '../hooks/useVocabStore';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, Trophy, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface WordGuessGameProps {
  onFinish: () => void;
}

export function WordGuessGame({ onFinish }: WordGuessGameProps) {
  const { stats } = useVocabStore();

  // Pick up to 10 words, prioritizing learned words
  const gameWords = useMemo(() => {
    let filteredWords = ieltsWords;
    if (stats.preferredLevel !== 'All') {
        filteredWords = filteredWords.filter(w => w.level === stats.preferredLevel);
    }
    
    const learnedWords = filteredWords.filter(w => stats.learnedWordIds.includes(w.id));
    const unlearnedWords = filteredWords.filter(w => !stats.learnedWordIds.includes(w.id));
    
    // Shuffle both
    const shuffledLearned = [...learnedWords].sort(() => 0.5 - Math.random());
    const shuffledUnlearned = [...unlearnedWords].sort(() => 0.5 - Math.random());
    
    // Combine, preferring learned
    const combined = [...shuffledLearned, ...shuffledUnlearned];
    return combined.slice(0, 10);
  }, [stats.learnedWordIds, stats.preferredLevel]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      // Focus input on mount and when moving to next word
      if (feedback === 'idle' && inputRef.current) {
          inputRef.current.focus();
      }
  }, [currentIndex, feedback]);

  if (gameWords.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
              <div className="bg-slate-100 p-6 rounded-full text-slate-400 mb-6">
                 <CheckCircle2 className="w-16 h-16" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Kelime Bulunamadı</h2>
              <p className="text-slate-500 mb-8">Bu seviyede pratiği yapılacak kelime yok.</p>
              <button 
                onClick={onFinish}
                className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
              >
                 Geri Dön
              </button>
          </div>
      );
  }

  if (currentIndex >= gameWords.length) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
              <div className="bg-purple-100 p-6 rounded-full text-purple-600 mb-6">
                 <Trophy className="w-16 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Harika Bir Egzersiz!</h2>
              <p className="text-xl font-medium text-slate-600 mb-8">Puanın: {score} / {gameWords.length}</p>
              
              <button 
                onClick={onFinish}
                className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all text-lg"
              >
                 Ana Ekrana Dön
              </button>
          </div>
      );
  }

  const currentWord = gameWords[currentIndex];

  // Replace the target word (case-insensitive) with blanks in the example sentence
  const hintSentence = currentWord.exampleEn.replace(new RegExp(currentWord.en, 'gi'), '_____');

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!userInput.trim() || feedback !== 'idle') return;

      const isCorrect = userInput.trim().toLowerCase() === currentWord.en.toLowerCase();
      
      if (isCorrect) {
          setFeedback('correct');
          setScore(s => s + 1);
          setTimeout(() => handleNext(), 1500);
      } else {
          setFeedback('wrong');
      }
  };

  const handleNext = () => {
      setFeedback('idle');
      setUserInput('');
      setShowHint(false);
      setCurrentIndex(prev => prev + 1);
  };

  return (
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
          <div className="flex justify-between items-center mb-8">
               <button onClick={onFinish} className="text-slate-400 hover:text-slate-600 font-medium">
                   &larr; Çıkış
               </button>
               <div className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-1 rounded-full">
                  Kelime {currentIndex + 1} / {gameWords.length}
               </div>
               <div className="text-sm font-bold text-purple-600 bg-purple-50 px-4 py-1 rounded-full">
                  Skor: {score}
               </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center mb-8">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 block">Aşağıdaki anlama gelen İngilizce kelimeyi yazın</span>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">{currentWord.tr}</h2>
              
              <AnimatePresence>
                  {showHint && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-indigo-50 text-indigo-800 p-4 rounded-2xl text-left border border-indigo-100 mb-6"
                      >
                          <div className="flex items-start space-x-2">
                              <Lightbulb className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                              <div>
                                  <p className="font-medium text-sm text-indigo-400 mb-1">İpucu Cümlesi:</p>
                                  <p className="text-lg">{hintSentence}</p>
                              </div>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>

              {!showHint && (
                  <button 
                    onClick={() => setShowHint(true)}
                    className="text-sm font-medium text-amber-500 bg-amber-50 px-4 py-2 rounded-full hover:bg-amber-100 transition-colors"
                  >
                      İpucu Göster
                  </button>
              )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="relative">
                  <input 
                      ref={inputRef}
                      type="text"
                      disabled={feedback === 'correct'}
                      value={userInput}
                      onChange={(e) => {
                          setUserInput(e.target.value);
                          if (feedback === 'wrong') setFeedback('idle');
                      }}
                      placeholder="İngilizce kelimeyi yazın..."
                      className={`w-full p-6 bg-white border-2 rounded-2xl text-2xl text-center font-bold outline-none transition-colors shadow-sm
                          ${feedback === 'idle' ? 'border-slate-200 focus:border-indigo-500' : ''}
                          ${feedback === 'correct' ? 'border-green-500 bg-green-50 text-green-700' : ''}
                          ${feedback === 'wrong' ? 'border-red-500 bg-red-50 text-red-700' : ''}
                      `}
                  />
                  {feedback === 'correct' && (
                      <CheckCircle2 className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-green-500 animate-in zoom-in" />
                  )}
                  {feedback === 'wrong' && (
                      <XCircle className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-red-500 animate-in zoom-in" />
                  )}
              </div>
              
              {feedback === 'wrong' && (
                  <div className="flex items-center justify-between bg-red-50 p-4 rounded-2xl border border-red-100">
                      <p className="text-red-700 font-medium leading-tight">
                         Yanlış cevap! Doğru kelime: <strong className="text-lg">{currentWord.en}</strong>
                      </p>
                      <button 
                          type="button"
                          onClick={() => handleNext()}
                          className="flex items-center text-red-700 bg-red-100 px-4 py-2 rounded-xl font-bold hover:bg-red-200 transition-colors"
                      >
                          Geç <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                  </div>
              )}

              {feedback === 'idle' && (
                  <button 
                      type="submit"
                      disabled={!userInput.trim()}
                      className="w-full bg-indigo-600 text-white font-bold text-lg p-6 rounded-2xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
                  >
                      Kontrol Et
                  </button>
              )}
          </form>
      </div>
  );
}
