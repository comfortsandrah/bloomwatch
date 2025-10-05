import { create } from 'zustand';
import type { CropType } from '../types/crops';
import type { GIBSLayerType } from '../utils/nasaGIBS';

export interface CropState {
  // Selected crop for bloom monitoring
  selectedCrop: CropType | null;
  
  // NASA satellite layer type
  nasaLayerType: GIBSLayerType;
  
  // Whether to show NASA satellite data or mock data
  useNASAData: boolean;
  
  // Opacity for NASA layers
  layerOpacity: number;
  
  // Actions
  setSelectedCrop: (crop: CropType | null) => void;
  setNASALayerType: (layerType: GIBSLayerType) => void;
  setUseNASAData: (use: boolean) => void;
  setLayerOpacity: (opacity: number) => void;
  
  // Helper to check if current date is in selected crop's bloom window
  isInBloomSeason: (month: number) => boolean;
}

export const useCropStore = create<CropState>((set, get) => ({
  // Default state
  selectedCrop: null,
  nasaLayerType: 'NDVI',
  useNASAData: true,
  layerOpacity: 0.8,
  
  // Actions
  setSelectedCrop: (crop: CropType | null) => set({ selectedCrop: crop }),
  
  setNASALayerType: (layerType: GIBSLayerType) => set({ nasaLayerType: layerType }),
  
  setUseNASAData: (use: boolean) => set({ useNASAData: use }),
  
  setLayerOpacity: (opacity: number) => set({ layerOpacity: Math.max(0, Math.min(1, opacity)) }),
  
  // Check if current month is in bloom window
  isInBloomSeason: (month: number) => {
    const { selectedCrop } = get();
    if (!selectedCrop) return false;
    
    return selectedCrop.bloomWindows.some(window => {
      if (window.start <= window.end) {
        // Normal case: e.g., March (3) to May (5)
        return month >= window.start && month <= window.end;
      } else {
        // Wraps around year: e.g., Nov (11) to Jan (1)
        return month >= window.start || month <= window.end;
      }
    });
  }
}));
