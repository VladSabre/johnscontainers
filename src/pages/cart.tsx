import React from 'react'
import SelectedProduct from '../components/selectedProduct'
import useRegionalSettings from '../services/useRegionalSettings'
import { useAppContext } from '../context/appContext'
import { ProductInCart } from '../models/productInCart'
import { useRouter } from 'next/router'
import { ConfigHelper } from '../services/configHelper'

const Cart = () => {
    const context = useAppContext();
    const configHelper = new ConfigHelper();
    const locale = useRouter().locale || configHelper.getDefaultLocale();
    const regionalSettings = useRegionalSettings(configHelper.getRegion(locale).CountryCode);

    return (
        <>
            <div className='container'>
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
    )
}

export default Cart