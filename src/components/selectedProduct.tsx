import { Button, Card, Row, Col } from "react-bootstrap";
import { useAppContext } from "../context/appContext";
import { ProductInCart } from "../models/productInCart";
import PriceComponent from "./priceComponent";

const SelectedProduct = (props: ProductInCart) => {
    const context = useAppContext();

    const renderRemoveButton = (): JSX.Element => {
        const handler = () => { context.removeFromCart(props.id) };

        return (
            <Button variant='primary' onClick={handler}>Remove</Button>
        );
    }

    return (
        <Card className='p-3'>
            <Row>
                <Col md={4}>
                    {props.name}
                </Col>
                <Col md={{ span: 1, offset: 5 }}>
                    <PriceComponent price={props.price}></PriceComponent>
                </Col>
                <Col md={1}>
                    {props.amount}
                </Col>
                <Col md={1}>
                    {renderRemoveButton()}
                </Col>
            </Row>
        </Card>
    );
}

export default SelectedProduct;