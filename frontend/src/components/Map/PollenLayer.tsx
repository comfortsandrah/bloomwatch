
import { Source, Layer } from 'react-map-gl/mapbox';
import { mockPollenHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';

export default function PollenLayer() {
  const { currentDate } = useTimelineStore();
  
  // In a real app, this would filter data based on currentDate
  // For now, we'll use the mock data as-is
  // currentDate is available for future data filtering implementation

  return (
    <Source id="pollen-heatmap" type="geojson" data={mockPollenHeatMapData}>
      <Layer
        id="pollen-heatmap-layer"
        type="heatmap"
        paint={{
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, 0,
            1, 1
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            15, 4
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(255, 255, 0, 0)',
            0.2, 'rgba(255, 255, 0, 0.3)',
            0.4, 'rgba(255, 255, 0, 0.5)',
            0.6, 'rgba(255, 165, 0, 0.6)',
            0.8, 'rgba(255, 69, 0, 0.7)',
            1, 'rgba(255, 0, 0, 0.8)'
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            15, 40
          ],
          'heatmap-opacity': 1
        }}
      />
    </Source>
  );
}
