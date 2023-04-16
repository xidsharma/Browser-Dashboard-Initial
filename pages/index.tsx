import styles from './index.module.css';
import Image from 'next/image';
import Head from 'next/head';
import TabIcon from '../components/tab-icon/tab-icon';
import { useContext, useEffect, useState } from 'react';
import { EnvironmentContext } from './_app';
import { Quote } from '../features/quote/quote';
import Weather from '../features/weather/weather';

function IndexPage() {
    const quoteService = useContext(EnvironmentContext).environment.quoteService;
    const weatherService = useContext(EnvironmentContext).environment.weatherService;

    const [quote, setQuote] = useState<Quote>(null);
    const [weather, setWeather] = useState<Weather>(null);

    useEffect(
        () => {
            const getQuote = async () => {
                const quote = await quoteService.getQuote();
                if (quote instanceof Error) {
                    console.error(quote);
                } else {
                    setQuote(quote);
                }
            }
            getQuote()
            return () => setQuote(null);
        },
        [quoteService]
    )

    useEffect(
        () => {
            const getWeather = async () => {
                const weather = await weatherService.getWeather();
                if (weather instanceof Error) {
                    console.error(weather);
                } else {
                    setWeather(weather);
                }
            }
            getWeather()
            return () => setWeather(null);
        },
        [weatherService]
    )

    const weatherText = weather ? Math.round(weather.temperatureInCelsius.actual).toString() + '° ' + weather.conditions[0].title + " " + weather.city : '';

    return (
        <>
            <Head>
                <title>Browser Dashboard</title>
                <meta name="description" content="Custom start page or new tab" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <TabIcon />
            </Head>
            <main className={styles.screen}>
                <Image className={styles.backgroundImage} src="/background.png" alt="Logo" fill />
                <div className={styles.layout}>
                    <section className={styles.headerContainer}>
                        <div className={styles.headerContent}>
                            <img src="/logo.svg" alt="Logo" />
                            <div className={styles.greetingContainer}>
                                <p className={styles.greeting}>Be the change</p>
                                <div className={styles.statsContainer}>
                                    <p className={styles.dateTime}>Thu 13 April 22:53pm</p>
                                    <p className={styles.weather}>{weatherText}</p>
                                </div>
                            </div>
                            <div className={styles.quoteContainer}>
                                <p className={styles.quote}>{quote?.content ? quote.content : ``}</p>
                                <p className={styles.author}>{quote?.author ? quote.author : ``}</p>
                            </div>
                        </div>
                    </section>
                    <section className={styles.bookmarksContainer}>
                    </section>
                </div>
            </main>
        </>
    );
};

export default IndexPage;