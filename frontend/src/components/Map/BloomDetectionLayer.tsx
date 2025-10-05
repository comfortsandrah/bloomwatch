import { Source, Layer } from 'react-map-gl/mapbox';
import { mockBloomHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useLayerStore } from '../../state/useLayerStore';
import { useMemo, memo } from 'react';
import { dataCache } from '../../utils/dataCache';

const BloomDetectionLayer = memo(function BloomDetectionLayer() {
  const { currentDate } = useTimelineStore();
  const { activeLayer } = useLayerStore();

  // Filter and manipulate data based on selected date with caching
  const filteredData = useMemo((): typeof mockBloomHeatMapData => {
    const cacheKey = dataCache.generateKey('bloom', currentDate);
    
    // Check cache first
    const cachedData = dataCache.get(cacheKey);
    if (cachedData) {
      return cachedData as typeof mockBloomHeatMapData;
    }

    const data = mockBloomHeatMapData;
    
    // Calculate temporal factors
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const month = currentDate.getMonth();
    
    // Bloom Detection specific patterns based on timeline
    const manipulatedFeatures = data.features.map((feature, index) => {
      const baseIntensity = feature.properties?.intensity || 0.5;
      
      // Bloom Detection specific: Flower blooming patterns
      let bloomIntensity = baseIntensity;
      
      // Spring bloom detection (March-May) - Peak flower blooming
      if (month >= 2 && month <= 4) {
        // Early spring (March) - First blooms
        if (month === 2) {
          bloomIntensity = baseIntensity * (0.6 + 0.4 * Math.sin((dayOfYear - 60) / 15 * Math.PI));
        }
        // Mid spring (April) - Peak blooming
        else if (month === 3) {
          bloomIntensity = baseIntensity * (1.4 + 0.6 * Math.sin((dayOfYear - 90) / 20 * Math.PI));
        }
        // Late spring (May) - Continued blooming
        else {
          bloomIntensity = baseIntensity * (1.2 + 0.4 * Math.sin((dayOfYear - 120) / 25 * Math.PI));
        }
      }
      // Summer bloom detection (June-August) - Extended blooming
      else if (month >= 5 && month <= 7) {
        bloomIntensity = baseIntensity * (0.9 + 0.3 * Math.sin((dayOfYear - 150) / 30 * Math.PI));
      }
      // Fall bloom detection (September-November) - Late season blooms
      else if (month >= 8 && month <= 10) {
        bloomIntensity = baseIntensity * (0.5 + 0.2 * Math.sin((dayOfYear - 240) / 30 * Math.PI));
      }
      // Winter (December-February) - Dormant period
      else {
        bloomIntensity = baseIntensity * (0.1 + 0.05 * Math.sin((dayOfYear - 330) / 30 * Math.PI));
      }
      
      // Bloom Detection specific: Weather-dependent blooming
      const weatherFactor = Math.sin((dayOfYear * 2 * Math.PI) / 14) * 0.2; // 2-week weather cycles
      bloomIntensity += weatherFactor;
      
      // Bloom Detection specific: Flower species variation
      const speciesFactor = (index % 15) / 15; // Different flower species bloom at different times
      const speciesIntensity = bloomIntensity * (0.6 + 0.8 * speciesFactor);
      
      // Bloom Detection specific: Pollination activity
      const pollinationFactor = Math.sin((dayOfYear * 2 * Math.PI) / 7) * 0.15; // Weekly pollination cycles
      const finalIntensity = Math.max(0, Math.min(1, speciesIntensity + pollinationFactor));
      
      // Bloom Detection specific: Bloom stage classification
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
          flowerSpecies: ['Rose', 'Tulip', 'Daisy', 'Lily', 'Orchid'][index % 5],
          bloomDuration: Math.round(finalIntensity * 14), // Days of bloom
          pollinationActivity: finalIntensity > 0.5 ? 'High' : finalIntensity > 0.2 ? 'Moderate' : 'Low',
          date: currentDate.toISOString().split('T')[0],
          season: month < 3 ? 'Winter' : month < 6 ? 'Spring' : month < 9 ? 'Summer' : 'Fall'
        }
      };
    });

    // Filter out features with very low intensity (dormant)
    const activeFeatures = manipulatedFeatures.filter(feature => 
      feature.properties.intensity > 0.1
    );

    const result: typeof data = {
      ...data,
      features: activeFeatures
    };

    // Cache the result
    dataCache.set(cacheKey, result);
    
    return result;
  }, [currentDate]);

  // Don't render if not the active layer
  if (activeLayer !== 'bloom') {
    return null;
  }

  return (
    <Source id="bloom-data" type="geojson" data={filteredData}>
      {/* Heatmap layer for bloom intensity */}
      <Layer
        id="bloom-heatmap"
        type="heatmap"
        paint={{
          // Increase weight as intensity increases
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, 0,
            1, 1
          ],
          // Increase intensity as zoom level increases
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            9, 3
          ],
          // Color ramp for heatmap - NDVI style
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(139, 69, 19, 0)',        // Transparent brown
            0.1, 'rgba(139, 69, 19, 0.4)',    // Brown (bare soil)
            0.2, 'rgba(205, 133, 63, 0.6)',   // Tan (sparse vegetation)
            0.3, 'rgba(218, 165, 32, 0.7)',   // Goldenrod (low-moderate)
            0.4, 'rgba(154, 205, 50, 0.8)',   // Yellow-green (moderate)
            0.5, 'rgba(124, 252, 0, 0.85)',   // Lawn green (dense)
            0.6, 'rgba(50, 205, 50, 0.9)',    // Lime green (very dense)
            0.7, 'rgba(34, 139, 34, 0.92)',   // Forest green (peak)
            0.8, 'rgba(255, 215, 0, 0.95)',   // Gold (bloom)
            0.9, 'rgba(255, 105, 180, 0.97)', // Hot pink (full bloom)
            1, 'rgba(255, 20, 147, 1)'        // Deep pink (peak bloom)
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 5,
            5, 20,
            9, 40,
            15, 80
          ],
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 0.9,
            7, 0.8,
            9, 0.5
          ]
        }}
      />
      
      {/* Circle layer for detailed view at high zoom */}
      <Layer
        id="bloom-circles"
        type="circle"
        paint={{
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, '#8B4513',      // Brown (bare soil)
            0.2, '#CD853F',    // Tan (sparse)
            0.3, '#DAA520',    // Goldenrod (low-moderate)
            0.4, '#9ACD32',    // Yellow-green (moderate)
            0.5, '#7CFC00',    // Lawn green (dense)
            0.6, '#32CD32',    // Lime green (very dense)
            0.7, '#228B22',    // Forest green (peak)
            0.8, '#FFD700',    // Gold (bloom)
            0.9, '#FF69B4',    // Hot pink (full bloom)
            1, '#FF1493'       // Deep pink (peak bloom)
          ],
          'circle-radius': [
            'interpolate',
            ['exponential', 1.5],
            ['zoom'],
            3, ['*', ['get', 'intensity'], 2],
            6, ['*', ['get', 'intensity'], 6],
            9, ['*', ['get', 'intensity'], 12],
            15, ['*', ['get', 'intensity'], 25]
          ],
          'circle-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 0,
            7, 0.3,
            9, 0.7,
            15, 0.85
          ],
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.5,
          'circle-blur': 0.2
        }}
      />
    </Source>
  );
});

export default BloomDetectionLayer;