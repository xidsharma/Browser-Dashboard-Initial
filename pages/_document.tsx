import { Html, Head, Main, NextScript } from 'next/document'
import TabIcon from '../components/tab-icon/tab-icon'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <TabIcon />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
