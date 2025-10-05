// NASA POWER API Integration
// Prediction of Worldwide Energy Resources
// Documentation: https://power.larc.nasa.gov/docs/services/api/

export interface POWERParameters {
  temperature?: boolean;      // T2M: Temperature at 2 Meters
  precipitation?: boolean;     // PRECTOTCORR: Precipitation Corrected
  humidity?: boolean;          // RH2M: Relative Humidity at 2 Meters
  solarRadiation?: boolean;    // ALLSKY_SFC_SW_DWN: All Sky Surface Shortwave Downward Irradiance
  windSpeed?: boolean;         // WS2M: Wind Speed at 2 Meters
}

export interface POWERDataPoint {
  date: string;
  temperature?: number;
  precipitation?: number;
  humidity?: number;
  solarRadiation?: number;
  windSpeed?: number;
}

export interface POWERResponse {
  parameters: Record<string, Record<string, number>>;
  geometry: {
    coordinates: [number, number];
  };
  header: {
    title: string;
    api_version: string;
  };
}

/**
 * NASA POWER API Base URL
 */
const POWER_BASE_URL = 'https://power.larc.nasa.gov/api/temporal';

/**
 * Build NASA POWER API URL for temporal data
 */
const buildPOWERUrl = (
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string,
  parameters: string[],
  temporal: 'daily' | 'monthly' | 'climatology' = 'daily'
): string => {
  const params = parameters.join(',');
  const community = 'ag'; // Agricultural community
  const format = 'JSON';
  
  return `${POWER_BASE_URL}/${temporal}/point` +
    `?parameters=${params}` +
    `&community=${community}` +
    `&longitude=${longitude}` +
    `&latitude=${latitude}` +
    `&start=${startDate}` +
    `&end=${endDate}` +
    `&format=${format}`;
};

/**
 * Format date for NASA POWER API (YYYYMMDD format)
 */
export const formatPOWERDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

/**
 * Fetch climate data from NASA POWER API
 */
export const fetchPOWERData = async (
  latitude: number,
  longitude: number,
  startDate: Date,
  endDate: Date,
  params: POWERParameters = { temperature: true, precipitation: true }
): Promise<POWERDataPoint[]> => {
  // Build parameter list
  const parameterList: string[] = [];
  if (params.temperature) parameterList.push('T2M');
  if (params.precipitation) parameterList.push('PRECTOTCORR');
  if (params.humidity) parameterList.push('RH2M');
  if (params.solarRadiation) parameterList.push('ALLSKY_SFC_SW_DWN');
  if (params.windSpeed) parameterList.push('WS2M');
  
  if (parameterList.length === 0) {
    throw new Error('At least one parameter must be specified');
  }
  
  const url = buildPOWERUrl(
    latitude,
    longitude,
    formatPOWERDate(startDate),
    formatPOWERDate(endDate),
    parameterList,
    'daily'
  );
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NASA POWER API error: ${response.status} ${response.statusText}`);
    }
    
    const data: POWERResponse = await response.json();
    
    // Transform the data into a more usable format
    const dataPoints: POWERDataPoint[] = [];
    const parameterKeys = Object.keys(data.parameters);
    
    if (parameterKeys.length === 0) {
      return [];
    }
    
    // Get all dates from the first parameter
    const firstParam = data.parameters[parameterKeys[0]];
    const dates = Object.keys(firstParam);
    
    dates.forEach(dateStr => {
      const point: POWERDataPoint = { date: dateStr };
      
      if (params.temperature && data.parameters.T2M) {
        point.temperature = data.parameters.T2M[dateStr];
      }
      if (params.precipitation && data.parameters.PRECTOTCORR) {
        point.precipitation = data.parameters.PRECTOTCORR[dateStr];
      }
      if (params.humidity && data.parameters.RH2M) {
        point.humidity = data.parameters.RH2M[dateStr];
      }
      if (params.solarRadiation && data.parameters.ALLSKY_SFC_SW_DWN) {
        point.solarRadiation = data.parameters.ALLSKY_SFC_SW_DWN[dateStr];
      }
      if (params.windSpeed && data.parameters.WS2M) {
        point.windSpeed = data.parameters.WS2M[dateStr];
      }
      
      dataPoints.push(point);
    });
    
    return dataPoints;
  } catch (error) {
    console.error('Error fetching NASA POWER data:', error);
    throw error;
  }
};

/**
 * Calculate Growing Degree Days (GDD) for crop growth modeling
 * GDD = (Tmax + Tmin)/2 - Tbase
 * Common Tbase values: 10°C for most crops
 */
export const calculateGDD = (
  tMax: number,
  tMin: number,
  tBase: number = 10
): number => {
  const tAvg = (tMax + tMin) / 2;
  return Math.max(0, tAvg - tBase);
};

/**
 * Predict bloom timing based on temperature and precipitation
 * Simple model: bloom occurs when accumulated GDD reaches threshold
 * and sufficient precipitation has occurred
 */
export interface BloomPrediction {
  predictedBloomDate: Date | null;
  confidence: 'low' | 'medium' | 'high';
  accumulatedGDD: number;
  totalPrecipitation: number;
  daysToBloom: number | null;
  factors: {
    temperature: 'favorable' | 'marginal' | 'unfavorable';
    precipitation: 'favorable' | 'marginal' | 'unfavorable';
    solarRadiation?: 'favorable' | 'marginal' | 'unfavorable';
  };
}

export const predictBloom = (
  climateData: POWERDataPoint[],
  gddThreshold: number = 300, // Typical for many crops
  minPrecipitation: number = 50 // mm
): BloomPrediction => {
  let accumulatedGDD = 0;
  let totalPrecipitation = 0;
  let predictedBloomDate: Date | null = null;
  let daysToBloom: number | null = null;
  
  // Calculate cumulative GDD and precipitation
  for (let i = 0; i < climateData.length; i++) {
    const point = climateData[i];
    
    if (point.temperature !== undefined) {
      // Approximate daily GDD (assuming daily variation of ±5°C)
      const gdd = calculateGDD(point.temperature + 5, point.temperature - 5);
      accumulatedGDD += gdd;
    }
    
    if (point.precipitation !== undefined) {
      totalPrecipitation += point.precipitation;
    }
    
    // Check if bloom conditions are met
    if (accumulatedGDD >= gddThreshold && totalPrecipitation >= minPrecipitation) {
      if (!predictedBloomDate) {
        predictedBloomDate = parsePOWERDate(point.date);
        daysToBloom = i;
      }
    }
  }
  
  // Calculate confidence based on data completeness and conditions
  let confidence: 'low' | 'medium' | 'high' = 'low';
  if (climateData.length >= 30 && predictedBloomDate) {
    confidence = totalPrecipitation >= minPrecipitation * 1.5 ? 'high' : 'medium';
  }
  
  // Assess individual factors
  const avgTemp = climateData.reduce((sum, p) => sum + (p.temperature || 0), 0) / climateData.length;
  const tempFactor: 'favorable' | 'marginal' | 'unfavorable' = 
    avgTemp >= 15 && avgTemp <= 30 ? 'favorable' :
    avgTemp >= 10 && avgTemp <= 35 ? 'marginal' : 'unfavorable';
  
  const precipFactor: 'favorable' | 'marginal' | 'unfavorable' =
    totalPrecipitation >= minPrecipitation * 1.5 ? 'favorable' :
    totalPrecipitation >= minPrecipitation ? 'marginal' : 'unfavorable';
  
  const avgSolar = climateData.reduce((sum, p) => sum + (p.solarRadiation || 0), 0) / climateData.length;
  const solarFactor: 'favorable' | 'marginal' | 'unfavorable' =
    avgSolar >= 4 ? 'favorable' :
    avgSolar >= 3 ? 'marginal' : 'unfavorable';
  
  return {
    predictedBloomDate,
    confidence,
    accumulatedGDD,
    totalPrecipitation,
    daysToBloom,
    factors: {
      temperature: tempFactor,
      precipitation: precipFactor,
      solarRadiation: solarFactor
    }
  };
};

/**
 * Parse NASA POWER date string (YYYYMMDD) to Date object
 */
const parsePOWERDate = (dateStr: string): Date => {
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  return new Date(year, month, day);
};

/**
 * Get climate suitability score (0-1) for a crop based on current conditions
 */
export const getClimateSuitability = (
  temperature: number,
  precipitation: number,
  cropOptimalTemp: { min: number; max: number },
  cropMinPrecip: number
): number => {
  // Temperature suitability (0-1)
  const tempSuitability = 
    temperature >= cropOptimalTemp.min && temperature <= cropOptimalTemp.max ? 1.0 :
    temperature >= cropOptimalTemp.min - 5 && temperature <= cropOptimalTemp.max + 5 ? 0.5 : 0.0;
  
  // Precipitation suitability (0-1)
  const precipSuitability = Math.min(1.0, precipitation / (cropMinPrecip * 1.5));
  
  // Combined suitability (weighted average)
  return (tempSuitability * 0.6) + (precipSuitability * 0.4);
};
