import React, { Fragment } from "react";
import Button from '@mui/material/Button';
import styled from 'styled-components'

const Image = styled.img`
  width: 200px;
  margin: 10px 0 0 10px;
  border-radius: 10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;


const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <Fragment>
      <Image src={item.image} alt="Cart Item" />
      <Details>
        <ProductName ><b>Product:</b> {item.name}</ProductName>
        <ProductId>
          <b>ID:</b> {item.product}
        </ProductId>
        <ProductColor color="black" />
        <ProductSize>
          <b>Size:</b> 37.5
        </ProductSize>
        <Button style={{ alignItems: "start", width: "1px" }} variant="text" onClick={() => deleteCartItems(item.product)}>Remove</Button>
      </Details>
    </Fragment>
  );
};

export default CartItemCard;
