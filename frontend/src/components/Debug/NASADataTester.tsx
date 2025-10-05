import { useState, useEffect } from 'react';
import { useTimelineStore } from '../../state/useTimelineStore';
import { useCropStore } from '../../state/useCropStore';
import { getGIBSRasterSource, getNearestMODISDate, formatGIBSDate, GIBS_LAYERS } from '../../utils/nasaGIBS';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

/**
 * NASA GIBS Data Tester Component
 * Shows what data is being requested and tests if tiles load
 */
export default function NASADataTester() {
  const { currentDate } = useTimelineStore();
  const { nasaLayerType } = useCropStore();
  const [testResults, setTestResults] = useState<any>(null);
  const [testing, setTesting] = useState(false);

  const testNASAData = async () => {
    setTesting(true);
    const results: any = {
      timestamp: new Date().toISOString(),
      requestedDate: formatGIBSDate(currentDate),
      nearestMODISDate: formatGIBSDate(getNearestMODISDate(currentDate)),
      layerType: nasaLayerType,
      layerInfo: GIBS_LAYERS[nasaLayerType],
      tileTests: []
    };

    const rasterSource = getGIBSRasterSource(nasaLayerType, currentDate);
    results.rasterSource = rasterSource;

    // Test a few sample tile URLs
    const sampleTiles = [
      { z: 3, x: 4, y: 5, name: 'Global view' },
      { z: 5, x: 18, y: 13, name: 'Africa/Europe' },
      { z: 6, x: 37, y: 26, name: 'Kenya region' }
    ];

    for (const tile of sampleTiles) {
      const tileUrl = rasterSource.tiles[0]
        .replace('{z}', tile.z.toString())
        .replace('{x}', tile.x.toString())
        .replace('{y}', tile.y.toString());

      try {
        const response = await fetch(tileUrl, { method: 'HEAD' });
        results.tileTests.push({
          tile: tile.name,
          url: tileUrl,
          status: response.status,
          statusText: response.statusText,
          success: response.ok,
          headers: {
            contentType: response.headers.get('content-type'),
            contentLength: response.headers.get('content-length'),
          }
        });
      } catch (error: any) {
        results.tileTests.push({
          tile: tile.name,
          url: tileUrl,
          error: error.message,
          success: false
        });
      }
    }

    setTestResults(results);
    setTesting(false);
  };

  useEffect(() => {
    // Auto-test on mount
    testNASAData();
  }, [currentDate, nasaLayerType]);

  return (
    <Card className="absolute top-4 right-4 z-20 bg-card/95 backdrop-blur-sm border border-border shadow-xl max-w-lg max-h-[600px] overflow-auto">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-card-foreground">
            🛰️ NASA GIBS Data Test
          </h3>
          <Button 
            size="sm" 
            onClick={testNASAData}
            disabled={testing}
          >
            {testing ? '🔄 Testing...' : '🔍 Test Again'}
          </Button>
        </div>

        {testResults && (
          <div className="space-y-3 text-xs">
            {/* Request Info */}
            <div className="p-3 bg-muted rounded-sm space-y-2">
              <h4 className="font-semibold text-sm text-card-foreground">Request Info</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Requested Date:</span>
                  <span className="font-mono text-card-foreground">{testResults.requestedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nearest MODIS Date:</span>
                  <span className="font-mono text-primary font-semibold">{testResults.nearestMODISDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Layer:</span>
                  <span className="font-semibold text-card-foreground">{testResults.layerType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution:</span>
                  <span className="text-card-foreground">{testResults.layerInfo.resolution}</span>
                </div>
              </div>
            </div>

            {/* Base URL */}
            <div className="p-3 bg-muted rounded-sm space-y-2">
              <h4 className="font-semibold text-sm text-card-foreground">Base URL</h4>
              <div className="break-all font-mono text-[10px] text-muted-foreground">
                {testResults.layerInfo.baseUrl}/{testResults.layerInfo.layerId}/default/{testResults.nearestMODISDate}/GoogleMapsCompatible_Level9
              </div>
            </div>

            {/* Tile Tests */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-card-foreground">Tile Load Tests</h4>
              {testResults.tileTests.map((test: any, idx: number) => (
                <div 
                  key={idx}
                  className={`p-2 rounded-sm border ${
                    test.success 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-card-foreground">{test.tile}</span>
                    <Badge variant={test.success ? 'default' : 'destructive'}>
                      {test.success ? '✓ Success' : '✗ Failed'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {test.status && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`font-mono ${test.success ? 'text-green-600' : 'text-red-600'}`}>
                          {test.status} {test.statusText}
                        </span>
                      </div>
                    )}
                    {test.error && (
                      <div className="text-red-600 font-mono text-[10px]">
                        Error: {test.error}
                      </div>
                    )}
                    {test.headers?.contentType && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-mono">{test.headers.contentType}</span>
                      </div>
                    )}
                    <div className="text-[9px] text-muted-foreground break-all mt-1">
                      {test.url}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-3 bg-muted rounded-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-card-foreground">NASA Data Status:</span>
                <Badge variant={testResults.tileTests.some((t: any) => t.success) ? 'default' : 'destructive'}>
                  {testResults.tileTests.some((t: any) => t.success) 
                    ? '✓ Working' 
                    : '✗ Not Available'
                  }
                </Badge>
              </div>
              {!testResults.tileTests.some((t: any) => t.success) && (
                <div className="mt-2 text-xs text-muted-foreground">
                  💡 NASA GIBS may not have data for the selected date. Try a date from at least 2 weeks ago.
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
