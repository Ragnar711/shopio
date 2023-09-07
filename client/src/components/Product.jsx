import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
    const cardStyle = {
        border: "1px solid #ccc",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
    };

    const titleStyle = {
        color: "black",
    };
    return (
        <Card className="my-3 p-3 rounded" style={cardStyle}>
            <a href={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    height="300px"
                    width="300px"
                />
            </a>
            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div" style={titleStyle}>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
