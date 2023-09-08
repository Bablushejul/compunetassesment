import { Container, Row, Col, Button } from "react-bootstrap";
import OrderList from "./OrderList";
import CartContext from "../Context/CartContext";
import { useContext } from "react";

function CartContainer() {
    const ctx = useContext(CartContext)
    const orderList =ctx.orderList;
    let totalAmount = 0 ;
    orderList.forEach((item)=>{
        totalAmount += item.price*item.quantity ;
    })
    totalAmount = totalAmount.toFixed(2)
  return (
    <Container
      fluid
      className="bg-light p-3 " expand="lg" 
      style={{ position: "fixed", top: 60, right: 0,left:-20 ,width:"80%", maxHeight: "70vh",display:"flex",flexDirection:"column",flexWrap:"wrap"}}
    >
      <Button
        variant="outline-danger"
        className="float-end" 
        onClick={()=>ctx.setCartVisibility(false)}
      >
        X
      </Button>
      <Row>
        <Col xs={12}>
          <h4 className="text-center mb-4">My Cart</h4>
          {orderList.length > 0 ? (
            <div className="order-list" style={{ maxHeight: "calc(70vh - 100px)", overflowY: "auto" ,overflowX: 'hidden' }}>
            <OrderList
              orders={orderList}
            />
            </div>
           
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </Col>
      </Row>
      <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>
      {orderList.length > 0 ? (<><hr />
      <div className="d-flex justify-content-start flex-column " >
        <h6>Total Amount:</h6>
        <h6>Rs. {totalAmount} </h6>
      </div>
      <Button variant="primary" block >
        Place Order
      </Button></> ): <hr/>}
      </div>
     
    </Container>
  );
}

export default CartContainer;