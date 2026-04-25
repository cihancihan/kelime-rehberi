import { useVocabStore } from '../hooks/useVocabStore';
import { BookOpen, Target, Flame, Trophy, Play, Filter } from 'lucide-react';
import { Level } from '../data/words';

interface DashboardProps {
  onStartStudy: () => void;
  onStartQuiz: () => void;
  onStartWordGuess: () => void;
}

export function Dashboard({ onStartStudy, onStartQuiz, onStartWordGuess }: DashboardProps) {
  const { stats, sessionLearnedCount, totalWords, resetProgress, setPreferredLevel } = useVocabStore();
  const progressPercent = Math.round((stats.learnedWordIds.length / totalWords) * 100);
  const dailyPercent = Math.min(Math.round((sessionLearnedCount / stats.dailyGoal) * 100), 100);

  const levels: (Level | 'All')[] = ['All', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Seri (Gün)</p>
            <p className="text-2xl font-bold text-slate-800">{stats.dailyStreak}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Öğrenilen</p>
            <p className="text-2xl font-bold text-slate-800">{stats.learnedWordIds.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Günlük Hedef</p>
            <p className="text-2xl font-bold text-slate-800">{sessionLearnedCount} / {stats.dailyGoal}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
             <p className="text-sm text-slate-500 font-medium">Genel İlerleme</p>
            <p className="text-2xl font-bold text-slate-800">%{progressPercent}</p>
          </div>
        </div>
      </div>

      {/* Level Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-slate-600 font-medium">
          <Filter className="w-5 h-5 text-indigo-500" />
          <span>Kelime Seviyesi:</span>
        </div>
        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setPreferredLevel(lvl)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors whitespace-nowrap ${
                stats.preferredLevel === lvl 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl === 'All' ? 'Tümü' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Action Area */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Günün Kelimeleri Seni Bekliyor!</h2>
        <p className="text-indigo-100 mb-8 max-w-lg mx-auto text-lg">
          IELTS hedefinde günde sadece {stats.dailyGoal} kelime öğrenerek 500 kelimeye hızlıca ulaşabilirsin.
        </p>
        
        <div className="w-full max-w-md bg-white/20 rounded-full h-4 mb-6 backdrop-blur-sm overflow-hidden">
             <div 
                className="bg-white h-full transition-all duration-1000 ease-out"
                style={{ width: `${dailyPercent}%` }}
             ></div>
        </div>
        <p className="text-sm font-medium mb-8 text-indigo-50">Günlük hedefine ulaşmana {Math.max(0, stats.dailyGoal - sessionLearnedCount)} kelime kaldı.</p>

        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center font-sans mt-8">
            <button 
              onClick={onStartStudy}
              className="group bg-white text-indigo-600 font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center space-x-3 hover:bg-slate-50 hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <Play fill="currentColor" className="w-5 h-5 group-hover:text-indigo-500" />
              <span>Çalışmaya Başla</span>
            </button>
            <button 
              onClick={onStartQuiz}
              className="group bg-indigo-600/30 border border-white/20 backdrop-blur-md text-white font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center space-x-3 hover:bg-white/10 hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <Target className="w-5 h-5" />
              <span>Test ile Pratik Yap</span>
            </button>
            <button 
              onClick={onStartWordGuess}
              className="group bg-purple-600/30 border border-white/20 backdrop-blur-md text-white font-bold text-lg px-8 py-4 rounded-full flex items-center justify-center space-x-3 hover:bg-white/10 hover:scale-105 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <BookOpen className="w-5 h-5" />
              <span>Yazarak Pekiştir</span>
            </button>
        </div>
      </div>

      <div className="text-center pt-8">
        <button onClick={resetProgress} className="text-xs text-slate-400 hover:text-red-500 transition-colors underline">
            İlerlemeyi Sıfırla
        </button>
      </div>

    </div>
  );
}
