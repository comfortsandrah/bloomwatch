# BloomWatch Backend Data Format Specification

This document outlines the expected data formats that your backend should send to the BloomWatch frontend application.

## Overview

The frontend expects data in GeoJSON format for map visualization and additional time series data for analytics. All data should be sent as JSON responses from REST API endpoints.

## API Endpoints Structure

### 1. Bloom Detection Data
**Endpoint:** `GET /api/bloom-data`
**Description:** Returns bloom detection data points for map visualization

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "intensity": 0.85,
        "stage": "Peak Bloom",
        "color": "#FF1493",
        "ndvi": 0.82,
        "bloomDensity": 850,
        "species": "Cherry Blossom",
        "region": "San Francisco",
        "latitude": 37.77,
        "longitude": -122.42,
        "radius": 12,
        "opacity": 0.9,
        "date": "2025-01-15T00:00:00Z"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      }
    }
  ]
}
```

### 2. Vegetation Data
**Endpoint:** `GET /api/vegetation-data`
**Description:** Returns vegetation health and NDVI data

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "ndvi": 0.75,
        "intensity": 0.75,
        "vegetationType": "Temperate Forest",
        "healthIndex": 75,
        "biomass": 750,
        "region": "Central Europe",
        "latitude": 50.0,
        "longitude": 10.0,
        "radius": 8,
        "opacity": 0.8,
        "date": "2025-01-15T00:00:00Z"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [10.0, 50.0]
      }
    }
  ]
}
```

### 3. Climate Data
**Endpoint:** `GET /api/climate-data`
**Description:** Returns temperature and climate data

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "temperature": 22.5,
        "intensity": 0.625,
        "climateZone": "Urban Heat Island",
        "humidity": 65.2,
        "windSpeed": 12.3,
        "pressure": 1015.4,
        "date": "2025-01-15T00:00:00Z"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      }
    }
  ]
}
```

### 4. Pollen Data
**Endpoint:** `GET /api/pollen-data`
**Description:** Returns pollen concentration data

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "concentration": 1200,
        "intensity": 0.4,
        "type": "Oak",
        "sourceType": "Urban Gardens",
        "allergenLevel": "High",
        "dispersalRate": 15.2,
        "date": "2025-01-15T00:00:00Z"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7849]
      }
    }
  ]
}
```

### 5. Time Series Data
**Endpoint:** `GET /api/time-series`
**Description:** Returns monthly time series data for NDVI trends

```json
{
  "2025-01-01": {
    "avgNDVI": 0.3,
    "bloomStatus": "Dormant"
  },
  "2025-02-01": {
    "avgNDVI": 0.4,
    "bloomStatus": "Early Growth"
  },
  "2025-03-01": {
    "avgNDVI": 0.6,
    "bloomStatus": "Blooming"
  },
  "2025-04-01": {
    "avgNDVI": 0.8,
    "bloomStatus": "Peak Bloom"
  },
  "2025-05-01": {
    "avgNDVI": 0.9,
    "bloomStatus": "Peak Bloom"
  },
  "2025-06-01": {
    "avgNDVI": 0.7,
    "bloomStatus": "Decline"
  },
  "2025-07-01": {
    "avgNDVI": 0.5,
    "bloomStatus": "Senescence"
  },
  "2025-08-01": {
    "avgNDVI": 0.4,
    "bloomStatus": "Dormant"
  },
  "2025-09-01": {
    "avgNDVI": 0.3,
    "bloomStatus": "Dormant"
  },
  "2025-10-01": {
    "avgNDVI": 0.2,
    "bloomStatus": "Dormant"
  },
  "2025-11-01": {
    "avgNDVI": 0.2,
    "bloomStatus": "Dormant"
  },
  "2025-12-01": {
    "avgNDVI": 0.3,
    "bloomStatus": "Dormant"
  }
}
```

## Data Field Specifications

### Common Properties for All GeoJSON Features

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `type` | string | Always "Feature" | "Feature" |
| `properties` | object | Feature-specific data | See below |
| `geometry` | object | GeoJSON geometry | See below |

### Geometry Object

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `type` | string | Geometry type | "Point" |
| `coordinates` | array | [longitude, latitude] | [-122.4194, 37.7749] |

### Bloom Detection Properties

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| `intensity` | number | 0.0 - 1.0 | Bloom intensity (0 = no bloom, 1 = peak bloom) |
| `stage` | string | - | Bloom stage: "Dormant", "Early Growth", "Active Growth", "Peak Bloom" |
| `color` | string | - | Hex color code for visualization |
| `ndvi` | number | 0.0 - 1.0 | Normalized Difference Vegetation Index |
| `bloomDensity` | number | 0 - 1000 | Bloom density score |
| `species` | string | - | Plant species name |
| `region` | string | - | Geographic region name |
| `latitude` | number | -90 to 90 | Latitude coordinate |
| `longitude` | number | -180 to 180 | Longitude coordinate |
| `radius` | number | 1 - 20 | Point radius for visualization |
| `opacity` | number | 0.0 - 1.0 | Point opacity for visualization |
| `date` | string | ISO 8601 | Timestamp of the data |

### Vegetation Properties

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| `ndvi` | number | 0.0 - 1.0 | Normalized Difference Vegetation Index |
| `intensity` | number | 0.0 - 1.0 | Vegetation intensity |
| `vegetationType` | string | - | Type: "Tropical Rainforest", "Temperate Forest", "Boreal Forest", "Grassland", "Desert/Bare" |
| `healthIndex` | number | 0 - 100 | Vegetation health percentage |
| `biomass` | number | 0 - 1000 | Biomass density score |
| `region` | string | - | Geographic region name |
| `latitude` | number | -90 to 90 | Latitude coordinate |
| `longitude` | number | -180 to 180 | Longitude coordinate |
| `radius` | number | 1 - 15 | Point radius for visualization |
| `opacity` | number | 0.0 - 1.0 | Point opacity for visualization |
| `date` | string | ISO 8601 | Timestamp of the data |

### Climate Properties

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| `temperature` | number | -50 to 50 | Temperature in Celsius |
| `intensity` | number | 0.0 - 1.0 | Climate intensity (normalized) |
| `climateZone` | string | - | Zone: "Urban Heat Island", "Suburban", "Rural", "Forest", "Coastal" |
| `humidity` | number | 0 - 100 | Relative humidity percentage |
| `windSpeed` | number | 0 - 50 | Wind speed in km/h |
| `pressure` | number | 900 - 1100 | Atmospheric pressure in hPa |
| `date` | string | ISO 8601 | Timestamp of the data |

### Pollen Properties

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| `concentration` | number | 0 - 3000 | Pollen concentration per cubic meter |
| `intensity` | number | 0.0 - 1.0 | Pollen intensity (normalized) |
| `type` | string | - | Pollen type: "Oak", "Pine", "Grass", "Birch", "Ragweed", etc. |
| `sourceType` | string | - | Source: "Urban Gardens", "Mixed Vegetation", "Forest", "Urban", "Water/Bare" |
| `allergenLevel` | string | - | Level: "Very Low", "Low", "Medium", "High", "Very High" |
| `dispersalRate` | number | 0 - 30 | Pollen dispersal rate in km/h |
| `date` | string | ISO 8601 | Timestamp of the data |

## Time Series Data Format

The time series data should be an object where:
- **Keys**: Date strings in "YYYY-MM-DD" format
- **Values**: Objects containing:
  - `avgNDVI`: Average NDVI value (0.0 - 1.0)
  - `bloomStatus`: Bloom status string

## API Response Headers

All API responses should include:
```
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Error Response Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-01-15T12:00:00Z"
}
```

## Data Update Frequency

- **Real-time data**: Update every 15-30 minutes
- **Historical data**: Update daily
- **Time series data**: Update monthly

## Coordinate System

- **Longitude**: -180 to 180 (WGS84)
- **Latitude**: -90 to 90 (WGS84)
- **Format**: [longitude, latitude] in GeoJSON coordinates

## Notes

1. All numeric values should be rounded to appropriate decimal places for performance
2. Dates should be in ISO 8601 format with UTC timezone
3. The frontend expects data to be sorted by intensity/NDVI for proper visualization
4. Region names should be consistent across all data types
5. Color codes should be valid hex colors for proper map rendering
