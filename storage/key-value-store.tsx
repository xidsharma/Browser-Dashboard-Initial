import Cookies from "js-cookie";

export interface KeyValueStore {
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
}

export class KeyValueStoreImpl implements KeyValueStore {

    get<T>(key: string): T | null {
        const value = Cookies.get(key);
        console.log(value)
        return value ? JSON.parse(value) : null;
    }

    set<T>(key: string, value: T): void {
        console.log(value)
        Cookies.set(key, JSON.stringify(value), { expires: 7 });
    }
}

