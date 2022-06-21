import React, { Fragment, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/MetaData";
import { v4 as uuid } from "uuid";
import "./payment.css";
import { createOrder } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useAlert } from "react-alert";
import { removeAllItems } from "../../actions/cartAction";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const [value, setValue] = React.useState("");
  const alert = useAlert();

  function handleChange(e) {
    setValue(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (value !== orderInfo.totalPrice.toString()) {
      alert.error("Value's don't match");
    }
    else {
      payBtn.current.disabled = true;
      order.paymentInfo = {
        id: uuid(),
        status: "succeeded",
      };
      dispatch(createOrder(order));
      dispatch(removeAllItems());
      navigate("/success");
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <p>Cash On delivery</p>
          <div>
            <h3>Please enter the total amount in the box below.</h3>
            <p><CurrencyRupeeIcon /> {orderInfo && orderInfo.totalPrice}</p>
            <input
              type="number"
              name="price"
              className="num"
              value={value}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Confirm Order"
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
