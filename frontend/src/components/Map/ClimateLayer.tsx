
import { Source, Layer } from 'react-map-gl/mapbox';
import { mockClimateHeatMapData } from '../../utils/mockData';
import { useTimelineStore } from '../../state/useTimelineStore';

export default function ClimateLayer() {
  const { currentDate } = useTimelineStore();
  
  // In a real app, this would filter data based on currentDate
  // For now, we'll use the mock data as-is
  // currentDate is available for future data filtering implementation

  return (
    <Source id="climate-heatmap" type="geojson" data={mockClimateHeatMapData}>
      <Layer
        id="climate-heatmap-layer"
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
            0, 'rgba(0, 0, 128, 0)',
            0.2, 'rgba(65, 105, 225, 0.6)',
            0.4, 'rgba(0, 191, 255, 0.7)',
            0.6, 'rgba(50, 205, 50, 0.8)',
            0.8, 'rgba(255, 215, 0, 0.9)',
            1, 'rgba(255, 69, 0, 1)'
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
