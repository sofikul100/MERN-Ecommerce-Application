import React, { Fragment, useEffect } from 'react'
import { Container, Col, Row, Carousel, Modal, Button, Spinner } from "react-bootstrap"

import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import { productDetails } from '../../REDUX/actions/ProductAction';


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Submit Review
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}






const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);

    const { loading, product, error } = useSelector((state) => state.productDetails)

    const productImages = [
        'https://solplant.netlify.app/images/products/4.png',
        'https://solplant.netlify.app/images/products/2.png',
        'https://solplant.netlify.app/images/products/7.png',

        'https://solplant.netlify.app/images/products/3.png'
    ]

    const options = {
        value: product.rating,
        readOnly: true,
        precision: 0.5,
    }

    useEffect(() => {
        dispatch(productDetails(id))
    }, [dispatch, id])




    return (
        <Fragment>
            {loading ? (
                <div id="spinner_section">
                    <Spinner animation="border" id="loading_spinner" />
                </div>
            ) : (
                <Fragment>
                    <div style={{ marginTop: '40px', marginBottom: "40px" }}>
                        <Container>
                            <Row>
                                <Col xs={12} sm={12} md={6} lg={6} xl={6}>


                                    <Carousel nextIcon={false} prevIcon={false}>
                                        {productImages.map((item) => (
                                            <Carousel.Item>
                                                <img
                                                    className="d-block w-100"
                                                    src={item}
                                                    alt="Second slide"
                                                    style={{ height: "400px" }}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>



                                </Col>

                                <Col>
                                    <div>
                                        <h2>{product.name}</h2>
                                        <p className='font-bold'>Product #{product._id}</p>
                                    </div>

                                    <hr />

                                    <div className='flex space-x-1'>
                                        <span> <ReactStars {...options} /></span><span>  ({product.numberOfReviws} )</span>

                                    </div>

                                    <hr />

                                    <div className='mt-2'>
                                        <h3 className='font-bold'> {product.price} Tk</h3>
                                    </div>

                                    <div className='flex space-x-1'>
                                        <button className='btn font-bold' style={{ background: "#5D8834", color: "white" }}> - </button>
                                        <input type="number" style={{ border: '1px solid black', borderRadius: '5px' }} defaultValue="1" />
                                        <button className='btn font-bold' style={{ background: "#5D8834", color: "white" }}> + </button>


                                        {product.stock < 1 ? (
                                            <button disabled className='btn btn-outline-danger' style={{ fontWeight: "bold" }}>
                                                Add To Cart
                                            </button>
                                        ) : (
                                            <button className='btn btn-outline-danger' style={{ fontWeight: "bold" }}>
                                                Add To Cart
                                            </button>
                                        )}
                                    </div>

                                    <div className='mt-1'>
                                        <p className='font-bold space-x-2'>
                                            Status :
                                            {product.stock < 1 ? (
                                                <b style={{ color: "red" }}> Out Of Stock</b>
                                            ) : (
                                                <b style={{ color: "green" }}> InStock</b>
                                            )}

                                            <small>Avaiable:({product.stock})</small>
                                        </p>
                                    </div>

                                    <hr />
                                    <div>
                                        <h4 className='font-bold'>Description: </h4>
                                        <small>
                                            {product.description}
                                        </small>
                                        <br />
                                        <button className='btn btn-sm btn-outline-danger front-bold mt-2' onClick={() => setModalShow(true)} style={{ fontWeight: 'bold' }}> Submit Review </button>
                                        {/* bootstrap submit review modal */}
                                        <MyVerticallyCenteredModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </div>
                                </Col>
                            </Row>










                            <hr />
                            <div>
                                <h1>All Review will be show here</h1>
                            </div>
                        </Container>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}


export default ProductDetails;