import React from 'react';
import { AnalysisResult } from '../types';
import CocktailCard from './CocktailCard';
import { Stars, User, VenetianMask, Heart } from 'lucide-react';

interface Props {
  data: AnalysisResult;
  onReset: () => void;
}

const AnalysisResultDisplay: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      
      {/* Intro / Face Reading */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#B8956A]/10 text-[#B8956A] mb-4">
          <Stars size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl md:text-3xl font-playfair text-[#2C2C2C] font-semibold">
          面相解读 · Face Reading
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto italic font-light">
          {data.faceReading}
        </p>
        <div className="w-24 h-1 bg-[#8B2942] mx-auto opacity-20 rounded-full mt-8"></div>
      </div>

      {/* Personality Analysis */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        
        {/* Social Mask */}
        <div className="bg-white/60 p-8 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden group hover:bg-white/80 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <VenetianMask size={120} />
          </div>
          <div className="flex items-center gap-3 mb-4 text-[#B8956A]">
            <VenetianMask size={24} />
            <h3 className="text-xl font-bold uppercase tracking-wider font-playfair">外在人格</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
            {data.socialMask.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {data.socialMask.traits.map((trait, i) => (
              <span key={i} className="px-3 py-1 bg-[#B8956A]/10 text-[#B8956A] text-xs rounded-full uppercase tracking-wide">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* True Essence */}
        <div className="bg-white/60 p-8 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden group hover:bg-white/80 transition-colors">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Heart size={120} />
          </div>
          <div className="flex items-center gap-3 mb-4 text-[#8B2942]">
            <User size={24} />
            <h3 className="text-xl font-bold uppercase tracking-wider font-playfair">内在自我</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">
            {data.trueEssence.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {data.trueEssence.traits.map((trait, i) => (
              <span key={i} className="px-3 py-1 bg-[#8B2942]/10 text-[#8B2942] text-xs rounded-full uppercase tracking-wide">
                {trait}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Cocktails Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-playfair italic text-gray-400 mb-2">The Mixology</h2>
        <div className="text-3xl md:text-4xl text-[#2C2C2C] font-serif">灵魂之酒</div>
      </div>

      <CocktailCard cocktail={data.outerCocktail} type="outer" />
      
      <div className="flex items-center justify-center my-12 opacity-30">
        <div className="h-px bg-[#2C2C2C] w-1/4"></div>
        <div className="mx-4 text-2xl">✦</div>
        <div className="h-px bg-[#2C2C2C] w-1/4"></div>
      </div>

      <CocktailCard cocktail={data.innerCocktail} type="inner" />

      {/* Closing */}
      <div className="mt-20 p-8 md:p-12 bg-[#8B2942] text-[#F5F1E8] rounded-xl shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <div className="text-4xl mb-6">🌙</div>
          <h3 className="text-2xl font-playfair mb-6">调酒师寄语</h3>
          <p className="text-lg md:text-xl font-light italic leading-relaxed max-w-2xl mx-auto opacity-90">
            "{data.closingMessage}"
          </p>
          <div className="mt-8 pt-8 border-t border-white/20 text-sm font-playfair uppercase tracking-[0.2em] opacity-70">
            Made with love by your mystical bartender
          </div>
          
          <button 
            onClick={onReset}
            className="mt-8 px-8 py-3 bg-[#F5F1E8] text-[#8B2942] font-semibold rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
          >
            Consult Another Patron
          </button>
        </div>
      </div>

    </div>
  );
};

export default AnalysisResultDisplay;