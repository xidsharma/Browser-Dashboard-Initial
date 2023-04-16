import { Quote } from "./quote";
import QuoteDto from "../../remote/dto/quote-dto";
import { mapQuote } from "./quote-mapper";
import ServiceBase from "../util/service-base";
import { ApiService } from "../../service/api-service";

export interface QuoteService {
    getQuote(category?: string): Promise<Quote | Error>;
}

export class QuoteServiceImpl extends ServiceBase implements QuoteService {

    constructor(
        private apiService: ApiService,
        private remoteMapper: (data: QuoteDto) => Quote = mapQuote,
    ) {
        super();
    }

    async getQuote(category?: string): Promise<Quote | Error> {
        const response = await this.apiService.getQuote(category)
        return this.map(response, (dto) => this.remoteMapper(dto[0]))
    }
}
