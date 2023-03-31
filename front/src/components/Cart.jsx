import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function Cart({ name, ...props }) {
    return (
        <div>
            <Offcanvas show={props.show} onHide={props.handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>All Products</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
