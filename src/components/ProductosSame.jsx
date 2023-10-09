import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductosSame = ({data}) => {
    return (
        <Card 
        style={{ marginBottom: 20, height: "35rem", width: "20rem" }}
        as={Link}
        to={`/product/${data.id}`}
        >
            <Card.Img 
            variant="top" 
            src={data.images?.[0]?.url} 
            style={{height: 200, objectFit: 'contain', marginTop: 20}}
            />
            <hr/>
            <Card.Body>
                <Card.Title>{data.brand}</Card.Title>
                <Card.Text>{data.title}</Card.Text>
                <Card.Title>Price</Card.Title>
                <Card.Text>$ {data.price}</Card.Text>
                <Button variant="primary">Buy</Button>
            </Card.Body>
        </Card>

    )
}

export default ProductosSame