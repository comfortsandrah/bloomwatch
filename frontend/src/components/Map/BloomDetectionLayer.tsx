import { Source, Layer } from 'react-map-gl/mapbox';
import { mockBloomHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';

export default function BloomDetectionLayer() {
  const { currentDate } = useTimelineStore();
  
  // In a real app, this would filter data based on currentDate
  // For now, we'll use the mock data as-is
  // currentDate is available for future data filtering implementation

  return (
    <Source id="bloom-heatmap" type="geojson" data={mockBloomHeatMapData}>
      <Layer
        id="bloom-heatmap-layer"
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
            0, 'rgba(139, 69, 19, 0)',
            0.1, 'rgba(255, 215, 0, 0.5)',
            0.2, 'rgba(50, 205, 50, 0.6)',
            0.3, 'rgba(0, 255, 127, 0.7)',
            0.4, 'rgba(0, 100, 0, 0.8)',
            0.5, 'rgba(30, 144, 255, 0.6)',
            0.6, 'rgba(255, 255, 0, 0.7)',
            0.7, 'rgba(255, 69, 0, 0.8)',
            0.8, 'rgba(34, 139, 34, 0.9)',
            0.9, 'rgba(124, 252, 0, 0.8)',
            1, 'rgba(173, 255, 47, 0.9)'
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
