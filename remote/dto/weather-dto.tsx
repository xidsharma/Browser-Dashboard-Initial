export default class WeatherDto {
    coord: CoordinatesDto;
    weather: WeatherConditionDto[];
    base: string;
    main: WeatherMainDto;
    visibility: number;
    wind: WindDto;
    rain?: RainDto;
    clouds: CloudsDto;
    dt: number;
    sys: SysDto;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

interface CoordinatesDto {
    lon: number;
    lat: number;
}

export interface WeatherConditionDto {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface WeatherMainDto {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

interface WindDto {
    speed: number;
    deg: number;
    gust: number;
}

interface RainDto {
    "1h"?: number;
    "2h"?: number;
}

interface CloudsDto {
    all: number;
}

interface SysDto {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}