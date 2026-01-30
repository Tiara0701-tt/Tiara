import React, { useState } from 'react';
import { Upload, Camera, Sparkles } from 'lucide-react';
import { AnalysisResult, AppState } from './types';
import { analyzeImage, fileToBase64 } from './services/geminiService';
import AnalysisResultDisplay from './components/AnalysisResultDisplay';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAppState(AppState.ANALYZING);
    setError(null);

    try {
      const base64 = await fileToBase64(file);
      const data = await analyzeImage(base64);
      setResult(data);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("Failed to consult the spirits. Please try a different photo.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setAppState(AppState.IDLE);
    setResult(null);
    setError(null);
  };

  if (appState === AppState.ANALYZING) {
    return <LoadingScreen />;
  }

  if (appState === AppState.RESULT && result) {
    return <AnalysisResultDisplay data={result} onReset={resetApp} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] relative overflow-hidden">
      {/* Decorative Border */}
      <div className="fixed inset-4 border border-[#B8956A] opacity-30 pointer-events-none rounded-2xl z-0"></div>
      <div className="fixed inset-6 border border-[#B8956A] opacity-20 pointer-events-none rounded-xl z-0"></div>

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        
        {/* Header */}
        <div className="text-center mb-12 animate-[fadeIn_1s_ease-out]">
          <div className="inline-block p-4 border-2 border-[#8B2942] rounded-full mb-6">
            <Sparkles className="w-8 h-8 text-[#8B2942]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-[#2C2C2C] mb-4">
            The Mystic Mixologist
          </h1>
          <h2 className="text-xl md:text-2xl font-serif text-[#8B2942] tracking-widest uppercase">
            面相调酒师
          </h2>
          <div className="w-24 h-1 bg-[#B8956A] mx-auto mt-8 mb-8 opacity-50"></div>
          <p className="max-w-md mx-auto text-gray-600 italic font-light leading-relaxed">
            "Upload your portrait, and I shall read the story etched in your features, mixing two cocktails: one for the mask you wear, and one for the soul you hide."
          </p>
        </div>

        {/* Upload Area */}
        <div className="w-full max-w-md animate-[fadeIn_1s_ease-out_0.5s]">
          <label className="group relative block w-full aspect-[4/3] rounded-xl border-2 border-dashed border-[#B8956A] hover:border-[#8B2942] bg-[#FFFEF9] hover:bg-white transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 transition-transform group-hover:scale-105 duration-500">
              <div className="w-16 h-16 bg-[#F5F1E8] rounded-full flex items-center justify-center mb-4 text-[#8B2942] group-hover:text-[#B8956A] transition-colors">
                <Camera size={32} />
              </div>
              <h3 className="text-xl font-playfair text-[#2C2C2C] mb-2">Upload Portrait</h3>
              <p className="text-sm text-gray-500 font-serif">Click or drag & drop</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-[#B8956A] uppercase tracking-widest opacity-60">
                <Upload size={14} />
                <span>Begin Consultation</span>
              </div>
            </div>
            
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#B8956A] m-2 opacity-50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#B8956A] m-2 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#B8956A] m-2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#B8956A] m-2 opacity-50"></div>
          </label>

          {appState === AppState.ERROR && (
            <div className="mt-6 text-center text-red-800 bg-red-50 p-4 rounded-lg border border-red-100 font-serif text-sm">
              {error}
              <button onClick={resetApp} className="block w-full mt-2 underline">Try Again</button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 text-center w-full text-xs text-gray-400 font-playfair tracking-widest uppercase opacity-60">
          A Gemini Powered Experience
        </footer>

      </main>
    </div>
  );
}

export default App;