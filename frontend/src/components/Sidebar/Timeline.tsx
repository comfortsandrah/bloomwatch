import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { useEffect } from 'react';
import { useTimelineStore } from '../../state/useTimelineStore';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { DatePicker } from '../ui/date-picker';
import { Slider } from '../ui/slider';

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

  // const formatDate = (date: Date) => {
  //   return date.toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric',
  //     year: 'numeric'
  //   });
  // };

  const getProgress = () => {
    const total = endDate.getTime() - startDate.getTime();
    const current = currentDate.getTime() - startDate.getTime();
    return (current / total) * 100;
  };

  return (
    <Card className="bg-muted backdrop-blur-lg shadow-lg border-t border-border rounded-sm">
      <CardContent className="p-2">
        <div className="space-y-2">
          {/* Date Picker and Slider Row */}
          <div className="flex items-center gap-2">
            {/* Date Picker */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <DatePicker
                value={currentDate}
                onChange={setCurrentDate}
                min={startDate}
                max={endDate}
                placeholder="Select date"
                className="w-40"
              />
            </div>

            {/* Progress Bar and Date Range */}
            <div className="flex-1">
              <div className="relative">
                {/* Progress Bar */}
                <div className="w-full bg-muted-foreground rounded-full h-2">
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
                  className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  step={86400000} // 1 day in milliseconds
                />
              </div>
            </div>
          </div>

          {/* Simple Controls */}
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={previousFrame}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              title="Previous Day"
            >
              <SkipBack className="w-3 h-3" />
            </Button>

            <Button
              onClick={isPlaying ? pause : play}
              variant={isPlaying ? "destructive" : "default"}
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </Button>

            <Button
              onClick={nextFrame}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              title="Next Day"
            >
              <SkipForward className="w-3 h-3" />
            </Button>

            <Button
              onClick={reset}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              title="Reset to Start"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
