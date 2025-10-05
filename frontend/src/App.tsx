import { Flower2 } from 'lucide-react';
import BloomMap from './components/Map/BloomMap';
import LayerNavBar from './components/Navigation/LayerNavBar';
import DynamicSideMenu from './components/Sidebar/DynamicSideMenu';
import Timeline from './components/Sidebar/Timeline';
import LegendPanel from './components/Sidebar/LegendPanel';
import NDVIGraph from './components/Charts/NDVIGraph';
import { Card, CardContent } from './components/ui/card';

function App() {
  const mapboxAccessToken = "pk.eyJ1IjoiZGFuY29vbiIsImEiOiJjbWdjMjMycTYxOXpuMmlxdzZvMmZzbHV0In0.FVR0fZLT2ohgj3t7KUJIJg";
  // const { focusOnPoint, selectedPointId } = useLayerStore();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {/* Header with gradient and shadow */}
      <Card className="bg-muted shadow-lg flex-shrink-0 rounded-sm border-b">
        <CardContent className="flex justify-between items-center p-2">
          <div className="flex items-center gap-3">
            <Flower2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">BloomWatch</h1>
          </div>
          <LayerNavBar />
        </CardContent>
      </Card>


      <div className="flex flex-1 min-h-0">
        {/* Left section - Map with border */}
        <Card className='flex-1 min-h-0 overflow-hidden shadow-2xl relative border border-border rounded-sm'>
          <CardContent className="p-0 h-full">
            <BloomMap mapboxAccessToken={mapboxAccessToken} />

            {/* Timeline at bottom of map */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <Timeline />
            </div>
          </CardContent>
        </Card>

        {/* Right section - Dynamic Side Menu */}
        <Card className='w-[380px] bg-card backdrop-blur-lg shadow-2xl rounded-sm overflow-y-auto flex-shrink-0'>
          <CardContent className="p-1 space-y-4">
            {/* Data Points List */}
            {/* <DataPointsList
              onPointSelect={focusOnPoint}
              selectedPointId={selectedPointId}
            /> */}

            {/* Dynamic Layer Menu */}
            <DynamicSideMenu />

            {/* NDVI Analytics */}
            <NDVIGraph />

            {/* Legend Panel */}
            <LegendPanel />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;