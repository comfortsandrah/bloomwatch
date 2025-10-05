import { Source, Layer } from 'react-map-gl/mapbox';
import { mockVegetationGeoJSON } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useLayerStore } from '../../state/useLayerStore';
import { useMemo, memo } from 'react';

const VegetationLayer = memo(function VegetationLayer() {
  const { currentDate } = useTimelineStore();
  const { activeLayer } = useLayerStore();

  // Manipulate vegetation data based on timeline
  const filteredData = useMemo(() => {
    const data = mockVegetationGeoJSON;
    
    // Calculate temporal factors
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const month = currentDate.getMonth();
    
    // Vegetation specific patterns based on timeline
    const manipulatedFeatures = data.features.map((feature, index) => {
      const baseNDVI = feature.properties?.ndvi || 0.5;
      
      // Vegetation specific: Plant growth and health patterns
      let vegetationNDVI = baseNDVI;
      
      // Spring vegetation growth (March-May) - New growth and greening
      if (month >= 2 && month <= 4) {
        // Early spring - Bud break and new leaves
        if (month === 2) {
          vegetationNDVI = baseNDVI * (0.4 + 0.6 * Math.sin((dayOfYear - 60) / 20 * Math.PI));
        }
        // Mid spring - Rapid growth phase
        else if (month === 3) {
          vegetationNDVI = baseNDVI * (0.8 + 0.8 * Math.sin((dayOfYear - 90) / 25 * Math.PI));
        }
        // Late spring - Mature growth
        else {
          vegetationNDVI = baseNDVI * (1.0 + 0.4 * Math.sin((dayOfYear - 120) / 30 * Math.PI));
        }
      }
      // Summer vegetation (June-August) - Peak photosynthesis
      else if (month >= 5 && month <= 7) {
        vegetationNDVI = baseNDVI * (1.2 + 0.3 * Math.sin((dayOfYear - 150) / 40 * Math.PI));
      }
      // Fall vegetation (September-November) - Color change and preparation
      else if (month >= 8 && month <= 10) {
        vegetationNDVI = baseNDVI * (0.6 + 0.3 * Math.sin((dayOfYear - 240) / 40 * Math.PI));
      }
      // Winter vegetation (December-February) - Dormant state
      else {
        vegetationNDVI = baseNDVI * (0.2 + 0.1 * Math.sin((dayOfYear - 330) / 40 * Math.PI));
      }
      
      // Vegetation specific: Soil moisture effects
      const soilMoistureFactor = Math.sin((dayOfYear * 2 * Math.PI) / 10) * 0.15; // 10-day soil cycles
      vegetationNDVI += soilMoistureFactor;
      
      // Vegetation specific: Plant type variation
      const plantTypeFactor = (index % 12) / 12; // Different plant types have different NDVI
      const plantTypeNDVI = vegetationNDVI * (0.7 + 0.6 * plantTypeFactor);
      
      // Vegetation specific: Canopy density effects
      const canopyFactor = Math.sin((dayOfYear * 2 * Math.PI) / 21) * 0.1; // 3-week canopy cycles
      const finalNDVI = Math.max(0, Math.min(1, plantTypeNDVI + canopyFactor));
      
      // Vegetation specific: Health classification
      let healthStatus = 'Poor';
      let vegetationType = 'Unknown';
      if (finalNDVI > 0.8) {
        healthStatus = 'Excellent';
        vegetationType = 'Dense Forest';
      } else if (finalNDVI > 0.6) {
        healthStatus = 'Good';
        vegetationType = 'Forest';
      } else if (finalNDVI > 0.4) {
        healthStatus = 'Fair';
        vegetationType = 'Shrubland';
      } else if (finalNDVI > 0.2) {
        healthStatus = 'Poor';
        vegetationType = 'Grassland';
      } else {
        vegetationType = 'Bare Ground';
      }
      
      return {
        ...feature,
        properties: {
          ...feature.properties,
          ndvi: finalNDVI,
          healthStatus,
          vegetationType,
          canopyCover: Math.round(finalNDVI * 100), // Percentage
          biomass: Math.round(finalNDVI * 1000), // kg/m²
          chlorophyll: Math.round(finalNDVI * 50), // mg/m²
          date: currentDate.toISOString().split('T')[0],
          season: month < 3 ? 'Winter' : month < 6 ? 'Spring' : month < 9 ? 'Summer' : 'Fall'
        }
      };
    });

    // Filter out very low NDVI areas (bare ground)
    const activeFeatures = manipulatedFeatures.filter(feature => 
      feature.properties.ndvi > 0.2
    );

    return {
      ...data,
      features: activeFeatures
    };
  }, [currentDate]);

  // Don't render if not the active layer
  if (activeLayer !== 'vegetation') {
    return null;
  }

  return (
    <Source id="vegetation-data" type="geojson" data={filteredData}>
      {/* Vegetation polygons */}
      <Layer
        id="vegetation-fill"
        type="fill"
        paint={{
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'ndvi'], // assumes each feature has { properties: { ndvi: 0.45 } }
            0, '#8B4513', // bare soil
            0.2, '#CD853F',
            0.4, '#DAA520',
            0.6, '#FFFF00',
            0.8, '#90EE90',
            1, '#00FF00' // dense vegetation
          ],
          'fill-opacity': 0.7,
        }}
      />

      {/* Optional polygon borders */}
      <Layer
        id="vegetation-borders"
        type="line"
        paint={{
          'line-color': '#333',
          'line-width': 0.5,
        }}
      />
    </Source>
  );
});

export default VegetationLayer;
