import { useCropStore } from '../../state/useCropStore';
import { useTimelineStore } from '../../state/useTimelineStore';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Flower2, Calendar } from 'lucide-react';

/**
 * Displays whether the current date is within the selected crop's bloom season
 * Shows bloom window information and seasonal status
 */
export default function BloomSeasonIndicator() {
  const { selectedCrop } = useCropStore();
  const { currentDate } = useTimelineStore();

  if (!selectedCrop) {
    return null;
  }

  const currentMonth = currentDate.getMonth() + 1; // 1-12
  
  // Check if in bloom season
  const isInBloomSeason = selectedCrop.bloomWindows.some(window => {
    if (window.start <= window.end) {
      return currentMonth >= window.start && currentMonth <= window.end;
    } else {
      // Wraps around year
      return currentMonth >= window.start || currentMonth <= window.end;
    }
  });

  // Find current or next bloom window
  const currentWindow = selectedCrop.bloomWindows.find(window => {
    if (window.start <= window.end) {
      return currentMonth >= window.start && currentMonth <= window.end;
    } else {
      return currentMonth >= window.start || currentMonth <= window.end;
    }
  });

  // Get month names
  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  };

  // Calculate days until peak (approximate)
  const getDaysUntilPeak = () => {
    if (!currentWindow) return null;
    
    const peakMonth = currentWindow.peakMonth;
    const currentDay = currentDate.getDate();
    
    if (currentMonth === peakMonth) {
      // In peak month
      const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
      const midMonth = Math.floor(daysInMonth / 2);
      return Math.abs(currentDay - midMonth);
    } else if (currentMonth < peakMonth) {
      // Before peak
      const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
      const daysRemaining = daysInCurrentMonth - currentDay;
      const monthsUntilPeak = peakMonth - currentMonth - 1;
      return daysRemaining + (monthsUntilPeak * 30) + 15; // Approximate
    }
    return null;
  };

  const daysUntilPeak = getDaysUntilPeak();

  return (
    <Card className="bg-card border border-border rounded-sm">
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Flower2 className="w-4 h-4 text-primary" />
          <h4 className="font-semibold text-card-foreground">
            {selectedCrop.icon} {selectedCrop.name} Season
          </h4>
        </div>

        {/* Bloom Status Badge */}
        <div className="flex items-center gap-2">
          <Badge 
            variant={isInBloomSeason ? "default" : "secondary"}
            className={isInBloomSeason ? "bg-pink-500 hover:bg-pink-600" : ""}
          >
            {isInBloomSeason ? '🌸 In Bloom Season' : '💤 Dormant'}
          </Badge>
        </div>

        {/* Current Window Info */}
        {currentWindow && isInBloomSeason && (
          <div className="p-2 bg-muted/50 rounded-sm space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                {getMonthName(currentWindow.start)} - {getMonthName(currentWindow.end)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Peak: {getMonthName(currentWindow.peakMonth)}
              {daysUntilPeak !== null && daysUntilPeak > 0 && (
                <span className="ml-1">
                  ({daysUntilPeak} days to peak)
                </span>
              )}
              {currentMonth === currentWindow.peakMonth && (
                <span className="ml-1 text-pink-500 font-semibold">
                  (Peak Month! 🌸)
                </span>
              )}
            </div>
          </div>
        )}

        {/* All Bloom Windows */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-card-foreground">Bloom Windows:</p>
          {selectedCrop.bloomWindows.map((window, index) => (
            <div 
              key={index}
              className={`text-xs p-1.5 rounded-sm ${
                currentWindow === window 
                  ? 'bg-pink-500/20 border border-pink-500/30' 
                  : 'bg-muted/30'
              }`}
            >
              <span className="text-muted-foreground">
                {getMonthName(window.start)} - {getMonthName(window.end)}
              </span>
              <span className="text-muted-foreground ml-1">
                (Peak: {getMonthName(window.peakMonth)})
              </span>
            </div>
          ))}
        </div>

        {/* NDVI Info */}
        <div className="pt-2 border-t border-border space-y-1">
          <p className="text-xs font-medium text-card-foreground">Bloom Detection:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-1.5 bg-muted/30 rounded-sm">
              <span className="text-muted-foreground">Threshold:</span>
              <span className="ml-1 font-mono text-card-foreground">
                {selectedCrop.ndviThreshold.toFixed(2)}
              </span>
            </div>
            <div className="p-1.5 bg-muted/30 rounded-sm">
              <span className="text-muted-foreground">Peak NDVI:</span>
              <span className="ml-1 font-mono text-card-foreground">
                {selectedCrop.peakNDVI.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Growing Regions */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs font-medium text-card-foreground mb-1">
            Common Regions:
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedCrop.commonRegions.map((region, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs"
              >
                📍 {region}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
