import { Map } from 'react-map-gl/mapbox';
import { useCallback, memo, useMemo } from 'react';
import { useLayerStore } from '../../state/useLayerStore';
import VegetationLayer from './VegetationLayer';
import ClimateLayer from './ClimateLayer';
import PollenLayer from './PollenLayer';
import BloomDetectionLayer from './BloomDetectionLayer';

interface BloomMapProps {
  mapboxAccessToken: string;
}

const BloomMap = memo(function BloomMap({ mapboxAccessToken }: BloomMapProps) {
  const { mapView, setMapView } = useLayerStore();

  // Handle map view state changes for proper scaling
  const handleViewStateChange = useCallback((evt: { viewState: { longitude: number; latitude: number; zoom: number } }) => {
    setMapView(evt.viewState);
  }, [setMapView]);

  // Use consistent map style for all layers
  const mapStyle = "mapbox://styles/mapbox/satellite-streets-v12";

  // Render all layers but control visibility for faster switching
  const allLayers = useMemo(() => ({
    bloom: <BloomDetectionLayer />,
    vegetation: <VegetationLayer />,
    climate: <ClimateLayer />,
    pollen: <PollenLayer />
  }), []);

  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      {...mapView}
      onMove={handleViewStateChange}
      style={{ width: '100%', height: '100%' }}
      mapStyle={mapStyle}
      antialias={true}
      minZoom={0}
      maxZoom={20}
      projection="globe"
    >
      {/* Render all layers for instant switching */}
      {allLayers.bloom}
      {allLayers.vegetation}
      {allLayers.climate}
      {allLayers.pollen}
    </Map>
  );
});

export default BloomMap;