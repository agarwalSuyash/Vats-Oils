import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Item = styled.div`
  a {
    color: #575757;
    margin: 0 2vmax;
    text-decoration: none;
  }
  span{
    margin-left: auto;
  }
`;
const Image = styled.img`
  width: 10vmax;
  margin: 0;
`;

const OrderItems = ({ item }) => {
  return (
    <Item key={item.product}>
      <Link to={`/product/${item.product}`}>
        <Image src={item.image} alt="Product" />
      </Link>
      <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
      <span>
        {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
      </span>
    </Item>
  );
};

export default OrderItems;
