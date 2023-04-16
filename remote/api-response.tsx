export class ApiResponse<T> {
    readonly status: number
    statusText: string
    url: string

    constructor(
        response: Response
    ) {
        if (response) {
            this.status = response.status
            this.statusText = response.statusText
            this.url = response.url
        }
    }
}

export class ApiResponseSuccess<T> extends ApiResponse<T> {
    data: T;

    constructor(data: T, response: Response) {
        super(response);
        this.data = data;
    }
}

export class ApiResponseError<T> extends ApiResponse<T> {
    errorTitle: string;
    errorMessage: string;

    constructor(errorTitle: string, errorMessage: string, response: Response) {
        super(response);
        this.errorTitle = errorTitle;
        this.errorMessage = errorMessage;
    }
}