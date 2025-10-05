import { Source, Layer } from 'react-map-gl/mapbox';
import { mockBloomHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';

export default function BloomDetectionLayer() {
  const { currentDate } = useTimelineStore();

  // Filter and manipulate data based on selected date
  const filteredData = useMemo(() => {
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

    return {
      ...data,
      features: activeFeatures
    };
  }, [currentDate]);

  return (
    <Source id="bloom-data" type="geojson" data={filteredData}>
      <Layer
        id="bloom-circles"
        type="circle"
        paint={{
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, '#FF0000',
            0.2, '#FF8000',
            0.4, '#FFFF00',
            0.6, '#80FF00',
            0.8, '#00FF80',
            1, '#00FF00'
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            3, 4,
            6, 8,
            10, 15,
            15, 25
          ],
          'circle-opacity': 0.8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.6
        }}
      />
    </Source>
  );
}