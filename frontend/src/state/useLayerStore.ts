import { create } from 'zustand';

export type LayerType = 'bloom' | 'vegetation' | 'climate' | 'pollen';

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
}

export interface LayerState {
  // Active layer (only one at a time)
  activeLayer: LayerType;

  // Selected data point
  selectedPoint: any | null;
  selectedPointId: string | null;

  // Selected region name
  selectedRegion: string | null;

  // Map view state
  mapView: MapViewState;

  // Layer selection action
  setActiveLayer: (layer: LayerType) => void;

  // Data point selection actions
  setSelectedPoint: (point: any | null) => void;
  setSelectedPointId: (id: string | null) => void;
  setSelectedRegion: (region: string | null) => void;

  // Map view actions
  setMapView: (view: MapViewState) => void;
  focusOnPoint: (point: any) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  // Default active layer
  activeLayer: 'bloom',

  // Default selected point
  selectedPoint: null,
  selectedPointId: null,
  selectedRegion: null,

  // Default map view (world view)
  mapView: {
    longitude: 0,
    latitude: 0,
    zoom: 1
  },

  // Layer selection action
  setActiveLayer: (layer: LayerType) => set({ activeLayer: layer }),

  // Data point selection actions
  setSelectedPoint: (point: any | null) => set({ selectedPoint: point }),
  setSelectedPointId: (id: string | null) => set({ selectedPointId: id }),
  setSelectedRegion: (region: string | null) => set({ selectedRegion: region }),

  // Map view actions
  setMapView: (view: MapViewState) => set({ mapView: view }),
  focusOnPoint: (point: any) => {
    if (point && point.geometry && point.geometry.coordinates) {
      const [longitude, latitude] = point.geometry.coordinates;
      set({
        selectedPoint: point,
        selectedPointId: point.properties.region,
        selectedRegion: point.properties.region,
        mapView: {
          longitude,
          latitude,
          zoom: 10 // Zoom in when focusing on a point
        }
      });
    }
  },
}));
