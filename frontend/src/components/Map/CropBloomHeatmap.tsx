import { Source, Layer } from 'react-map-gl/mapbox';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useCropStore } from '../../state/useCropStore';
import { useMemo } from 'react';
import { getGIBSRasterSource, getNearestMODISDate, formatGIBSDate } from '../../utils/nasaGIBS';

/**
 * Crop-specific bloom heatmap using NASA NDVI data
 * Shows bloom intensity based on selected crop's NDVI thresholds
 */
export default function CropBloomHeatmap() {
  const { currentDate } = useTimelineStore();
  const { selectedCrop, nasaLayerType, layerOpacity, useNASAData } = useCropStore();

  // Generate NASA GIBS raster source for the current date
  const rasterSource = useMemo(() => {
    return getGIBSRasterSource(nasaLayerType, currentDate);
  }, [nasaLayerType, currentDate]);

  // Get the actual MODIS date being displayed
  const modisDate = useMemo(() => {
    return getNearestMODISDate(currentDate);
  }, [currentDate]);

  // Check if current date is in bloom season for selected crop
  const isInBloomSeason = useMemo(() => {
    if (!selectedCrop) return false;
    const month = currentDate.getMonth() + 1; // 1-12
    
    return selectedCrop.bloomWindows.some(window => {
      if (window.start <= window.end) {
        return month >= window.start && month <= window.end;
      } else {
        // Wraps around year
        return month >= window.start || month <= window.end;
      }
    });
  }, [selectedCrop, currentDate]);

  // Adjust opacity based on bloom season
  const effectiveOpacity = useMemo(() => {
    if (!selectedCrop) return layerOpacity;
    // Increase opacity during bloom season for better visibility
    return isInBloomSeason ? layerOpacity : layerOpacity * 0.6;
  }, [selectedCrop, isInBloomSeason, layerOpacity]);

  // Get paint properties for the raster layer
  const getRasterPaintProps = useMemo(() => {
    // NASA GIBS already provides colored NDVI tiles
    // We just need to adjust opacity and blending
    const baseProps = {
      'raster-opacity': effectiveOpacity,
      'raster-fade-duration': 300,
      'raster-resampling': 'linear' as const,
    };

    // During bloom season, enhance the colors
    if (selectedCrop && isInBloomSeason) {
      return {
        ...baseProps,
        'raster-brightness-min': 0.2,
        'raster-brightness-max': 1.0,
        'raster-contrast': 0.3,
        'raster-saturation': 0.5, // Increase saturation during bloom
      };
    }

    return baseProps;
  }, [selectedCrop, isInBloomSeason, effectiveOpacity]);

  console.log('=== Crop Bloom Heatmap Debug ===');
  console.log('Current Date:', formatGIBSDate(currentDate));
  console.log('MODIS Date:', formatGIBSDate(modisDate));
  console.log('Selected Crop:', selectedCrop?.name || 'None');
  console.log('In Bloom Season:', isInBloomSeason);
  console.log('Use NASA Data:', useNASAData);
  console.log('NASA Layer Type:', nasaLayerType);
  console.log('Layer Opacity:', effectiveOpacity);
  console.log('Raster Source:', rasterSource);
  console.log('================================');

  if (!useNASAData) {
    console.log('NASA data disabled, not rendering heatmap');
    return null; // Don't render if not using NASA data
  }

  return (
    <>
      <Source
        id="crop-bloom-heatmap-raster"
        type="raster"
        tiles={rasterSource.tiles}
        tileSize={rasterSource.tileSize}
        attribution={rasterSource.attribution}
        minzoom={rasterSource.minzoom}
        maxzoom={rasterSource.maxzoom}
      >
        <Layer
          id="crop-bloom-heatmap-layer"
          type="raster"
          paint={getRasterPaintProps}
        />
      </Source>


    </>
  );
}
