import { Source, Layer } from 'react-map-gl/mapbox';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';
import { getGIBSRasterSource, getNearestMODISDate, formatGIBSDate } from '../../utils/nasaGIBS';

export default function NASAEVILayer() {
  const { currentDate } = useTimelineStore();

  // Generate NASA GIBS raster source for EVI
  const rasterSource = useMemo(() => {
    return getGIBSRasterSource('EVI', currentDate);
  }, [currentDate]);

  // Get the actual MODIS date being displayed
  const modisDate = useMemo(() => {
    return getNearestMODISDate(currentDate);
  }, [currentDate]);

  console.log('NASA EVI Layer - Current Date:', formatGIBSDate(currentDate));
  console.log('NASA EVI Layer - MODIS Date:', formatGIBSDate(modisDate));

  return (
    <>
      <Source
        id="nasa-evi-raster"
        type="raster"
        tiles={rasterSource.tiles}
        tileSize={rasterSource.tileSize}
        attribution={rasterSource.attribution}
        minzoom={rasterSource.minzoom}
        maxzoom={rasterSource.maxzoom}
      >
        <Layer
          id="nasa-evi-layer"
          type="raster"
          paint={{
            'raster-opacity': 0.8,
            'raster-fade-duration': 300
          }}
        />
      </Source>
    </>
  );
}
