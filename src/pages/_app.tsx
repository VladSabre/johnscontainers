import { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { AppProvider } from '../context/appProvider'
import { Layout } from '../components/layout'
import Head from 'next/head'

import 'bootstrap/dist/css/bootstrap.css'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: ReactElement) => <Layout>{page}</Layout>);

    const page = getLayout(<Component {...pageProps} />);

    return (
        <>
            <Head>
                <meta charSet='utf-8' />
            </Head>
            <AppProvider>{page}</AppProvider>
        </>
    );
}
