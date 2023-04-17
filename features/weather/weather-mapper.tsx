import PlaceDto from "../../remote/dto/place-dto";
import WeatherDto, { WeatherConditionDto } from "../../remote/dto/weather-dto";
import Rain from "./model/rain";
import Temperature from "./model/temperature";
import WeatherCondition from "./model/weather-condition";
import Wind from "./model/wind";
import { Place } from "./place";
import Weather from "./model/weather";

export function mapWeather(weather: WeatherDto): Weather {
    const temperature: Temperature = new Temperature(
        weather.main.temp,
        weather.main.feels_like,
        weather.main.temp_min,
        weather.main.temp_max
    )

    const wind: Wind = new Wind(
        weather.wind.speed,
        weather.wind.deg,
        weather.wind.gust
    )

    let rain = new Rain(0, 0)

    if (weather.rain) {
        if (weather.rain["2h"]) {
            rain.timeInHours = 2
            rain.volumeInMillimeters = weather.rain["2h"]
        } else if (weather.rain["1h"]) {
            rain.timeInHours = 1
            rain.volumeInMillimeters = weather.rain["1h"]
        }
    }

    const weatherConditions = weather.weather.map(
        (dto: WeatherConditionDto) => {
            return new WeatherCondition(
                dto.main,
                dto.description,
                "http://openweathermap.org/img/wn/" + dto.icon + "@2x.png"
            )
        }
    )

    return new Weather(
        weather.name,
        temperature,
        weather.main.humidity,
        weather.visibility,
        wind,
        rain,
        weather.clouds.all,
        weather.sys.sunrise,
        weather.sys.sunset,
        weatherConditions,
        weather.dt
    )
}

export function mapPlace(place: PlaceDto): Place {
    return new Place(
        place.lat,
        place.lon,
        place.name,
        place.country
    )
}