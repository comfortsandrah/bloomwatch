import { useState } from 'react';
import { mockBloomHeatMapData } from '../../utils/mockData';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin, Flower2, TrendingUp } from 'lucide-react';

interface DataPoint {
    properties: {
        region: string;
        intensity: number;
        species: string;
    };
    geometry: {
        coordinates: [number, number];
    };
}

interface RegionData {
    name: string;
    points: DataPoint[];
    avgIntensity: number;
    maxIntensity: number;
}

interface DataPointsListProps {
    onPointSelect?: (point: DataPoint) => void;
    selectedPointId?: string | null;
}

export default function DataPointsList({ onPointSelect, selectedPointId }: DataPointsListProps) {
    const [searchTerm, setSearchTerm] = useState('');

    // Get unique regions from the bloom data
    const regions = mockBloomHeatMapData.features.reduce((acc: RegionData[], feature) => {
        const region = feature.properties.region;
        if (!acc.find((r: RegionData) => r.name === region)) {
            acc.push({
                name: region,
                points: mockBloomHeatMapData.features.filter(f => f.properties.region === region),
                avgIntensity: mockBloomHeatMapData.features
                    .filter(f => f.properties.region === region)
                    .reduce((sum, f) => sum + f.properties.intensity, 0) /
                    mockBloomHeatMapData.features.filter(f => f.properties.region === region).length,
                maxIntensity: Math.max(...mockBloomHeatMapData.features
                    .filter(f => f.properties.region === region)
                    .map(f => f.properties.intensity))
            });
        }
        return acc;
    }, [] as RegionData[]);

  // Filter regions based on search term
  const filteredRegions = regions.filter((region: RegionData) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort regions by average intensity (highest first)
  filteredRegions.sort((a: RegionData, b: RegionData) => b.avgIntensity - a.avgIntensity);

  const handleRegionClick = (region: RegionData) => {
    if (onPointSelect) {
      // Select the point with highest intensity in the region
      const bestPoint = region.points.reduce((max: DataPoint, point: DataPoint) => 
        point.properties.intensity > max.properties.intensity ? point : max
      );
      onPointSelect(bestPoint);
    }
  };

    const getIntensityColor = (intensity: number) => {
        if (intensity > 0.8) return 'bg-red-500';
        if (intensity > 0.6) return 'bg-orange-500';
        if (intensity > 0.4) return 'bg-yellow-500';
        if (intensity > 0.2) return 'bg-green-500';
        return 'bg-gray-500';
    };

    const getIntensityLabel = (intensity: number) => {
        if (intensity > 0.8) return 'Peak Bloom';
        if (intensity > 0.6) return 'Active Growth';
        if (intensity > 0.4) return 'Early Growth';
        if (intensity > 0.2) return 'Dormant';
        return 'Dormant';
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="text-base font-bold text-primary">
                    Bloom Regions
                </h2>
            </div>

            {/* Search input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search regions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <Card className="bg-card backdrop-blur-sm border border-border rounded-sm">
                <CardContent className="p-2">
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {filteredRegions.map((region: RegionData) => {
                            const isSelected = selectedPointId === region.name;
                            const pointCount = region.points.length;
              const topSpecies = region.points
                .reduce((acc: Record<string, number>, point: DataPoint) => {
                  const species = point.properties.species;
                  acc[species] = (acc[species] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                            const dominantSpecies = Object.keys(topSpecies).reduce((a, b) =>
                                topSpecies[a] > topSpecies[b] ? a : b
                            );

                            return (
                                <div
                                    key={region.name}
                                    onClick={() => handleRegionClick(region)}
                                    className={`p-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-muted/50 ${isSelected ? 'bg-primary/10 border border-primary' : 'hover:border-border'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium text-sm text-foreground truncate">
                                                {region.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {pointCount} data points • {dominantSpecies}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs ${getIntensityColor(region.avgIntensity)} text-white`}
                                            >
                                                {getIntensityLabel(region.avgIntensity)}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <TrendingUp className="w-3 h-3" />
                                                <span>{Math.round(region.avgIntensity * 100)}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Intensity bar */}
                                    <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-300 ${getIntensityColor(region.avgIntensity)}`}
                                            style={{ width: `${region.avgIntensity * 100}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredRegions.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <Flower2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No regions found</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
