import { useState, useMemo } from 'react';
import { Word, ieltsWords } from '../data/words';
import { useVocabStore } from '../hooks/useVocabStore';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, XCircle, ArrowRight, CheckCircle2, Target } from 'lucide-react';

interface QuizGameProps {
  onFinish: () => void;
}

export function QuizGame({ onFinish }: QuizGameProps) {
  const { stats } = useVocabStore();

  // Select 10 random words to quiz on
  const quizWords = useMemo(() => {
     let filteredWords = ieltsWords;
     if (stats.preferredLevel !== 'All') {
         filteredWords = filteredWords.filter(w => w.level === stats.preferredLevel);
     }
     const shuffled = [...filteredWords].sort(() => 0.5 - Math.random());
     return shuffled.slice(0, 10);
  }, [stats.preferredLevel]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const currentWord = quizWords[currentIndex];

  // Generate 4 options (1 correct, 3 wrong)
  const options = useMemo(() => {
      if (!currentWord) return [];
      const wrongOptions = ieltsWords
          .filter(w => w.id !== currentWord.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(w => w.en);
      
      const allOptions = [...wrongOptions, currentWord.en].sort(() => 0.5 - Math.random());
      return allOptions;
  }, [currentWord]);

  if (quizWords.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
              <div className="bg-slate-100 p-6 rounded-full text-slate-400 mb-6">
                 <Target className="w-16 h-16" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Kelime Bulunamadı</h2>
              <p className="text-slate-500 mb-8">Bu seviyede test edilecek kelime yok.</p>
              <button 
                onClick={onFinish}
                className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors"
              >
                 Geri Dön
              </button>
          </div>
      );
  }

  if (currentIndex >= quizWords.length) {
      return (
          <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
              <div className="bg-yellow-100 p-6 rounded-full text-yellow-600 mb-6">
                 <Trophy className="w-16 h-16" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Süper Başarı!</h2>
              <p className="text-xl font-medium text-slate-600 mb-8">Puanın: {score} / {quizWords.length}</p>
              
              <button 
                onClick={onFinish}
                className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all text-lg"
              >
                 Oyunu Bitir ve Dön
              </button>
          </div>
      );
  }

  const handleSelect = (option: string) => {
      if (selectedOption) return; // Prevent multiple clicks
      setSelectedOption(option);
      
      if (option === currentWord.en) {
          setScore(s => s + 1);
      }

      // Auto advance after 1.5s
      setTimeout(() => {
          setSelectedOption(null);
          setCurrentIndex(prev => prev + 1);
      }, 1500);
  }

  return (
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
          <div className="flex justify-between items-center mb-8">
               <button onClick={onFinish} className="text-slate-400 hover:text-slate-600 font-medium">
                   &larr; Çıkış
               </button>
               <div className="text-sm font-bold text-slate-500 bg-slate-100 px-4 py-1 rounded-full">
                  Soru {currentIndex + 1} / {quizWords.length}
               </div>
               <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-1 rounded-full">
                  Skor: {score}
               </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center mb-8">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4 block">Bu kelimenin İngilizcesi nedir?</span>
              <h2 className="text-4xl font-bold text-slate-800">{currentWord.tr}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {options.map((opt, i) => {
                  let btnStateClass = "bg-white border-2 border-slate-100 text-slate-700 hover:border-indigo-300 hover:bg-slate-50";
                  
                  if (selectedOption) {
                      if (opt === currentWord.en) {
                          btnStateClass = "bg-green-100 border-2 border-green-500 text-green-700 scale-[1.02] z-10";
                      } else if (opt === selectedOption) {
                          btnStateClass = "bg-red-100 border-2 border-red-500 text-red-700 scale-95 opacity-80";
                      } else {
                          btnStateClass = "bg-white border-2 border-slate-100 text-slate-400 opacity-50";
                      }
                  }

                  return (
                      <button
                         key={i}
                         disabled={!!selectedOption}
                         onClick={() => handleSelect(opt)}
                         className={`relative p-6 rounded-2xl font-bold text-lg text-center transition-all duration-300 ease-out flex items-center justify-center ${btnStateClass}`}
                      >
                         {opt}
                         {selectedOption && opt === currentWord.en && <CheckCircle2 className="absolute right-4 w-6 h-6 text-green-600" />}
                         {selectedOption && opt === selectedOption && opt !== currentWord.en && <XCircle className="absolute right-4 w-6 h-6 text-red-600" />}
                      </button>
                  );
              })}
          </div>
      </div>
  );
}
