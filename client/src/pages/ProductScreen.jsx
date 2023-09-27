import { Link, useParams } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
    const { id: productId } = useParams();
    const {
        data: product,
        isLoading,
        error,
    } = useGetProductDetailsQuery(productId);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Message
                variant="danger"
                children={error?.data?.message || error.error}
            />
        );
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
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
                                    {product.specs.map((spec) => (
                                        <li key={spec.id}>{spec}</li>
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
