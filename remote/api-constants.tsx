export const IP_INFO_URL = 'https://ipinfo.io/json?token=559005096c0064'

export const QUOTES_URL = `https://api.quotable.io/quotes/random?maxLength=120`;

// temp mail weather key = '20b08cc46af45097e33dab00b05372c7', '5945932e3e073a4a71a9e0939e950fdd'

const OPEN_WEATHER_MAP_API_KEY = '20b08cc46af45097e33dab00b05372c7';

const PLACES_API_LIMIT = 5;
export const PLACES_URL = (city: string, country: string) => `http://api.openweathermap.org/geo/1.0/direct?q=${city},,${country}&limit=${PLACES_API_LIMIT}&appid=${OPEN_WEATHER_MAP_API_KEY}`;

export const WEATHER_URL = (latitude: number, longitude: number) => `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`