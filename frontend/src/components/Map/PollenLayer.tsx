import { Source, Layer } from 'react-map-gl/mapbox';
import { mockPollenHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';

export default function PollenLayer() {
  const { currentDate } = useTimelineStore();

  // Manipulate pollen data based on timeline
  const filteredData = useMemo(() => {
    const data = mockPollenHeatMapData;
    
    // Calculate temporal factors
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const month = currentDate.getMonth();
    
    // Pollen specific patterns based on timeline
    const manipulatedFeatures = data.features.map((feature, index) => {
      const baseIntensity = feature.properties?.intensity || 0.5;
      
      // Pollen specific: Allergen and spore dispersal patterns
      let pollenIntensity = baseIntensity;
      
      // Spring pollen season (March-May) - Tree pollen peak
      if (month >= 2 && month <= 4) {
        // Early spring - Tree pollen release
        if (month === 2) {
          pollenIntensity = baseIntensity * (0.8 + 0.6 * Math.sin((dayOfYear - 60) / 20 * Math.PI));
        }
        // Mid spring - Peak tree pollen
        else if (month === 3) {
          pollenIntensity = baseIntensity * (1.6 + 0.8 * Math.sin((dayOfYear - 90) / 25 * Math.PI));
        }
        // Late spring - Tree pollen decline, grass pollen start
        else {
          pollenIntensity = baseIntensity * (1.2 + 0.4 * Math.sin((dayOfYear - 120) / 30 * Math.PI));
        }
      }
      // Summer pollen season (June-August) - Grass and weed pollen
      else if (month >= 5 && month <= 7) {
        pollenIntensity = baseIntensity * (1.1 + 0.5 * Math.sin((dayOfYear - 150) / 35 * Math.PI));
      }
      // Fall pollen season (September-November) - Weed pollen and mold spores
      else if (month >= 8 && month <= 10) {
        pollenIntensity = baseIntensity * (0.7 + 0.3 * Math.sin((dayOfYear - 240) / 40 * Math.PI));
      }
      // Winter (December-February) - Minimal pollen, indoor allergens
      else {
        pollenIntensity = baseIntensity * (0.05 + 0.05 * Math.sin((dayOfYear - 330) / 50 * Math.PI));
      }
      
      // Pollen specific: Wind dispersal patterns
      const windFactor = Math.sin((dayOfYear * 2 * Math.PI) / 5) * 0.3; // 5-day wind cycles
      pollenIntensity += windFactor;
      
      // Pollen specific: Pollen type variation
      const pollenTypeFactor = (index % 10) / 10; // Different pollen types
      const pollenTypeIntensity = pollenIntensity * (0.5 + 1.0 * pollenTypeFactor);
      
      // Pollen specific: Humidity effects on dispersal
      const humidityFactor = Math.sin((dayOfYear * 2 * Math.PI) / 12) * 0.2; // 12-day humidity cycles
      const finalIntensity = Math.max(0, Math.min(1, pollenTypeIntensity + humidityFactor));
      
      // Pollen specific: Concentration and allergen calculations
      const concentration = Math.round(finalIntensity * 2000); // 0-2000 pollen count
      const allergenIndex = Math.round(finalIntensity * 10); // 0-10 allergen index
      
      // Pollen specific: Pollen type classification
      const pollenTypes = ['Tree', 'Grass', 'Weed', 'Mold', 'Dust'];
      const pollenType = pollenTypes[index % 5];
      
      // Pollen specific: Allergy risk assessment
      let allergyRisk = 'None';
      let pollenLevel = 'Very Low';
      if (finalIntensity > 0.8) {
        allergyRisk = 'Very High';
        pollenLevel = 'Very High';
      } else if (finalIntensity > 0.6) {
        allergyRisk = 'High';
        pollenLevel = 'High';
      } else if (finalIntensity > 0.4) {
        allergyRisk = 'Moderate';
        pollenLevel = 'Moderate';
      } else if (finalIntensity > 0.2) {
        allergyRisk = 'Low';
        pollenLevel = 'Low';
      }
      
      return {
        ...feature,
        properties: {
          ...feature.properties,
          intensity: finalIntensity,
          concentration,
          allergenIndex,
          pollenType,
          allergyRisk,
          pollenLevel,
          dispersalRate: Math.round(finalIntensity * 100), // 0-100 m/s
          particleSize: Math.round(10 + finalIntensity * 40), // 10-50 μm
          viability: Math.round(finalIntensity * 100), // 0-100% viability
          date: currentDate.toISOString().split('T')[0],
          season: month < 3 ? 'Winter' : month < 6 ? 'Spring' : month < 9 ? 'Summer' : 'Fall'
        }
      };
    });

    // Filter out very low pollen areas
    const activeFeatures = manipulatedFeatures.filter(feature => 
      feature.properties.intensity > 0.05
    );

    return {
      ...data,
      features: activeFeatures
    };
  }, [currentDate]);

  return (
    <Source id="pollen-data" type="geojson" data={filteredData}>
      <Layer
        id="pollen-circles"
        type="circle"
        paint={{
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, '#00FF00',
            0.2, '#80FF00',
            0.4, '#FFFF00',
            0.6, '#FF8000',
            0.8, '#FF4000',
            1, '#FF0000'
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            3, 3,
            6, 6,
            10, 10,
            15, 18
          ],
          'circle-opacity': 0.75,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.7
        }}
      />
    </Source>
  );
}