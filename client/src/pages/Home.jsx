import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    const customStyle = {
        color: "#555",
        fontWeight: "600",
        textShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
    };

    const renderContent = () => {
        if (error) {
            return (
                <Message
                    variant="danger"
                    children={error?.data?.message || error.error}
                />
            );
        } else {
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
        }
    };

    return <>{isLoading ? <Loader /> : renderContent()}</>;
};

export default Home;
