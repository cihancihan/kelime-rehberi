import React, { useState } from 'react';
import { useSettingsStore } from '../hooks/useSettingsStore';
import { Settings, X, Check, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function SettingsModal({ onClose }: { onClose: () => void }) {
  const { apiKey, setApiKey } = useSettingsStore();
  const [internalKey, setInternalKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(internalKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
         onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-500" />
            <h2 className="font-semibold text-slate-800">Ayarlar</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-800 flex items-center gap-2">
              Gemini API Anahtarı
            </h3>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Google Gemini API <strong>tamamen ücretsizdir</strong> (dakikada 15 isteğe kadar). Kendi anahtarınızı ekleyerek uygulamayı dilediğiniz her yerde eksiksiz kullanabilirsiniz.
            </p>
            
            <div className="flex flex-col gap-2">
                <input 
                  type="password"
                  value={internalKey}
                  onChange={(e) => setInternalKey(e.target.value)}
                  placeholder="AIzaSyB..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-mono text-sm"
                />
            </div>
            
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
            >
               Ücretsiz API Anahtarı Al <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
               İptal
            </button>
            <button 
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-lg transition-all active:scale-95"
            >
               {saved ? <><Check className="w-4 h-4"/> Kaydedildi</> : 'Kaydet'}
            </button>
        </div>
      </motion.div>
    </div>
  );
}
