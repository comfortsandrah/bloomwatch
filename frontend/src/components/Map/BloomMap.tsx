import { Map } from 'react-map-gl/mapbox';
import { useState, useCallback } from 'react';
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
  const { activeLayer } = useLayerStore();
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 1
  });

  // Handle map view state changes for proper scaling
  const handleViewStateChange = useCallback((evt: any) => {
    setViewState(evt.viewState);
  }, []);

  // Get performance-optimized settings based on current zoom level (currently unused)
  // const performanceSettings = getPerformanceSettings(viewState.zoom, 10000);


  // Use consistent map style for all layers
  const mapStyle = "mapbox://styles/mapbox/satellite-streets-v12";

  const renderActiveLayer = () => {
    switch (activeLayer) {
      case 'bloom':
        return <BloomDetectionLayer viewState={viewState} />;
      case 'vegetation':
        return <VegetationLayer viewState={viewState} />;
      case 'climate':
        return <ClimateLayer viewState={viewState} />;
      case 'pollen':
        return <PollenLayer viewState={viewState} />;
      default:
        return <BloomDetectionLayer viewState={viewState} />;
    }
  };

  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      {...viewState}
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
