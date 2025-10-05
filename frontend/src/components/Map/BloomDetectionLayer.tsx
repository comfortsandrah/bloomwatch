import { Source, Layer } from 'react-map-gl/mapbox';
import { mockBloomHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';

interface BloomDetectionLayerProps {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

export default function BloomDetectionLayer({ viewState }: BloomDetectionLayerProps) {
  const { currentDate } = useTimelineStore();

  // Simple data filtering
  const filteredData = useMemo(() => {
    const data = mockBloomHeatMapData;

    // For global view, show all data
    if (viewState.zoom < 3) {
      return data;
    }

    // For regional view, limit data
    return {
      ...data,
      features: data.features.slice(0, 2000)
    };
  }, [viewState.zoom, currentDate]);

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