import Rain from "./rain";
import Temperature from "./temperature";
import WeatherCondition from "./weather-condition";
import Wind from "./wind";

export default class Weather {
    constructor(
        public city: string,
        public temperatureInCelsius: Temperature,
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
