import { NoteService, NoteServiceImpl } from "./features/notes/notes-service";
import { QuoteService, QuoteServiceImpl } from "./features/quote/quote-service";
import { WeatherServiceImpl } from "./features/weather/weather-service";
import { WeatherService } from "./features/weather/weather-service";
import { ApiService } from "./remote/api-service";
import { KeyValueStoreImpl } from "./storage/key-value-store";

export interface AppEnvironment {

    quoteService: QuoteService
    weatherService: WeatherService
    noteService: NoteService
}

export class AppEnvironmentImpl implements AppEnvironment {
    private apiService = new ApiService()
    private keyValueStore = new KeyValueStoreImpl()

    quoteService: QuoteService = new QuoteServiceImpl(this.apiService)
    weatherService: WeatherService = new WeatherServiceImpl(this.apiService, this.keyValueStore)
    noteService: NoteService = new NoteServiceImpl(this.keyValueStore)
}