import React from "react";
import ImageUploader from "./components/ImageUploader";
import Description from "./components/Description";

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative">
      {/* Floating abstract shapes (for visual interest) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-purple-600/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-cyan-500/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-pink-600/15 blur-3xl"></div>
      </div>

      {/* Main container with edgy asymmetric layout */}
      <div className="container mx-auto px-5 py-12 md:px-10 lg:px-16 relative z-10">
        {/* HEADER: Bold & Playful */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 mb-4">
            ARTOONIFY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto md:mx-0">
            Turn reality into <span className="font-bold text-cyan-400">playful art</span> with  magic.
          </p>
        </header>

        {/* MAIN CONTENT: Split-screen effect */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left side (Description) - Tilted for dynamism */}
          <div className="lg:w-1/2 lg:-rotate-1 transform-gpu p-6 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl hover:shadow-purple-500/20 transition-all">
            <Description />
          </div>

          {/* Right side (Uploader) - Glowing effect */}
          <div className="lg:w-1/2 lg:rotate-1 transform-gpu p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
              <span className="text-white">🎨</span> Upload & Transform
            </h2>
            <ImageUploader />
          </div>
        </div>

        {/* FOOTER: Neon underline effect */}
        <footer className="mt-24 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Cartoonify —{" "}
            <span className="relative inline-block">
              <span className="text-white font-medium">Made for creators</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600"></span>
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;