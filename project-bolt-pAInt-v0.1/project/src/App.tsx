import React, { useState } from 'react';
import { Camera, Upload, Palette, Home, HelpCircle, Zap } from 'lucide-react';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const toggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const paintingAreas = [
    { id: 'walls', label: 'Walls', icon: '🏠' },
    { id: 'ceiling', label: 'Ceiling', icon: '⬆️' },
    { id: 'trim', label: 'Trim', icon: '📐' },
    { id: 'cabinets', label: 'Cabinets', icon: '🗄️' }
  ];

  const colorPresets = [
    // Row 1 - Top row colors
    '#E8D5C4', '#F4E6B7', '#D4C4A8', '#A8B5A0', '#B8B8C8',
    // Row 2 - Middle row colors  
    '#E6B85C', '#C8A882', '#8B8B7A', '#7A9B8B', '#9FB8D3',
    // Row 3 - Bottom row colors
    '#C8704B', '#6B6B5C', '#6B7C59', '#4B5C6B', '#5C5C6B'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">pAInt</h1>
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Upload a photo and use AI to test paintjob colors in real time.
          </p>
        </div>
      </section>

      {/* Main App Interaction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Photo Upload */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Upload className="mr-3 text-blue-600" />
                Upload or Take a Photo of Your Room
              </h2>
              
              <div className="space-y-6">
                {/* Upload Button */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700">Click to upload an image</p>
                    <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                  </label>
                </div>

                {/* Camera Access */}
                <div className="flex items-center justify-center">
                  <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors">
                    <Camera className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-700">Use Camera</span>
                  </button>
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div className="mt-6">
                    <img 
                      src={previewUrl} 
                      alt="Room preview" 
                      className="w-full h-64 object-cover rounded-xl shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Color Picker */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Palette className="mr-3 text-red-600" />
                Choose Your Color
              </h2>
              
              <div className="space-y-6">
                {/* Color Input */}
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-16 h-16 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Selected Color</p>
                    <p className="text-lg font-mono text-gray-900">{selectedColor}</p>
                  </div>
                </div>

                {/* Color Presets */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Trending Colors</p>
                  <div className="grid grid-cols-5 gap-2">
                    {colorPresets.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          selectedColor === color ? 'border-gray-900 scale-110' : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Selected Color Preview */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Color Preview</p>
                  <div 
                    className="w-full h-20 rounded-lg border-2 border-gray-300"
                    style={{ backgroundColor: selectedColor }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Painting Area Selector */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Where would you like to apply this color?
            </h2>
            <p className="text-lg text-gray-600">Select one or more areas to visualize your color choice</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paintingAreas.map((area) => (
              <button
                key={area.id}
                onClick={() => toggleArea(area.id)}
                className={`p-6 rounded-xl border-2 transition-all text-center ${
                  selectedAreas.includes(area.id)
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400 text-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{area.icon}</div>
                <div className="font-medium">{area.label}</div>
              </button>
            ))}
          </div>

          {selectedAreas.length > 0 && (
            <div className="mt-8 text-center">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-colors shadow-lg">
                <Zap className="inline mr-2 h-5 w-5" />
                Apply AI Visualization
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-8 w-8 text-red-600 mr-2" />
              <span className="text-2xl font-bold">pAInt</span>
            </div>
            <p className="text-lg text-gray-300 mb-6">
              Powered by pAInt — the smarter way to test your next paint job.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;