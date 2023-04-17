import styles from './index.module.css';
import Image from 'next/image';
import Head from 'next/head';
import TabIcon from '../components/tab-icon/tab-icon';
import { Quote } from '../features/quote/quote';
import { AppEnvironmentImpl } from '../app-environment';
import WeatherCard from '../components/weather-card/weather-card';
import DateTime from '../components/date-time-label/date-time-label';
import NotesCard from '../components/notes-card/notes-card';

function IndexPage({ quote }: { quote: Quote }) {
    console.log("Started");
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
                        <WeatherCard />
                        <div className={styles.headerMainContent}>
                            <img src="/logo.svg" alt="Logo" />
                            <div className={styles.headerTextContainer}>
                                <DateTime />
                                <div className={styles.quoteContainer}>
                                    <p className={styles.quote}>{quote?.content ? quote.content : ``}</p>
                                    <p className={styles.author}>{quote?.author ? quote.author : ``}</p>
                                </div>
                            </div>
                        </div>
                        <NotesCard />
                    </section>
                    <section className={styles.bookmarksContainer}>
                    </section>
                </div>
            </main>
        </>
    );
};

export async function getServerSideProps() {
    const appEnvironment = new AppEnvironmentImpl()

    const quoteOrError = await appEnvironment.quoteService.getQuote();

    return {
        props: {
            quote: quoteOrError instanceof Error ? null : JSON.parse(JSON.stringify(quoteOrError))
        }
    }
}

export default IndexPage;