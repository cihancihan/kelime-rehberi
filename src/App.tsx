import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StudyDeck } from './components/StudyDeck';
import { QuizGame } from './components/QuizGame';
import { WordGuessGame } from './components/WordGuessGame';
import { SettingsModal } from './components/SettingsModal';
import { GraduationCap, Settings } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

type Screen = 'dashboard' | 'study' | 'quiz' | 'word-guess';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 opacity-95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer transition-opacity hover:opacity-80"
              onClick={() => setCurrentScreen('dashboard')}
            >
              <div className="bg-indigo-600 p-2 rounded-xl text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">IELTS Kelime Rehberi</h1>
            </div>
            
            <div className="flex space-x-4 items-center">
              <span className="hidden sm:inline-flex items-center text-sm font-medium text-slate-500">Hedef: 500 Kelime</span>
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="py-8">
         {currentScreen === 'dashboard' && (
           <Dashboard 
             onStartStudy={() => setCurrentScreen('study')} 
             onStartQuiz={() => setCurrentScreen('quiz')}
             onStartWordGuess={() => setCurrentScreen('word-guess')}
           />
         )}
         {currentScreen === 'study' && (
           <StudyDeck onFinish={() => setCurrentScreen('dashboard')} />
         )}
         {currentScreen === 'quiz' && (
           <QuizGame onFinish={() => setCurrentScreen('dashboard')} />
         )}
         {currentScreen === 'word-guess' && (
           <WordGuessGame onFinish={() => setCurrentScreen('dashboard')} />
         )}
      </main>

      <AnimatePresence>
        {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      </AnimatePresence>

    </div>
  );
}
