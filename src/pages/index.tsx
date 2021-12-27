import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { StoreService } from '../services/storeService';
import { HomePageInfo } from '../models/homePageInfo';
import { Page } from '../models/page';
import { ConfigHelper } from '../services/configHelper';

const Home = (data: InferGetStaticPropsType<typeof getStaticProps>) => {
    const routeLocale = useRouter().locale;
    if (routeLocale === 'default')
        return <></>;

    const service = new StoreService();
    const configHelper = new ConfigHelper();
    const locale = routeLocale || configHelper.getDefaultLocale();
    const meta = service.getDynamicPageContent(Page.Home, locale);
    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name='description' content={meta.description}></meta>
            </Head>
            <Card className='p-3'>
                <h2>{data.greetingText} <Link href='/shop'>{data.linkText}</Link></h2>
            </Card>
        </>
    );
};

export const getStaticProps: GetStaticProps<HomePageInfo> = async (context) => {
    if (context.locale === 'default')
        return { props: {} as HomePageInfo };

    const service = new StoreService();
    const props = service.getHomeText(context.locale);

    return {
        props: props,
        revalidate: 300
    };
};

export default Home;