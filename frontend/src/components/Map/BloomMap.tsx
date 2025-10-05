import { Map } from 'react-map-gl/mapbox';
import { useCallback } from 'react';
import { useLayerStore } from '../../state/useLayerStore';
import VegetationLayer from './VegetationLayer';
import ClimateLayer from './ClimateLayer';
import PollenLayer from './PollenLayer';
import BloomDetectionLayer from './BloomDetectionLayer';
// import { getPerformanceSettings } from '../../utils/mapScaling';

interface BloomMapProps {
  mapboxAccessToken: string;
}

export default function BloomMap({ mapboxAccessToken }: BloomMapProps) {
  const { activeLayer, mapView, setMapView } = useLayerStore();

  // Handle map view state changes for proper scaling
  const handleViewStateChange = useCallback((evt: { viewState: { longitude: number; latitude: number; zoom: number } }) => {
    setMapView(evt.viewState);
  }, [setMapView]);

  // Get performance-optimized settings based on current zoom level (currently unused)
  // const performanceSettings = getPerformanceSettings(viewState.zoom, 10000);


  // Use consistent map style for all layers
  const mapStyle = "mapbox://styles/mapbox/satellite-streets-v12";

  const renderActiveLayer = () => {
    switch (activeLayer) {
      case 'bloom':
        return <BloomDetectionLayer />;
      case 'vegetation':
        return <VegetationLayer />;
      case 'climate':
        return <ClimateLayer />;
      case 'pollen':
        return <PollenLayer />;
      default:
        return <BloomDetectionLayer />;
    }
  };

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
      {renderActiveLayer()}
    </Map>
  );
}
