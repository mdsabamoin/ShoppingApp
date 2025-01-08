import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { increaseQuantity,decreaseQuantity,setCartItems,removeCartItem } from '../Slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';


const Products = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 15, quantity: 1 },
    { id: 3, name: 'Item 3', price: 20, quantity: 1 },
  ]);
  
    const dispatch = useDispatch();
    

  
  const addToCart = (item) => {
    dispatch(setCartItems(item))
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Products;
