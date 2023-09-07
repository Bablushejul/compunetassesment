import { Button, Col, Image, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import CartContext from "../Context/CartContext";
import SizeForm from "../../SizeForm";
import SizeList from "../../SizeList";

function OrderItem(props) {
  const [isValue, setIsValue] = useState([]);

  const ctx = useContext(CartContext);
  const orderlist = [...ctx.orderList];

  const updateQuantity = (e) => {
    orderlist.forEach((item, i) => {
      if (item.id === props.id) {
        item.quantity = parseInt(e.target.value);
      }
    });
    ctx.setOrderList(orderlist);
  };

  const removeOrder = () => {
    orderlist.forEach((item, i) => {
      if (item.id === props.id) {
        orderlist.splice(i, 1);
      }
    });
    ctx.setOrderList(orderlist);
  };
  const totalprice = props.quantity * props.price;

  const sizeHandler = (uSize) => {
    setIsValue((pre) => {
      return [{ size: uSize }];
    });
  };

  return (
    <Row className="my-3">
      <Col xs={3}>
        <Image src={props.imageSrc} fluid />
      </Col>
      <Col xs={9}>
        <h5>{props.title}</h5>
        <p className="my-1">{`${props.price} X ${props.quantity} = Rs. ${totalprice}`}</p>
        <div className="d-flex align-items-center my-2">
          <input
            type="number"
            min="1"
            className="form-control me-2"
            value={props.quantity}
            onChange={updateQuantity}
          />

          <SizeForm onSet={sizeHandler} />

          <SizeList onList={isValue} />

          <Button variant="outline-danger" onClick={removeOrder}>
            Remove
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default OrderItem;
