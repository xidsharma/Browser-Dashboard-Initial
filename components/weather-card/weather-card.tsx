import { useContext, useEffect, useState } from "react";
import { EnvironmentContext } from "../../pages/_app";
import Weather from "../../features/weather/model/weather";
import Image from "next/image";
import { WeatherStatCardProps } from "../stat-card/weather-stat-card-props";
import WeatherStatCard from "../stat-card/weather-stat-card";
import moment from "moment";
import styles from "./weather-card.module.css";

export default function WeatherCard() {
    const environment = useContext(EnvironmentContext).environment;
    const [weather, setWeather] = useState<Weather>(null);

    useEffect(() => {
        const get = async () => {
            const weather = await getWeather();
            setWeather(weather);
        };

        get()

        const interval = setInterval(async () => {
            setWeather(await getWeather())
        }, 60000);
        return () => clearInterval(interval);
    }, [weather]);

    async function getWeather(): Promise<Weather> {
        const weatherOrError = await environment.weatherService.getWeather();
        return weatherOrError instanceof Error ? null : weatherOrError as Weather
    }

    return <div className={styles.headerWeatherContent}>
        <WeatherCardHeader weather={weather} />
        <WeatherStats weather={weather} />
    </div>
}

function WeatherCardHeader({ weather }: { weather: Weather }) {
    if (weather == null) return <></>
    return <div className={styles.weatherHeader}>
        <div className={styles.weatherHeaderTextContainer}>
            <p className={styles.city}>{weather?.city}</p>
            <div className={styles.weatherHeaderContent}>
                <p className={styles.temperature}>{weather?.temperatureInCelsius?.actual}°</p>
                <p className={styles.condition}>{weather?.conditions[0]?.title}</p>
            </div>
        </div>
        <div className={styles.weatherIcon}>
            <Image src={weather?.conditions[0].iconUrl} alt="Logo" width={96} height={96} />
        </div>
    </div>
}

function WeatherStats({ weather }: { weather: Weather }) {
    if (weather == null) return <></>

    const sunriseAt = moment.utc(weather.sunriseAt, 'X').local().toDate()
    const sunsetAt = moment.utc(weather.sunsetAt, 'X').local().toDate()

    console.log(weather.sunriseAt)
    console.log(weather.sunsetAt)
    console.log(sunriseAt)
    console.log(sunsetAt)

    const props: WeatherStatCardProps[] = weather ? [
        new WeatherStatCardProps(`${weather.temperatureInCelsius.perceived}°`, 'Feels like', '/thermometer.svg'),
        new WeatherStatCardProps(
            `${weather.rain.volumeInMillimeters}mm`,
            `Rain${weather.rain.timeInHours === 0 ? '' : `in ${weather.rain.timeInHours}hr${weather.rain.timeInHours === 1 ? '' : 's'}`}`,
            '/rain.svg'
        ),
        new WeatherStatCardProps(`${weather.humidityPercentage}%`, 'Humidity', '/humidity.svg'),
        new WeatherStatCardProps(`${weather.cloudCoverPercentage}%`, 'Cloud cover', '/cloud.svg'),
        new WeatherStatCardProps(`${weather.wind?.speedMs}m/s`, 'Wind', '/wind.svg'),
        new WeatherStatCardProps(`${sunriseAt.getHours()}:${sunriseAt.getMinutes()}-${sunsetAt.getHours()}:${sunsetAt.getMinutes()}`, 'Day', '/sunrise.svg'),
    ] : [];

    return <div className={styles.weatherStatsContainer}>
        {props.map((p, i) => <WeatherStatCard key={i} {...p} />)}
    </div>
}
