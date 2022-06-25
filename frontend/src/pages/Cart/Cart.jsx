import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  border-radius: 10px;
  &:hover {
    background-color: ${(props) =>
    props.type === "filled" ? "transparent" : "black"};
    color: ${(props) => (props.type === "filled" ? "black" : "white")};
    transition: 0.5s ease all;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  &:hover {
    background-color: white;
    color: black;
    transition: 0.5s ease;
  }
`;

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  const price = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <Fragment>
      <Navbar />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <Wrapper>
            <Title>YOUR CART</Title>
            <Top>
              <TopButton onClick={() => navigate("/products")}>
                CONTINUE SHOPPING
              </TopButton>
              <TopButton type="filled" onClick={checkoutHandler}>
                CHECKOUT NOW
              </TopButton>
            </Top>
            <Bottom>
              <Info>
                {cartItems &&
                  cartItems.map((item) => (
                    <Product key={item.product}>
                      <ProductDetail>
                        <CartItemCard
                          item={item}
                          deleteCartItems={deleteCartItems}
                        />
                      </ProductDetail>
                      <PriceDetail>
                        <ProductAmountContainer>
                          <Remove
                            onClick={() =>
                              decreaseQuantity(item.product, item.quantity)
                            }
                            style={{ cursor: "pointer" }}
                          />
                          <ProductAmount>{item.quantity}</ProductAmount>
                          <Add
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </ProductAmountContainer>
                        <br /><br />
                        <ProductPrice>{`₹${item.price * item.quantity
                          }`}</ProductPrice>
                      </PriceDetail>
                      <hr />
                    </Product>
                  ))}
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>₹ {price}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>₹ 60</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  {price < 500 ? (
                    <SummaryItemPrice>₹ 0</SummaryItemPrice>
                  ) : (
                    <SummaryItemPrice>₹ -60</SummaryItemPrice>
                  )}
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    ₹ {price < 500 ? price + 60 : price}
                  </SummaryItemPrice>
                </SummaryItem>
                <Button onClick={checkoutHandler}>CHECKOUT NOW</Button>
              </Summary>
            </Bottom>
          </Wrapper>
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default Cart;
