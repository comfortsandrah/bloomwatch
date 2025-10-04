import { useLayerStore,  } from '../../state/useLayerStore';
import BloomLayerMenu from './LayerMenus/BloomLayerMenu';
import VegetationLayerMenu from './LayerMenus/VegetationLayerMenu';
import ClimateLayerMenu from './LayerMenus/ClimateLayerMenu';
import PollenLayerMenu from './LayerMenus/PollenLayerMenu';

export default function DynamicSideMenu() {
  const { activeLayer } = useLayerStore();

  const renderLayerMenu = () => {
    switch (activeLayer) {
      case 'bloom':
        return <BloomLayerMenu />;
      case 'vegetation':
        return <VegetationLayerMenu />;
      case 'climate':
        return <ClimateLayerMenu />;
      case 'pollen':
        return <PollenLayerMenu />;
      default:
        return <BloomLayerMenu />;
    }
  };

  return (
    <div className="space-y-6">
      {renderLayerMenu()}
    </div>
  );
}
