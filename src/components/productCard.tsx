import React from 'react';
import Image from 'next/image';
import { Badge, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../context/appContext';
import { ProductCardModel } from '../models/productCardModel';
import useLocalization from '../services/useLocalization';
import styles from '../../styles/productCard.module.scss';
import PriceComponent from './priceComponent';

const ProductCard = (props: ProductCardModel) => {
    const context = useAppContext();

    const localization = useLocalization(useRouter().locale);

    const renderInStockFlag = (isInStock: boolean): JSX.Element => {
        const text = isInStock ? localization.get('label_in-stock') : localization.get('label_out-of-stock');
        const modifier = isInStock ? 'success' : 'danger';
        return (
            <>
                <Badge className={styles['stock-badge']} bg={modifier}><FontAwesomeIcon icon={faCircleNotch} /></Badge>
                <span className={styles['stock-text']}>{text}</span>
            </>
        );
    };

    const renderAddToCartButton = (): JSX.Element => {
        const handler = () => { context.addToCart(props); };

        return (
            <Button variant='primary' disabled={!props.isInStock} onClick={handler}>{localization.get('label_add-to-cart')}</Button>
        );
    };

    return (
        <Card className={`${styles['product-card']} shadow m-3`}>
            <Image className='card-img-top' src={props.image} alt={props.name} width={300} height={200} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                {renderInStockFlag(props.isInStock)}
                <PriceComponent price={props.price}></PriceComponent>
                {renderAddToCartButton()}
            </Card.Body>
        </Card>
    );
};

export default ProductCard;