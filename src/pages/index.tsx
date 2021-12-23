import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import React from 'react'
import { StoreService } from '../services/storeService'
import { HomePageInfo } from '../models/homePageInfo';
import { Card } from 'react-bootstrap';
import Head from 'next/head';

const Home = (data: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <Head>
                <title>hello</title>
            </Head>
            <Card className='p-3'>
                <h2>{data.greetingText} <Link href='/shop'>{data.linkText}</Link></h2>
            </Card>
        </>
    )
}

export const getStaticProps: GetStaticProps<HomePageInfo> = async (context) => {
    const service = new StoreService();
    const props = service.getHomeText(context.locale);

    return {
        props: props,
        revalidate: 300
    }
}

export default Home