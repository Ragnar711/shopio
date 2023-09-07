import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";

const Home = () => {
    const customStyle = {
        color: "#333",
        textAlign: "center",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    };
    return (
        <>
            <h1 style={customStyle}>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default Home;
