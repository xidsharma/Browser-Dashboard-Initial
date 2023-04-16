import Rain from "./model/rain";
import Temperature from "./model/temperature";
import WeatherCondition from "./model/weather-condition";
import Wind from "./model/wind";

export default class Weather {
    constructor(
        public city: string,
        public temperatureInCelsius: Temperature,
        public pressureInHectoPascal: number,
        public humidityPercentage: number,
        public visibilityInMeters: number,
        public wind: Wind,
        public rain: Rain,
        public cloudCoverPercentage: number,
        public sunriseAt: number,
        public sunsetAt: number,
        public conditions: WeatherCondition[],
        public createdAt: number,
    ) { }
}
