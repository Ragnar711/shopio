import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

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
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    src={product.image}
                    variant="top"
                    height="300px"
                    width="300px"
                />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title
                        as="div"
                        style={titleStyle}
                        className="product-title"
                    >
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
