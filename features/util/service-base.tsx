import { ApiResponse, ApiResponseError, ApiResponseSuccess } from "../../remote/api-response";

export default class ServiceBase {

    protected async map<T, R>(
        response: ApiResponse<T>,
        mapper: (data: T) => R = (data: T) => data as unknown as R
    ): Promise<R | Error> {
        try {
            if (response instanceof ApiResponseSuccess<T>) {
                return mapper(response.data);
            } else {
                return new Error(
                    response instanceof ApiResponseError ? response.errorMessage: response.statusText
                );
            }
        } catch(error) {
            return error
        }
    }
}