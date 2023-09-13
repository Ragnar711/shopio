import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Axios from "redaxios";

const Home = () => {
    const [products, setProducts] = useState([]);

    const customStyle = {
        color: "#555",
        fontWeight: "600",
        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
    };

    const fetchProducts = async () => {
        try {
            const response = await Axios.get(
                "http://localhost:5000/api/products"
            );
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
