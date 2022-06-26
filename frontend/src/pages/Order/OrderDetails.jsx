import React, { Fragment } from "react";
import "./orderDetails.css";
import { Typography } from "@material-ui/core";
import OrderItems from "./OrderItems";
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

const OrderDetails = ({ order, name }) => {
  return (
    <Fragment>
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography>Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>
                {order.shippingInfo && order.shippingInfo.phoneNo}
              </span>
            </div>
            <div>
              <p>Address:</p>
              <span>
                {order.shippingInfo &&
                  `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
              </span>
            </div>
          </div>
        </div>

        <div className="orderDetailsCartItems">
          <Typography>Order Items:</Typography>
          <div className="orderDetailsCartItemsContainer">
            {order.orderItems &&
              order.orderItems.map((item, i) => (
                <OrderItems key={i} item={item} />
              ))}
          </div>
        </div>
        {
          order.orderStatus && order.orderStatus !== "Canceled" &&
          <Button
            variant="outlined"
            style={{
              color: "black",
              border: "1px solid black",
              margin: 10,
              float: 'right'
            }}
            startIcon={<CancelIcon />}
          >
            Cancel Order
          </Button>
        }
      </div>
    </Fragment>
  )
}

export default OrderDetails;
