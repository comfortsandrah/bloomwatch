import { create } from 'zustand';

export type LayerType = 'bloom' | 'vegetation' | 'climate' | 'pollen';

export interface LayerState {
  // Active layer (only one at a time)
  activeLayer: LayerType;
  
  // Layer selection action
  setActiveLayer: (layer: LayerType) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  // Default active layer
  activeLayer: 'bloom',
  
  // Layer selection action
  setActiveLayer: (layer: LayerType) => set({ activeLayer: layer }),
}));
