import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../Slices/cartSlice';
import { Modal, Button, Navbar, Container, Badge } from 'react-bootstrap';
import { increaseQuantity,decreaseQuantity,setCartItems,removeCartItem } from '../Slices/cartSlice';

const ShoppingPage = () => {
  const isCartVisible = useSelector((state) => state.cart.isVisible);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  

 

 

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      {/* Header */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Redux Cart</Navbar.Brand>
          <Button
            variant="outline-light"
            onClick={() => dispatch(toggleCart())}
          >
            Cart <Badge bg="light" text="dark">{cartItems.length}</Badge>
          </Button>
        </Container>
      </Navbar>

      {/* Cart Modal */}
      <Modal show={isCartVisible} onHide={() => dispatch(toggleCart())} centered>
        <Modal.Header closeButton>
          <Modal.Title>My Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-3"
                >
                  <div>
                    <h6>{item.name}</h6>
                    <p>{item.price}</p>
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => dispatch(decreaseQuantity(item))}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity<1?dispatch(removeCartItem(item)):item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => dispatch(increaseQuantity(item))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch(toggleCart())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingPage;
