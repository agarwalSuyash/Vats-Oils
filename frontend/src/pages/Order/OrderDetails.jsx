import React, { Fragment, useEffect, useState } from "react";
import "./orderDetails.css";
import { Typography } from "@material-ui/core";
import OrderItems from "./OrderItems";
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateOrder } from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { useAlert } from "react-alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const OrderDetails = ({ order, name }) => {
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [click, setClick] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleClick = () => {
    setClick(true);
    setOpen(false);
    const myForm = new FormData();

    myForm.set("status", "Cancelled");

    dispatch(updateOrder(order._id, myForm));
  };

  useEffect(() => {
    if (click) {
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
      if (isUpdated) {
        alert.success("Order Updated Successfully");
        dispatch({ type: UPDATE_ORDER_RESET });
      }
      window.location.reload(false);
    }
  }, [click, dispatch, alert, isUpdated, updateError]);


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
          order.orderStatus && (order.orderStatus === "Shipped" || order.orderStatus === "Processing") &&
          <Button
            style={{
              color: "black",
              margin: 10,
              float: 'right'
            }}
            type="submit"
            startIcon={<CancelIcon />}
            onClick={handleOpen}
          >
            Cancel Order
          </Button>
        }
        <Dialog
          open={open}
          onClose={handleOpen}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Cancel Order"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to <b>cancel</b> your order?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOpen}>No</Button>
            <Button onClick={handleClick} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  )
}

export default OrderDetails;
