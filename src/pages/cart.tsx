import React from 'react';
import SelectedProduct from '../components/selectedProduct';
import useRegionalSettings from '../services/useRegionalSettings';
import { ConfigHelper } from '../services/configHelper';
import { NextPage } from 'next';
import { ProductInCart } from '../models/productInCart';
import { useAppContext } from '../context/appContext';
import { useRouter } from 'next/router';
import styles from '../../styles/product.module.scss';

const Cart: NextPage = () => {
    const context = useAppContext();
    const configHelper = new ConfigHelper();
    const locale = useRouter().locale || configHelper.getDefaultLocale();
    const regionalSettings = useRegionalSettings(configHelper.getRegion(locale).CountryCode);

    console.log(typeof window === 'undefined' ? 'server' : 'client');

    return (
        <>
            <div className={styles['cart-item']}>
                {context.cart.items.map((product: ProductInCart) =>
                    <SelectedProduct
                        key={product.id}
                        {...product}
                    />
                )}
                <div>Total: {context.cart.total}</div>
                <div>Available payment methods:</div>
                <ul>
                    {regionalSettings.paymentMethods.map(method =>
                        <li key={method}>{method}</li>
                    )}
                </ul>
            </div>
        </>
    );
};

Cart.getInitialProps = async (_context) => {
    return {};
};

export default Cart;