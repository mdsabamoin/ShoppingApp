import { useEffect, useState } from 'react';
import Products from './Components/Products';
import ShoppingPage from './Components/ShoppingPage';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
import { Navbar, Container, Nav } from 'react-bootstrap';
import {fetchCartItems} from "./Actions/cartAction";
 import {getItem} from "./Slices/cartSlice"
let initialState = false;

function App() {
  
  const [show, setShow] = useState(false); // Controls the visibility of the header
  const cart = useSelector((state) => state.cart);
  const status = useSelector((state)=>state.cart.status);
  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch(getItem());
  }, [dispatch]);
  

  return (
    <div className="App">
      {status && (
        <Navbar bg={status === "success" ? "success" : "dark"} variant="dark">
          <Container>
            {/* Top Left Corner */}
            <Navbar.Brand>
              {status === "sending" && "Sending..."}
              {status === "success" && "Success"}
              {status === "failed" && "Error"}
              {status === "fetching" && "Fetching"}
            </Navbar.Brand>

            {/* Top Right Corner */}
            <Nav className="ms-auto">
              <Nav.Link href="#status">
                {status === "sending" && "Sending Cart Data!"}
                {status === "success" && "Sent Cart Data Successfully!"}
                {status === "failed" && "Sending Cart Data Failed!"}
                {status === "fetching" && "Loading Cart Details Failed"}
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      )}
      <ShoppingPage />
      <Products />
    </div>
  );
}

export default App;
