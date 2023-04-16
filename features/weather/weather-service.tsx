import PlaceDto from "../../remote/dto/place-dto";
import WeatherDto from "../../remote/dto/weather-dto";
import { ApiService } from "../../service/api-service";
import { KeyValueStore } from "../../storage/key-value-store";
import ServiceBase from "../util/service-base";
import { Place } from "./place";
import Weather from "./weather";
import { mapPlace, mapWeather } from "./weather-mapper";

export interface WeatherService {
    getPlaces(name: string): Promise<Place[] | Error>;

    getWeather(place?: Place): Promise<Weather | Error>;
}

export class WeatherServiceImpl extends ServiceBase implements WeatherService {

    constructor(
        private apiService: ApiService,
        private keyValueStore: KeyValueStore,
        private weatherMapper: (weather: WeatherDto) => Weather = mapWeather,
        private placeMapper: (place: PlaceDto) => Place = mapPlace
    ) {
        super();
    }

    async getPlaces(city: string): Promise<Place[] | Error> {
        return this.map(
            await this.apiService.getPlaces(city),
            (places: PlaceDto[]) => places.map(this.placeMapper)
        )
    }

    async getWeather(place?: Place): Promise<Weather | Error> {
        const stored = this.keyValueStore.get<Place>("place");

        if (!place) {
            if (stored) {
                place = stored;
            } else {
                const ipPlace = await this.getIpPlace();

                if (ipPlace instanceof Error) {
                    return ipPlace;
                } else {
                    this.keyValueStore.set("place", ipPlace);
                    place = ipPlace
                }
            }
        }

        return await this.map(
            await this.apiService.getWeather(place.lat, place.lon),
            this.weatherMapper
        )
    }

    private async getIpPlace(): Promise<Place | Error> {
        return this.map(
            await this.apiService.getIp(),
            (ipInfo: IpInfoDto) => {
                const [lat, lng] = ipInfo.loc.split(",").map(parseFloat);
                return new Place(lat, lng, ipInfo.city, ipInfo.country)
            }
        )
    }
}