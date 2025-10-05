import { Map } from 'react-map-gl/mapbox';
import { useState, useCallback } from 'react';
import { useLayerStore } from '../../state/useLayerStore';
import { useCropStore } from '../../state/useCropStore';
import VegetationLayer from './VegetationLayer';
import ClimateLayer from './ClimateLayer';
import PollenLayer from './PollenLayer';
import NASANDVILayer from './NASANDVILayer';
import NASAEVILayer from './NASAEVILayer';
import NASAVIIRSLayer from './NASAVIIRSLayer';
import BloomPointsLayer from './BloomPointsLayer';
import BloomDetectionLayer from './BloomDetectionLayer';
import { KENYA_CENTER } from '../../types/crops';
// import { getPerformanceSettings } from '../../utils/mapScaling';

interface BloomMapProps {
  mapboxAccessToken: string;
}

export default function BloomMap({ mapboxAccessToken }: BloomMapProps) {
  const { activeLayer } = useLayerStore();
  const { nasaLayerType, useNASAData } = useCropStore();

  // Set default view to Kenya
  const [viewState, setViewState] = useState({
    longitude: KENYA_CENTER.longitude,
    latitude: KENYA_CENTER.latitude,
    zoom: KENYA_CENTER.zoom
  });

  // Handle map view state changes for proper scaling
  const handleViewStateChange = useCallback((evt: { viewState: { longitude: number; latitude: number; zoom: number } }) => {
    setViewState(evt.viewState);
  }, []);

  // Get performance-optimized settings based on current zoom level (currently unused)
  // const performanceSettings = getPerformanceSettings(viewState.zoom, 10000);


  // Use consistent map style for all layers
  const mapStyle = "mapbox://styles/mapbox/satellite-streets-v12";

  const renderActiveLayer = () => {
    // For bloom layer, show bloom points
    if (activeLayer === 'bloom') {
      return (
        <>
          <BloomPointsLayer />
        </>
      );
    }

    // For vegetation layer, check if we should use NASA data
    if (activeLayer === 'vegetation' && useNASAData) {
      switch (nasaLayerType) {
        case 'NDVI':
          return <NASANDVILayer />;
        case 'EVI':
          return <NASAEVILayer />;
        case 'VIIRS_NDVI':
          return <NASAVIIRSLayer />;
        default:
          return <NASANDVILayer />;
      }
    }

    // Default layer rendering
    switch (activeLayer) {
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
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
    </div>
  );
}
