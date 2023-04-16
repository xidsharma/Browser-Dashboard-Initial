import { AppProps } from "next/app";
import "../styles/globals.css";
import { createContext } from "react";
import { AppEnvironment, AppEnvironmentImpl } from "../app-environment";

export const EnvironmentContext = createContext({ environment: undefined } as { environment: AppEnvironment })

export default function App({ Component, pageProps }: AppProps) {
    const environment = new AppEnvironmentImpl()

    return <EnvironmentContext.Provider value={{ environment: environment }}>
        <Component {...pageProps} />
    </EnvironmentContext.Provider>
}