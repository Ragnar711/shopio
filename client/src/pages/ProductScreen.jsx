import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Rating from "../components/Rating";
import Axios from "redaxios";

const ProductScreen = () => {
    const { id: productId } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await Axios.get(
                    `http://localhost:5000/api/products/${productId}`
                );
                setProduct(response.data);
            } catch (error) {
                setError("Product not found");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Row>
                    <Col md={4}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            <strong>
                                                {product.countInStock > 0
                                                    ? "In stock"
                                                    : "Out of stock"}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block btn-dark"
                                        type="button"
                                        disabled={product.countInStock === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
            <Row>
                <Col md={12}>
                    <Tabs
                        defaultActiveKey="specs"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="spec" title="Technical Details">
                            {product.specs && product.specs.length > 0 ? (
                                <ul>
                                    {product.specs.map((spec, index) => (
                                        <li key={index}>{spec}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No technical details available.</p>
                            )}
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews">
                            Reviews
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </>
    );
};

export default ProductScreen;
