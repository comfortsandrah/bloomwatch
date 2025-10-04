import { Flower2 } from 'lucide-react';
import BloomMap from './components/Map/BloomMap';
import LayerNavBar from './components/Navigation/LayerNavBar';
import DynamicSideMenu from './components/Sidebar/DynamicSideMenu';
import Timeline from './components/Sidebar/Timeline';
import LegendPanel from './components/Sidebar/LegendPanel';
import NDVIGraph from './components/Charts/NDVIGraph';

function App() {
  const mapboxAccessToken = "pk.eyJ1IjoiZGFuY29vbiIsImEiOiJjbWdjMjMycTYxOXpuMmlxdzZvMmZzbHV0In0.FVR0fZLT2ohgj3t7KUJIJg";

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Header with gradient and shadow */}
      <header className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 shadow-lg flex-shrink-0">
        <div className="flex items-center gap-3 p-4">
          <Flower2 className="w-8 h-8 text-white" />
          <h1 className="text-3xl font-bold text-white tracking-tight">BloomWatch</h1>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/90">Live Data</span>
          </div>
        </div>
      </header>

      {/* Layer Navigation Bar */}
      <LayerNavBar />

      <div className="flex flex-1 min-h-0">
        {/* Left section - Map with border */}
        <div className='flex-1 min-h-0 m-4 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 relative'>
          <BloomMap mapboxAccessToken={mapboxAccessToken} />
          
          {/* Timeline at bottom of map */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <Timeline />
          </div>
        </div>
          
        {/* Right section - Dynamic Side Menu */}
        <div className='w-[380px] bg-white/80 backdrop-blur-lg shadow-2xl m-4 mr-4 rounded-2xl overflow-y-auto flex-shrink-0 border border-gray-100'>
          <div className="p-6">
            {/* Dynamic Layer Menu */}
            <DynamicSideMenu />

            {/* NDVI Analytics */}
            <div className="mt-6">
              <NDVIGraph />
            </div>

            {/* Legend Panel */}
            <div className="mt-6">
              <LegendPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;