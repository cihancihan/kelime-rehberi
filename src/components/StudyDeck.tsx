import React, { useState } from 'react';
import { Word, ieltsWords } from '../data/words';
import { useVocabStore } from '../hooks/useVocabStore';
import { generateNewSentence } from '../services/aiService';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, X, ArrowRight, Loader2, Volume2, Star } from 'lucide-react';

interface StudyDeckProps {
  onFinish: () => void;
}

export function StudyDeck({ onFinish }: StudyDeckProps) {
  const { stats, markWordLearned, rateWord } = useVocabStore();
  
  // Create a study queue. Simple logic: Words not yet learned.
  const [deck] = useState<Word[]>(() => {
     let filteredWords = ieltsWords;
     if (stats.preferredLevel !== 'All') {
         filteredWords = filteredWords.filter(w => w.level === stats.preferredLevel);
     }
     const unlearned = filteredWords.filter(w => !stats.learnedWordIds.includes(w.id));
     // Shuffle or take first N. For now, let's take unlearned.
     return unlearned.slice(0, 50); // Take a batch of 50
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [actionState, setActionState] = useState<'learned' | 'repeat' | null>(null);
  
  // AI Feature States
  const [isGeneratingAIsentence, setIsGeneratingAIsentence] = useState(false);
  const [customSentence, setCustomSentence] = useState<{en: string, tr: string} | null>(null);

  if (deck.length === 0 || currentIndex >= deck.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
        <div className="bg-green-100 p-6 rounded-full text-green-600 mb-6">
          <Check className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Set Tamamlandı!</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Bu seviyedeki veya günlük öğrenilecek kelimeleri tamamladın.</p>
        <button 
          onClick={onFinish}
          className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-2xl hover:bg-indigo-700 transition-colors"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  const currentWord = deck[currentIndex];

  const handleNext = (learned: boolean) => {
    setActionState(learned ? 'learned' : 'repeat');
    
    setTimeout(() => {
      if (learned) {
        markWordLearned(currentWord.id);
      }
      // Proceed to next card
      setIsFlipped(false);
      setCustomSentence(null);
      setActionState(null);
      setCurrentIndex(prev => prev + 1);
    }, 600); // Wait for the animation before moving
  };

  const handleAIRequest = async (e: React.MouseEvent) => {
      e.stopPropagation(); // prevent flipping the card
      setIsGeneratingAIsentence(true);
      const res = await generateNewSentence(currentWord.en, currentWord.tr);
      if (res) {
          setCustomSentence(res);
      }
      setIsGeneratingAIsentence(false);
  }

  const speakWord = (e: React.MouseEvent, text: string) => {
       e.stopPropagation();
       const utterance = new SpeechSynthesisUtterance(text);
       utterance.lang = 'en-US';
       window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center">
      
      {/* Progress header */}
      <div className="w-full flex items-center justify-between mb-8">
        <button onClick={onFinish} className="text-slate-400 hover:text-slate-600 font-medium">
            &larr; Çıkış
        </button>
        <span className="bg-slate-100 text-slate-600 px-4 py-1 rounded-full text-sm font-bold">
            Kalan: {deck.length - currentIndex}
        </span>
      </div>

      <div className="relative w-full aspect-[4/5] sm:aspect-[3/2] perspective-[1000px]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentWord.id + (isFlipped ? "-back" : "-front")}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0, scale: 0.95 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className={`absolute w-full h-full rounded-3xl shadow-xl cursor-pointer p-8 flex flex-col justify-center items-center text-center ${
                isFlipped ? 'bg-white border-2 border-indigo-100' : 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white'
            }`}
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          >
            {/* FRONT OF CARD */}
            {!isFlipped && (
              <>
                <div className="absolute top-6 left-6 flex gap-2">
                     <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm">{currentWord.level}</span>
                     <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-sm">{currentWord.category}</span>
                </div>
                
                {currentWord.emoji && (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl sm:text-7xl mb-6 bg-white/20 p-6 rounded-full backdrop-blur-sm shadow-inner"
                    >
                        {currentWord.emoji}
                    </motion.div>
                )}

                <h2 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">{currentWord.en}</h2>
                <p className="text-indigo-100 text-lg">Kelimenin anlamını görmek için dokunun</p>

                <button 
                  onClick={(e) => speakWord(e, currentWord.en)}
                  className="absolute bottom-6 right-6 bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
                  title="Dinle"
                >
                    <Volume2 className="w-6 h-6" />
                </button>
              </>
            )}

            {/* BACK OF CARD */}
            {isFlipped && (
              <div className="w-full h-full flex flex-col pt-8">
                 <h2 className="text-4xl font-bold text-slate-800 mb-2">{currentWord.en}</h2>
                 <p className="text-2xl text-indigo-600 font-medium mb-8">{currentWord.tr}</p>
                 
                 <div className="flex-1 overflow-y-auto text-left space-y-4 px-4 w-full">
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                         <p className="text-slate-800 font-medium mb-1">{currentWord.exampleEn}</p>
                         <p className="text-slate-500 text-sm">{currentWord.exampleTr}</p>
                     </div>

                     {/* AI SENTECE SECTION */}
                     {customSentence ? (
                         <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 relative">
                             <div className="absolute -top-3 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">AI Oluşturdu</div>
                             <p className="text-slate-800 font-medium mb-1">{customSentence.en}</p>
                             <p className="text-slate-500 text-sm">{customSentence.tr}</p>
                         </div>
                     ) : (
                         <button 
                            onClick={handleAIRequest}
                            disabled={isGeneratingAIsentence}
                            className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl border-2 border-dashed border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                         >
                             {isGeneratingAIsentence ? (
                                 <Loader2 className="w-5 h-5 animate-spin" />
                             ) : (
                                 <>
                                    <Sparkles className="w-5 h-5 text-purple-500" />
                                    <span className="text-sm font-medium">Bana yapay zeka ile yeni bir cümle kur</span>
                                 </>
                             )}
                         </button>
                     )}
                 </div>

                 {/* RATING SYSTEM */}
                 <div className="flex flex-col items-center mt-6 px-4">
                    <p className="text-sm text-slate-500 mb-2 font-medium">Bu kelimeyi ne kadar iyi biliyorsun?</p>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                               key={star}
                               onClick={(e) => { e.stopPropagation(); rateWord(currentWord.id, star); }}
                               className={`p-2 rounded-full transition-all hover:scale-110 ${
                                 (stats.wordRatings[currentWord.id] || 0) >= star 
                                    ? 'text-amber-400' 
                                    : 'text-slate-200 hover:text-amber-200'
                               }`}
                            >
                                <Star className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                  (stats.wordRatings[currentWord.id] || 0) >= star ? 'fill-current drop-shadow-sm' : ''
                                }`} />
                            </button>
                        ))}
                    </div>
                 </div>

                 {/* ACTION BUTTONS */}
                 <div className="flex gap-4 mt-6 px-4 pb-4">
                     <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                        className="flex-1 py-4 flex justify-center items-center rounded-2xl text-red-500 border-2 border-red-100 hover:bg-red-50 font-bold transition-colors"
                     >
                         <X className="w-6 h-6 mr-2" /> Tekrar Et
                     </motion.button>
                     <motion.button 
                         whileTap={{ scale: 0.95 }}
                         onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                         className="flex-1 py-4 flex justify-center items-center rounded-2xl text-white bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200 font-bold transition-colors"
                     >
                         Öğrendim <Check className="w-6 h-6 ml-2" />
                     </motion.button>
                 </div>
              </div>
            )}

            <AnimatePresence>
              {actionState === 'learned' && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-green-500/90 rounded-3xl backdrop-blur-md"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-32 h-32 text-white" />
                  </motion.div>
                </motion.div>
              )}
              {actionState === 'repeat' && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-red-500/90 rounded-3xl backdrop-blur-md"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <X className="w-32 h-32 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
