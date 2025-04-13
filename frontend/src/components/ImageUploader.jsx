import React, { useState } from "react";
import axios from "../api/axios";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [style, setStyle] = useState("comic");
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("style", style);

    try {
      const response = await axios.post("/cartoonify", formData, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      setResultUrl(url);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to process image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `cartoonified-${style}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glowing background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header with animated gradient text */}
      <h1 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-text-shimmer">
        TOONIFY PRO
      </h1>

      {/* Upload area with glow effect when dragging */}
      <div
        className={`w-full max-w-2xl border-2 border-dashed ${
          isDragging ? "border-cyan-400 bg-gray-800/50" : "border-gray-700"
        } rounded-2xl p-8 mb-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:bg-gray-800/30 backdrop-blur-sm`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="text-center cursor-pointer w-full">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="rounded-xl max-h-80 w-full object-contain border-2 border-gray-700 shadow-lg hover:shadow-cyan-500/20 transition-all"
            />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-6">
              <div className="text-6xl">🖼️</div>
              <p className="text-xl font-medium text-gray-300">
                {isDragging ? "DROP TO UPLOAD" : "DRAG & DROP IMAGE"}
              </p>
              <p className="text-gray-400 text-sm">or click to browse</p>
              <p className="text-xs text-gray-500 mt-2">
                Supports JPG, PNG, WEBP (Max 10MB)
              </p>
            </div>
          )}
        </label>
      </div>

      {/* Controls with neon glow */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-2xl">
        <div className="relative flex-1">
          <select
            className="w-full bg-gray-800 border border-gray-700 hover:border-cyan-400 focus:border-cyan-400 px-4 py-3 rounded-xl appearance-none outline-none transition-all cursor-pointer"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="comic">🎨 Comic Book Style</option>
            <option value="anime">🌸 Anime Style</option>
            <option value="pixel">👾 Pixel Art</option>
            <option value="watercolor">🎨 Watercolor</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            ▼
          </div>
        </div>
        <button
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          className={`px-6 py-3 rounded-xl font-bold shadow-lg transition-all ${
            loading
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 hover:shadow-cyan-500/40"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">🌀</span> PROCESSING...
            </span>
          ) : (
            "GENERATE MAGIC"
          )}
        </button>
      </div>

      {/* Result section with animated entrance */}
      {resultUrl && (
        <div className="mt-8 w-full max-w-2xl animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              YOUR TOONIFIED CREATION
            </h2>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-5 py-2 rounded-xl font-semibold shadow-md transition-all"
            >
              <span>⬇️</span> DOWNLOAD
            </button>
          </div>
          <div className="relative group">
            <img
              src={resultUrl}
              alt="Cartoonified"
              className="w-full rounded-xl border-2 border-gray-700 shadow-2xl transform group-hover:scale-[1.01] transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end p-4">
              <p className="text-white text-sm font-medium">
                {style === "comic" && "🦸 Comic book effect applied"}
                {style === "anime" && "🌸 Anime style transformation"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>Powered by AI magic • Not storing your images</p>
      </div>
    </div>
  );
};

export default ImageUploader;