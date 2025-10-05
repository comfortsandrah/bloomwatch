import { useTimelineStore } from '../../state/useTimelineStore';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Card, CardContent } from '../ui/card';

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
    <Card className="bg-muted backdrop-blur-lg shadow-lg border-t border-border rounded-sm">
      <CardContent className="p-0">
        <div className="max-w-4xl mx-auto">
          {/* Current Date Display */}
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">
              {formatDate(currentDate)}
            </div>
            <div className="text-sm text-foreground-muted">
              {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
            </div>
          </div>

          {/* Progress Bar and Date Range */}
          <div className="space-y-0">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatDate(startDate)}</span>
              <span>{formatDate(endDate)}</span>
            </div>

            <div className="relative">
              {/* Progress Bar */}
              <div className="w-full bg-muted-foreground rounded-full h-2 mb-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>

              {/* Date Slider */}
              <Slider
                min={startDate.getTime()}
                max={endDate.getTime()}
                value={[currentDate.getTime()]}
                onValueChange={(value) => setCurrentDate(new Date(value[0]))}
                className="absolute top-0 w-full h-3 opacity-0 cursor-pointer"
                step={86400000} // 1 day in milliseconds
              />
            </div>
          </div>

          {/* Simple Controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={previousFrame}
              variant="outline"
              size="icon"
              title="Previous Day"
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              onClick={isPlaying ? pause : play}
              variant={isPlaying ? "destructive" : "default"}
              size="icon"
              className="rounded-full"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button
              onClick={nextFrame}
              variant="outline"
              size="icon"
              title="Next Day"
            >
              <SkipForward className="w-4 h-4" />
            </Button>

            <Button
              onClick={reset}
              variant="outline"
              size="icon"
              title="Reset to Start"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
