import { create } from 'zustand';

export interface TimelineState {
  // Current selected date
  currentDate: Date;
  
  // Animation state
  isPlaying: boolean;
  animationSpeed: number; // milliseconds between frames
  
  // Date range
  startDate: Date;
  endDate: Date;
  
  // Timeline actions
  setCurrentDate: (date: Date) => void;
  setPlaying: (playing: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setDateRange: (start: Date, end: Date) => void;
  
  // Animation controls
  play: () => void;
  pause: () => void;
  reset: () => void;
  nextFrame: () => void;
  previousFrame: () => void;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  // Default timeline state
  currentDate: new Date('2025-01-01'),
  isPlaying: false,
  animationSpeed: 1000, // 1 second per frame
  
  // Default date range (full year)
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'),
  
  // Timeline actions
  setCurrentDate: (date: Date) => set({ currentDate: date }),
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setAnimationSpeed: (speed: number) => set({ animationSpeed: Math.max(100, Math.min(5000, speed)) }),
  setDateRange: (start: Date, end: Date) => set({ startDate: start, endDate: end }),
  
  // Animation controls
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  reset: () => set({ 
    currentDate: get().startDate, 
    isPlaying: false 
  }),
  
  nextFrame: () => {
    const { currentDate, endDate } = get();
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    if (nextDate <= endDate) {
      set({ currentDate: nextDate });
    } else {
      set({ currentDate: get().startDate, isPlaying: false });
    }
  },
  
  previousFrame: () => {
    const { currentDate, startDate } = get();
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    
    if (prevDate >= startDate) {
      set({ currentDate: prevDate });
    }
  },
}));
