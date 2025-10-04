import { useTimelineStore } from '../../state/useTimelineStore';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Timeline() {
  const {
    currentDate,
    isPlaying,
    animationSpeed,
    startDate,
    endDate,
    setCurrentDate,
    play,
    pause,
    reset,
    nextFrame,
    previousFrame
  } = useTimelineStore();

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextFrame();
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, animationSpeed, nextFrame]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgress = () => {
    const total = endDate.getTime() - startDate.getTime();
    const current = currentDate.getTime() - startDate.getTime();
    return (current / total) * 100;
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg shadow-lg border-t border-gray-200 p-3">
      <div className="max-w-4xl mx-auto">
        {/* Current Date Display */}
        <div className="text-center mb-3">
          <div className="text-xl font-bold text-gray-800">
            {formatDate(currentDate)}
          </div>
          <div className="text-sm text-gray-500">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
          </div>
        </div>

        {/* Progress Bar and Date Range */}
        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatDate(startDate)}</span>
            <span>{formatDate(endDate)}</span>
          </div>
          
          <div className="relative">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            
            {/* Date Slider */}
            <input
              type="range"
              min={startDate.getTime()}
              max={endDate.getTime()}
              value={currentDate.getTime()}
              onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value)))}
              className="absolute top-0 w-full h-3 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Simple Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={previousFrame}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Previous Day"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button
            onClick={isPlaying ? pause : play}
            className={`p-3 rounded-full transition-colors ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-rose-500 hover:bg-rose-600 text-white'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button
            onClick={nextFrame}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Next Day"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          
          <button
            onClick={reset}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Reset to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
