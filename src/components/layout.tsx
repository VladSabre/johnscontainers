import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { ReactNode, useState } from 'react';
import { Badge, Button, Container, Navbar } from 'react-bootstrap';
import { useAppContext } from '../context/appContext';
import styles from '../../styles/layout.module.scss';
import { ConfigHelper } from '../services/configHelper';

export const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
    const context = useAppContext();
    const router = useRouter();
    const configHelper = new ConfigHelper();

    const defaultLabel = configHelper.getRegion(configHelper.getDefaultLocale()).Label;
    const [languageLabel, setLanguageLabel] = useState(defaultLabel);

    const ChangeRegion = (): void => {
        context.removeFromCart();
        const nextRegion = configHelper.getNextRegion(languageLabel);
        setLanguageLabel(nextRegion.Label);
        router.push(router.pathname, router.asPath, { locale: nextRegion.CultureCode });
    };

    const GoToCart = (): void => {
        router.push('/cart');
    };

    const GoToHome = (): void => {
        router.push('/');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="sm" fixed='top'>
                <Container >
                    <Navbar.Brand href="#" onClick={GoToHome} className='me-auto'>John&apos;s containers</Navbar.Brand>
                    <Button variant="info" title="cart" onClick={GoToCart} className='me-1'>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <Badge bg="danger">{context.cart.items.length}</Badge>
                    </Button>
                    <Button title="region" onClick={ChangeRegion}>{languageLabel}</Button>
                </Container>
            </Navbar>
            <div className={styles.content}>
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
};

