import { get } from "../remote/api-client";
import * as Constants from "../remote/api-constants";
import { ApiResponse } from "../remote/api-response";
import PlaceDto from "../remote/dto/place-dto";
import QuoteDto from "../remote/dto/quote-dto";
import WeatherDto from "../remote/dto/weather-dto";

export class ApiService {
    async getIp(): Promise<ApiResponse<IpInfoDto>> {
        return await get(Constants.IP_INFO_URL)
    }

    async getWeather(latitude: number, longitude: number): Promise<ApiResponse<WeatherDto>> {
        return await get(Constants.WEATHER_URL(latitude, longitude))
    }

    async getPlaces(cityName: string): Promise<ApiResponse<PlaceDto[]>> {
        return await get(Constants.PLACES_URL(cityName, ''))
    }

    async getQuote(category?: string): Promise<ApiResponse<[QuoteDto]>> {
        return await get(Constants.QUOTES_URL)
    }
}