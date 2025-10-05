import { Source, Layer } from 'react-map-gl/mapbox';
import { mockClimateHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';

interface ClimateLayerProps {
  viewState: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

export default function ClimateLayer({ viewState }: ClimateLayerProps) {
  const { currentDate } = useTimelineStore();

  const filteredData = useMemo(() => {
    const data = mockClimateHeatMapData;

    if (viewState.zoom < 3) {
      return data;
    }

    return {
      ...data,
      features: data.features.slice(0, 2000)
    };
  }, [viewState.zoom, currentDate]);

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