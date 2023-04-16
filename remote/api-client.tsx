import { ApiResponse, ApiResponseError, ApiResponseSuccess } from "./api-response";

export async function get<T>(
    endpoint: string,
    keyHeader?: { key: string, value: string }
): Promise<ApiResponse<T>> {
    return tryOrError(async () => getApiResponse<T>(await getResponse(endpoint, keyHeader)));
}

async function getResponse<T, R>(
    endpoint: string,
    keyHeader?: { key: string, value: string },
    methodType: string = "GET",
    body?: R
): Promise<Response> {
    const headers = new Headers();

    if (body) {
        headers.append('Content-Type', 'application/json');
    }

    if (keyHeader) {
        headers.append(`${keyHeader.key}`, `${keyHeader.value}`);
    }

    try {
        if (!body && !keyHeader) {
            return await fetch(endpoint)
        } else {
            return await fetch(
                endpoint,
                {
                    headers: headers,
                    mode: 'cors',
                    method: methodType,
                    body: (body instanceof String) ? body as string : JSON.stringify(body)
                }
            );
        }
    } catch (error) {
        console.log(error);
    }
}

async function getApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const json = await response.json();
    if (!response.ok) {
        console.log(response)
        if (response.status === 502) {
            return new ApiResponseError("Bad Gateway", "The server is currently unavailable", response);
        }

        if (response.status === 500) {
            return new ApiResponseError("Internal Server Error", "The server is currently unavailable", response);
        }

        return new ApiResponse(response);
    }

    const c = new ApiResponseSuccess(json as T, response)
    console.log(c)
    return c;
}

async function tryOrError<T>(block: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> {
    try {
        return await block()
    } catch (error) {
        console.log(error);
        return new ApiResponseError("Something went wrong", error.toString(), null)
    }
}
