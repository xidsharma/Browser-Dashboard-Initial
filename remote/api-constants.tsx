export const IP_INFO_URL = 'https://ipinfo.io/json?token=559005096c0064'

export const QUOTES_URL = (category) => `https://api.api-ninjas.com/v1/quotes?category=${category}`;
export const QUOTES_URL_API_KEY_HEADER = 'X-Api-Key';
export const QUOTES_URL_API_KEY = 'DvzMLvzIHMR38U8HbtgAdw==6owLxUpVBL6fIWBf';

const OPEN_WEATHER_MAP_API_KEY = '14ebd6bb1415e27ab25d60053aa8ee25';

const PLACES_API_LIMIT = 5;
export const PLACES_URL = (city: string, country: string) => `http://api.openweathermap.org/geo/1.0/direct?q=${city},,${country}&limit=${PLACES_API_LIMIT}&appid=${OPEN_WEATHER_MAP_API_KEY}`;

export const WEATHER_URL = (latitude: number, longitude: number) => `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}&units=metric`