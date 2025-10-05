import { Source, Layer } from 'react-map-gl/mapbox';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useMemo } from 'react';
import { getGIBSRasterSource, getNearestMODISDate, formatGIBSDate } from '../../utils/nasaGIBS';

export default function NASANDVILayer() {
  const { currentDate } = useTimelineStore();

  // Generate NASA GIBS raster source for the current date
  const rasterSource = useMemo(() => {
    return getGIBSRasterSource('NDVI', currentDate);
  }, [currentDate]);

  // Get the actual MODIS date being displayed
  const modisDate = useMemo(() => {
    return getNearestMODISDate(currentDate);
  }, [currentDate]);

  console.log('NASA NDVI Layer - Current Date:', formatGIBSDate(currentDate));
  console.log('NASA NDVI Layer - MODIS Date:', formatGIBSDate(modisDate));

  return (
    <>
      <Source
        id="nasa-ndvi-raster"
        type="raster"
        tiles={rasterSource.tiles}
        tileSize={rasterSource.tileSize}
        attribution={rasterSource.attribution}
        minzoom={rasterSource.minzoom}
        maxzoom={rasterSource.maxzoom}
      >
        <Layer
          id="nasa-ndvi-layer"
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
