import { Source, Layer } from 'react-map-gl/mapbox';
import { mockClimateHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';

export default function ClimateLayer() {
  const { currentDate } = useTimelineStore();

  // Manipulate climate data based on timeline
  const filteredData = useMemo(() => {
    const data = mockClimateHeatMapData;
    
    // Calculate temporal factors
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const month = currentDate.getMonth();
    const hour = currentDate.getHours();
    
    // Climate specific patterns based on timeline
    const manipulatedFeatures = data.features.map((feature, index) => {
      const baseIntensity = feature.properties?.intensity || 0.5;
      
      // Climate specific: Weather and atmospheric patterns
      let climateIntensity = baseIntensity;
      
      // Summer climate (June-August) - Hot and dry conditions
      if (month >= 5 && month <= 7) {
        climateIntensity = baseIntensity * (1.4 + 0.5 * Math.sin((dayOfYear - 150) / 45 * Math.PI));
      }
      // Spring climate (March-May) - Warming and variable weather
      else if (month >= 2 && month <= 4) {
        climateIntensity = baseIntensity * (0.8 + 0.4 * Math.sin((dayOfYear - 60) / 30 * Math.PI));
      }
      // Fall climate (September-November) - Cooling and stormy
      else if (month >= 8 && month <= 10) {
        climateIntensity = baseIntensity * (0.6 + 0.3 * Math.sin((dayOfYear - 240) / 40 * Math.PI));
      }
      // Winter climate (December-February) - Cold and stable
      else {
        climateIntensity = baseIntensity * (0.3 + 0.2 * Math.sin((dayOfYear - 330) / 50 * Math.PI));
      }
      
      // Climate specific: Diurnal temperature variation
      const diurnalCycle = Math.sin((hour / 24) * 2 * Math.PI) * 0.4; // Day/night temperature difference
      climateIntensity += diurnalCycle;
      
      // Climate specific: Atmospheric pressure systems
      const pressureSystem = Math.sin((dayOfYear * 2 * Math.PI) / 14) * 0.25; // 2-week pressure cycles
      climateIntensity += pressureSystem;
      
      // Climate specific: Regional microclimates
      const microclimateFactor = (index % 8) / 8; // Different microclimates
      const microclimateIntensity = climateIntensity * (0.7 + 0.6 * microclimateFactor);
      
      // Climate specific: Weather fronts and storms
      const stormFactor = Math.sin((dayOfYear * 2 * Math.PI) / 21) * 0.2; // 3-week storm cycles
      const finalIntensity = Math.max(0, Math.min(1, microclimateIntensity + stormFactor));
      
      // Climate specific: Temperature and weather calculations
      const temperature = Math.round(10 + finalIntensity * 30); // 10-40°C range
      const humidity = Math.round(30 + (1 - finalIntensity) * 50); // 30-80% humidity
      const pressure = Math.round(980 + finalIntensity * 40); // 980-1020 hPa
      
      // Climate specific: Weather condition classification
      let weatherCondition = 'Unknown';
      let climateZone = 'Unknown';
      if (finalIntensity > 0.8) {
        weatherCondition = 'Hot and Dry';
        climateZone = 'Arid';
      } else if (finalIntensity > 0.6) {
        weatherCondition = 'Warm and Sunny';
        climateZone = 'Temperate';
      } else if (finalIntensity > 0.4) {
        weatherCondition = 'Mild and Variable';
        climateZone = 'Mediterranean';
      } else if (finalIntensity > 0.2) {
        weatherCondition = 'Cool and Cloudy';
        climateZone = 'Continental';
      } else {
        weatherCondition = 'Cold and Wet';
        climateZone = 'Polar';
      }
      
      return {
        ...feature,
        properties: {
          ...feature.properties,
          intensity: finalIntensity,
          temperature,
          humidity,
          pressure,
          weatherCondition,
          climateZone,
          windSpeed: Math.round(finalIntensity * 20), // 0-20 m/s
          precipitation: Math.round((1 - finalIntensity) * 50), // 0-50 mm
          uvIndex: Math.round(finalIntensity * 11), // 0-11 UV index
          date: currentDate.toISOString().split('T')[0],
          season: month < 3 ? 'Winter' : month < 6 ? 'Spring' : month < 9 ? 'Summer' : 'Fall'
        }
      };
    });

    return {
      ...data,
      features: manipulatedFeatures
    };
  }, [currentDate]);

  return (
    <Source id="climate-data" type="geojson" data={filteredData}>
      <Layer
        id="climate-circles"
        type="circle"
        paint={{
          'circle-color': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, '#0000FF',
            0.2, '#0080FF',
            0.4, '#00FFFF',
            0.6, '#FFFF00',
            0.8, '#FF8000',
            1, '#FF0000'
          ],
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            3, 3,
            6, 6,
            10, 12,
            15, 20
          ],
          'circle-opacity': 0.7,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#ffffff',
          'circle-stroke-opacity': 0.5
        }}
      />
    </Source>
  );
}