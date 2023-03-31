import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Row, Col } from "react-bootstrap"
import { AiOutlineLogin } from 'react-icons/ai';
import { RiAccountCircleLine } from "react-icons/ri"
import { NavLink } from "react-router-dom"
import InputGroup from 'react-bootstrap/InputGroup';


import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineSync } from "react-icons/ai";
import Cart from "../Cart";
import Wishlist from "../Wishlist";
function Header() {


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showWishlistComponent, setWishlistcomponent] = useState(false);
  const handleWishlistClose = () => setWishlistcomponent(false);
  const handleWishlistShow = () => setWishlistcomponent(true);


  let isAuthenticate = false;



  return (
    <>
      <Navbar expand="lg" sticky="top" style={{ background: "#5D8834" }}>
        <Container>
          <Navbar.Brand href="#" className="font-bold" style={{ fontFamily: 'Merienda', color: 'white' }}> SolPalnet shop </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 m-auto"
              style={{ maxHeight: '100px' }}
              navbarScroll

            >
              <Nav.Link ><NavLink to="/" className="text-white" style={{ textDecoration: "none" }}>Home</NavLink></Nav.Link>
              <Nav.Link><NavLink to="/about" className="text-white" style={{ textDecoration: "none" }}>About Us </NavLink></Nav.Link>
              <Nav.Link className="text-white">Shop</Nav.Link>
              <Nav.Link className="text-white" >Blogs</Nav.Link>
              <Nav.Link className="text-white" > Contact Us </Nav.Link>
            </Nav>
            <Form className="d-flex">
              {isAuthenticate ? (
                <>
                  <RiAccountCircleLine className="mt-1 text-white mr-1" />
                  <NavDropdown title="My Account" id="navbarScrollingDropdown" className="text-white" style={{ fontWeight: "bold" }} >
                    <NavDropdown.Item style={{ color: "#00bf63", fontWeight: 'bold' }}>Profile</NavDropdown.Item>
                    <NavDropdown.Item style={{ color: "#00bf63", fontWeight: 'bold' }}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <AiOutlineLogin className="mt-1 text-white mr-1" />
                  <Nav.Link href="#" className="text-white" style={{ fontWeight: "bold" }}>  Login || &nbsp; </Nav.Link>
                  <Nav.Link href="#" className="text-white" style={{ fontWeight: "bold" }}> Register</Nav.Link>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* middle nav */}

      <div style={{ background: 'whitesmoke',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px' }} >
        <Container>
          <Row>
            <Col xs={6} sm={8} md={8} lg={6} xl={6}>
              <InputGroup className="mb-3" style={{ marginTop: '15px' }}>
                <Form.Control
                  placeholder="Search here.........."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button variant="" className="text-white font-bold" style={{ background: "#5D8834" }}>
                  Search
                </Button>
              </InputGroup>
            </Col>
            <Col xs={6} sm={4} md={4} lg={6} xl={6}>
              <div className="d-flex space-x-4" style={{ marginTop: '15px', float: 'right' }} id="social-icon">


                <span>
                  <button onClick={handleWishlistShow}>
                    <AiOutlineHeart style={{ color: '#5D8834', fontSize: '30px', }}/>
                  </button>
                </span>

                <span>
                  <button onClick={handleShow}>
                    <AiOutlineShoppingCart style={{ color: '#5D8834', fontSize: '30px' }} />
                  </button>
                </span>

                <span>
                  <button>
                    <AiOutlineSync style={{ color: '#5D8834', fontSize: '30px' }} />
                  </button>
                </span>



              </div>
            </Col>
          </Row>
        </Container>



        {/* cart component here   */}
        <Cart show={show} handleClose={handleClose} />
        {/* end cart component */}
        {/* wishlist component */}
        <Wishlist showWishlistComponent={showWishlistComponent} handleWishlistClose={handleWishlistClose} />
        {/* end wishlist componnennt */}
      </div>

      


    </>
  )
}

export default Header;