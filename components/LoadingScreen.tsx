import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F1E8]">
      <div className="relative">
        {/* Simple Shaker Animation using CSS only structure */}
        <div className="w-16 h-24 border-4 border-[#2C2C2C] rounded-lg relative overflow-hidden animate-pulse">
           <div className="absolute bottom-0 w-full h-2/3 bg-[#8B2942] opacity-80 animate-[bounce_1s_infinite]"></div>
        </div>
        {/* Cap */}
        <div className="w-12 h-6 border-4 border-[#2C2C2C] border-b-0 rounded-t-lg absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F5F1E8]"></div>
      </div>
      
      <div className="mt-12 text-center space-y-4">
        <h3 className="text-2xl font-playfair text-[#2C2C2C]">Mixing your soul...</h3>
        <div className="flex flex-col gap-2 text-[#8B2942]/70 text-sm font-serif italic">
          <span className="animate-[fade_2s_ease-in-out_infinite]">Observing facial features...</span>
          <span className="animate-[fade_2s_ease-in-out_1s_infinite]">Deciphering the mask...</span>
          <span className="animate-[fade_2s_ease-in-out_2s_infinite]">Selecting the perfect spirits...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;