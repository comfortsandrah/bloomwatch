import { Source, Layer } from 'react-map-gl/mapbox';
import { mockPollenHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';

interface PollenLayerProps {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  settings: any;
}

export default function PollenLayer({ viewState, settings }: PollenLayerProps) {
  const { currentDate } = useTimelineStore();

  const filteredData = useMemo(() => {
    const data = mockPollenHeatMapData;

    if (viewState.zoom < 3) {
      return data;
    }

    return {
      ...data,
      features: data.features.slice(0, 2000)
    };
  }, [viewState.zoom, currentDate]);

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