import { useEffect, useState } from 'react';
import Products from './Components/Products';
import ShoppingPage from './Components/ShoppingPage';
import { useSelector } from 'react-redux';
import axios from "axios";
import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  const [status, setStatus] = useState(null); // Tracks the status: "sending", "success", or "failed"
  const [show, setShow] = useState(false); // Controls the visibility of the header
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setStatus("sending");
        setShow(true);
        const response = await axios.put("https://shoppingapp-bfd38-default-rtdb.firebaseio.com/cart.json", cart);
        if (response.status === 200) {
          setStatus("success");
        }
      } catch (error) {
        setStatus("failed");
      }
    };

    fetchCart();
  }, [cart]);

  return (
    <div className="App">
      {show && (
        <Navbar bg={status === "success" ? "success" : "dark"} variant="dark">
          <Container>
            {/* Top Left Corner */}
            <Navbar.Brand>
              {status === "sending" && "Sending..."}
              {status === "success" && "Success"}
              {status === "failed" && "Error"}
            </Navbar.Brand>

            {/* Top Right Corner */}
            <Nav className="ms-auto">
              <Nav.Link href="#status">
                {status === "sending" && "Sending Cart Data!"}
                {status === "success" && "Sent Cart Data Successfully!"}
                {status === "failed" && "Sending Cart Data Failed!"}
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
