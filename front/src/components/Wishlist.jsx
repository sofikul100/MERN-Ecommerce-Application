import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function Wishlist({...props}) {
  return (
    <div>
       <Offcanvas show={props.showWishlistComponent} onHide={props.handleWishlistClose} placement='top'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>WishList Products</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
    </div>
  )
}
