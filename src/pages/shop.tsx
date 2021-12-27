import React from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { ProductCardModel } from '../models/productCardModel'
import ProductCard from '../components/productCard'
import { StoreService } from '../services/storeService'
import { ProductResponse } from '../models/productResponse'
import styles from '../../styles/Product.module.scss';
import { ConfigHelper } from '../services/configHelper'
import { useRouter } from 'next/router'
import { Page } from '../models/page'

export const getServerSideProps: GetServerSideProps<ProductResponse> = async (_context) => {
    const service = new StoreService();

    return {
        props: service.getProducts()
    };
}

const Shop = (data: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const service = new StoreService();
    const configHelper = new ConfigHelper();
    const locale = useRouter().locale || configHelper.getDefaultLocale();
    const meta = service.getDynamicPageContent(Page.Home, locale);
    return (
        <>
            <Head>
                <title>{data.metaTags.title}</title>
                <meta name='description' content={meta.description}></meta>
            </Head>
            <div className={styles['product-container']}>
                {data.products.map((product: ProductCardModel) =>
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        isInStock={product.isInStock}
                        price={product.price}
                    />
                )}
            </div>
        </>
    )
}

export default Shop