import { Map } from 'react-map-gl/mapbox';
import { useLayerStore } from '../../state/useLayerStore';
import VegetationLayer from './VegetationLayer';
import ClimateLayer from './ClimateLayer';
import PollenLayer from './PollenLayer';
import BloomDetectionLayer from './BloomDetectionLayer';

interface BloomMapProps {
  mapboxAccessToken: string;
}

export default function BloomMap({ mapboxAccessToken }: BloomMapProps) {
  const { activeLayer } = useLayerStore();

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
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
    >
      {renderActiveLayer()}
    </Map>
  );
}
