import QuoteDto from "../../remote/dto/quote-dto";
import { Quote } from "./quote";

export function mapQuote(quote: QuoteDto): Quote {
    return new Quote(quote.quote, quote.author, quote.category);
}
