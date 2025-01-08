import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../Slices/cartSlice';
import { Modal, Button, Navbar, Container, Badge } from 'react-bootstrap';

const ShoppingPage = () => {
  const isCartVisible = useSelector((state) => state.cart.isVisible);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 15, quantity: 2 },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

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
            Cart <Badge bg="light" text="dark">{totalItems}</Badge>
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
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseQuantity(item.id)}
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
