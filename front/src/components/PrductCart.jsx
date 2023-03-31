import React, { Fragment } from 'react'
import ReactStars from "react-rating-stars-component";
import { NavLink } from 'react-router-dom';
import product1 from "../images/product1.png"
import { Col, Card } from "react-bootstrap"
import { AiFillEye, AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai"
function PrductCart({ product }) {

    const options = {
        value: product.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <Fragment>

            <Col xs={12} sm={6} md={6} lg={3} xl={3}>

                <Card style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                    <Card.Img variant="top" src={product1} />
                    <Card.Body>
                        <p className='font-bold text-black' style={{ fontSize: '20px' }}>{product.name}</p>
                        <div className='flex items-center justify-between'>
                            <Card.Text className='font-bold'> <ReactStars {...options} />  </Card.Text> <Card.Text id="num-of-reviews" style={{ marginBottom: '18px' }}>  <small> NofR ({product.numberOfReviws})</small>  </Card.Text>
                        </div>
                        <div>
                            <p className='font-bold'>Price Is Only : <small>{product.price} Tk</small></p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <NavLink to={`/product/${product._id}`}>
                                <button className='btn' id="quik-view" title='Product Details'> <AiFillEye />  </button>
                            </NavLink>
                            <button className='btn' id="quik-view" title='Add To WishList'> <AiOutlineHeart />  </button>
                            <button className='btn' id="add-to-cart" title='Add To Cart'> <AiOutlineShoppingCart /> </button>
                        </div>
                    </Card.Body>
                </Card>
                <br />
            </Col>
        </Fragment>
    )
}

export default PrductCart;