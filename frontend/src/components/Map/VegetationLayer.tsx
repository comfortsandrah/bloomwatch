import { Source, Layer } from 'react-map-gl/mapbox';
import { mockVegetationGeoJSON } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';

interface VegetationLayerProps {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  settings: any;
}

export default function VegetationLayer({ viewState, settings }: VegetationLayerProps) {
  const { currentDate } = useTimelineStore();

  // Filter or limit data for performance
  const filteredData = useMemo(() => {
    const data = mockVegetationGeoJSON;

    // Example: limit number of features when zoomed out
    if (viewState.zoom < 3) {
      return {
        ...data,
        features: data.features.slice(0, 500),
      };
    }

    return data;
  }, [viewState.zoom, currentDate]);

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
}
