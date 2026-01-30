import React from 'react';
import { CocktailProfile } from '../types';
import { Wine, Droplets, Sparkles, Eye, Flower2, Thermometer } from 'lucide-react';

interface CocktailCardProps {
  cocktail: CocktailProfile;
  type: 'outer' | 'inner';
}

const CocktailCard: React.FC<CocktailCardProps> = ({ cocktail, type }) => {
  const isOuter = type === 'outer';
  const borderColor = isOuter ? 'border-[#B8956A]' : 'border-[#8B2942]';
  const titleColor = isOuter ? 'text-[#B8956A]' : 'text-[#8B2942]';
  const bgGradient = isOuter 
    ? 'bg-gradient-to-br from-[#FFFEF9] to-[#F5F1E8]' 
    : 'bg-gradient-to-br from-[#FDF2F4] to-[#F5F1E8]';

  return (
    <div className={`relative p-8 rounded-xl border-4 border-double ${borderColor} ${bgGradient} shadow-lg my-8 transition-transform duration-500 hover:scale-[1.01]`}>
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`text-xs uppercase tracking-[0.2em] mb-2 text-gray-500 font-playfair`}>
          {isOuter ? 'The Social Mask' : 'The True Essence'}
        </div>
        <h3 className={`text-3xl md:text-4xl font-bold mb-1 font-playfair ${titleColor}`}>
          {cocktail.name}
        </h3>
        <p className="text-sm italic text-gray-400 font-playfair tracking-wider">
          {cocktail.nameEn}
        </p>
      </div>

      {/* Mapping Reason */}
      <div className="mb-8 text-center px-4">
        <p className="text-gray-700 leading-relaxed italic font-light">
          "{cocktail.mappingReason}"
        </p>
      </div>

      <div className="w-full h-px bg-current opacity-20 my-6 mx-auto max-w-[50%]" style={{ color: isOuter ? '#B8956A' : '#8B2942' }}></div>

      {/* Cocktail Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gray-400 border-b pb-1 mb-3">Profile</h4>
          <div className="flex items-start gap-3">
            <Wine className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-gray-500 block uppercase">Base</span>
              <span className="text-gray-800 font-medium">{cocktail.base}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Droplets className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-gray-500 block uppercase">Ingredients</span>
              <span className="text-gray-800 text-sm">{cocktail.ingredients}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Thermometer className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-gray-500 block uppercase">ABV</span>
              <span className="text-gray-800 text-sm">{cocktail.abv}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gray-400 border-b pb-1 mb-3">Sensory</h4>
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div className="text-sm text-gray-700">{cocktail.visual}</div>
          </div>
          <div className="flex items-start gap-3">
            <Flower2 className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div className="text-sm text-gray-700">{cocktail.smell}</div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div className="text-sm text-gray-700">{cocktail.taste}</div>
          </div>
        </div>
      </div>

      {/* Whisper */}
      <div className="mt-8 pt-6 border-t border-dashed border-gray-300 relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5F1E8] px-2 text-gray-400 text-lg">❝</div>
        <p className="text-center text-[#8B2942] font-medium italic">
          {cocktail.bartenderWhisper}
        </p>
      </div>
    </div>
  );
};

export default CocktailCard;