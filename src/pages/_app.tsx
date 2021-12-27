import React, { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AppProvider } from '../context/appProvider';
import { Layout } from '../components/layout';

import 'bootstrap/dist/css/bootstrap.css';

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
