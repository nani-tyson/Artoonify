import React from 'react';

const Description = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl border border-gray-700/50 backdrop-blur-sm">
      {/* Glowing corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
           CARTOONIFIER PRO
        </h1>
        
        <div className="space-y-4 text-gray-300">
          <p className="text-lg leading-relaxed">
            <span className="text-cyan-400 font-medium">Transform reality</span> into stunning cartoon art with 
            our <span className="text-purple-400 font-medium">neural network magic</span>. Perfect for social media, 
            avatars, or just unleashing your creativity.
          </p>
          
          <div className="flex flex-wrap gap-2 justify-center my-6">
            <span className="px-3 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-sm border border-cyan-400/20">
              🎨 Comic Book Style
            </span>
            <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm border border-purple-400/20">
              🌸 Anime Filter
            </span>
            <span className="px-3 py-1 bg-pink-900/30 text-pink-400 rounded-full text-sm border border-pink-400/20">
              👾 Pixel Art
            </span>
            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm border border-green-400/20">
              🖌️ Watercolor
            </span>
          </div>
          
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/80 mt-6">
            <h3 className="font-bold text-cyan-300 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              HOW IT WORKS
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyan-300 transition-colors">Upload any photo (JPG/PNG)</li>
              <li className="hover:text-purple-300 transition-colors">Select your artistic style</li>
              <li className="hover:text-pink-300 transition-colors">Let our  work its magic (≈15s)</li>
              <li className="hover:text-green-300 transition-colors">Download HD quality result</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;