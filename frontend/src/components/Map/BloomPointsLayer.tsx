import { Source, Layer } from 'react-map-gl/mapbox';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useCropStore } from '../../state/useCropStore';
import { useMemo } from 'react';
import { mockBloomHeatMapData } from '../../utils/mockData';

/**
 * Bloom detection points layer - shows individual bloom hotspots
 * Filtered by selected crop and bloom season
 */
export default function BloomPointsLayer() {
  const { currentDate } = useTimelineStore();
  const { selectedCrop } = useCropStore();

  // Filter and manipulate data based on selected date and crop
  const filteredData = useMemo(() => {
    const data = mockBloomHeatMapData;
    
    const month = currentDate.getMonth() + 1; // 1-12
    const dayOfYear = Math.floor(
      (currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    // Check if in bloom season for selected crop
    const isInBloomSeason = selectedCrop ? selectedCrop.bloomWindows.some(window => {
      if (window.start <= window.end) {
        return month >= window.start && month <= window.end;
      } else {
        return month >= window.start || month <= window.end;
      }
    }) : true;

    // Calculate bloom intensity based on crop and season
    const manipulatedFeatures = data.features.map((feature, index) => {
      const baseIntensity = feature.properties?.intensity || 0.5;
      
      let bloomIntensity = baseIntensity;
      
      if (selectedCrop) {
        // Use crop-specific NDVI thresholds
        const threshold = selectedCrop.ndviThreshold;
        const peakNDVI = selectedCrop.peakNDVI;
        
        // Simulate NDVI values based on bloom windows
        if (isInBloomSeason) {
          const bloomWindow = selectedCrop.bloomWindows.find(window => {
            if (window.start <= window.end) {
              return month >= window.start && month <= window.end;
            } else {
              return month >= window.start || month <= window.end;
            }
          });
          
          if (bloomWindow) {
            // Calculate distance from peak month
            const peakMonth = bloomWindow.peakMonth;
            let monthDistance = Math.abs(month - peakMonth);
            
            // Handle year wrap-around
            if (monthDistance > 6) {
              monthDistance = 12 - monthDistance;
            }
            
            // Peak bloom at peak month, declining as we move away
            const seasonalFactor = 1 - (monthDistance / 6);
            
            // Add daily variation within the month
            const dailyVariation = Math.sin((dayOfYear * 2 * Math.PI) / 30) * 0.15;
            
            // Calculate NDVI-based intensity
            const ndviValue = threshold + (peakNDVI - threshold) * seasonalFactor;
            bloomIntensity = (ndviValue / peakNDVI) * (0.85 + dailyVariation);
          }
        } else {
          // Outside bloom season - very low intensity
          bloomIntensity = baseIntensity * 0.2;
        }
      } else {
        // No crop selected - use general seasonal patterns
        if (month >= 3 && month <= 5) {
          // Spring bloom
          bloomIntensity = baseIntensity * (1.2 + 0.3 * Math.sin((dayOfYear - 90) / 20 * Math.PI));
        } else if (month >= 9 && month <= 11) {
          // Fall bloom
          bloomIntensity = baseIntensity * (0.9 + 0.2 * Math.sin((dayOfYear - 240) / 20 * Math.PI));
        } else {
          bloomIntensity = baseIntensity * 0.5;
        }
      }
      
      // Add spatial variation
      const spatialFactor = (index % 10) / 10;
      bloomIntensity = bloomIntensity * (0.7 + 0.6 * spatialFactor);
      
      // Clamp intensity
      const finalIntensity = Math.max(0, Math.min(1, bloomIntensity));
      
      // Determine bloom stage
      let bloomStage = 'Dormant';
      if (finalIntensity > 0.85) bloomStage = 'Peak Bloom';
      else if (finalIntensity > 0.7) bloomStage = 'Full Bloom';
      else if (finalIntensity > 0.5) bloomStage = 'Active Bloom';
      else if (finalIntensity > 0.3) bloomStage = 'Early Bloom';
      else if (finalIntensity > 0.15) bloomStage = 'Pre-Bloom';
      
      return {
        ...feature,
        properties: {
          ...feature.properties,
          intensity: finalIntensity,
          bloomStage,
          cropType: selectedCrop?.name || 'General',
          cropIcon: selectedCrop?.icon || '🌸',
          isInSeason: isInBloomSeason,
          date: currentDate.toISOString().split('T')[0]
        }
      };
    });

    // Filter based on crop selection and intensity
    let activeFeatures = manipulatedFeatures;
    
    // Only show significant bloom activity
    activeFeatures = activeFeatures.filter(feature => 
      feature.properties.intensity > 0.2
    );
    
    // If crop selected and not in season, show fewer points
    if (selectedCrop && !isInBloomSeason) {
      activeFeatures = activeFeatures.filter(feature => 
        feature.properties.intensity > 0.4
      );
    }

    return {
      ...data,
      features: activeFeatures
    };
  }, [currentDate, selectedCrop]);

  return (
    <Source id="bloom-points-data" type="geojson" data={filteredData}>
      {/* Main bloom circles */}
      <Layer
        id="bloom-points-circles"
        type="circle"
        paint={{
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, '#8B4513',      // Brown - dormant
            0.2, '#CD853F',    // Tan - pre-bloom
            0.4, '#FFD700',    // Gold - early bloom
            0.6, '#FFA500',    // Orange - active bloom
            0.8, '#FF69B4',    // Hot pink - full bloom
            1, '#FF1493'       // Deep pink - peak bloom
          ],
          'circle-radius': [
            'interpolate',
            ['exponential', 1.5],
            ['zoom'],
            4, ['*', ['get', 'intensity'], 3],
            7, ['*', ['get', 'intensity'], 8],
            10, ['*', ['get', 'intensity'], 15],
            15, ['*', ['get', 'intensity'], 30]
          ],
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, 0.3,
            1, 0.8
          ],
          'circle-stroke-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            4, 1,
            10, 2,
            15, 3
          ],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.7,
          'circle-blur': 0.3
        }}
      />
      
      {/* Glow effect for high-intensity blooms */}
      <Layer
        id="bloom-points-glow"
        type="circle"
        paint={{
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0.6, '#FFA500',
            0.8, '#FF69B4',
            1, '#FF1493'
          ],
          'circle-radius': [
            'interpolate',
            ['exponential', 1.5],
            ['zoom'],
            4, ['*', ['get', 'intensity'], 5],
            7, ['*', ['get', 'intensity'], 12],
            10, ['*', ['get', 'intensity'], 22],
            15, ['*', ['get', 'intensity'], 45]
          ],
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0.6, 0,
            0.7, 0.1,
            0.8, 0.2,
            1, 0.3
          ],
          'circle-blur': 1
        }}
        filter={['>=', ['get', 'intensity'], 0.6]}
      />
    </Source>
  );
}
