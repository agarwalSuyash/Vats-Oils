import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../../components/MetaData";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styled from "styled-components"
import CircleIcon from '@mui/icons-material/Circle';
import OrderDetails from "./OrderDetails";

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

const Order = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const OrderID = styled.span`
font-size: 30px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;


const OrderAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const OrderPrice = styled.div`
  font-size: 30px;
  font-weight: 400;
`;

const OrderStatus = styled.div`
  font-size: 30px;
  color: ${(props) => props.cl};
  font-weight: 400;
`;


const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment >
          <Navbar />
          <Wrapper>
            <Title>Your Orders</Title>
            <Top>
              <TopButton onClick={() => navigate("/products")}>
                CONTINUE SHOPPING
              </TopButton>
            </Top>
            <Bottom>
              <Info>
                {orders &&
                  orders.map((item) => (
                    <Fragment key={item._id}>
                      <Order>
                        <Details>
                          <OrderID>
                            <b>ORDER ID: </b> {item._id}
                          </OrderID>
                        </Details>
                        <PriceDetail>
                          <OrderAmount>Total Products: {item.orderItems.length}</OrderAmount>
                          <OrderPrice>{`Total Price: ₹${item.totalPrice}`}</OrderPrice>
                          <OrderStatus cl={item.orderStatus === "Delivered" ? "green" : "red"}><CircleIcon />  {item.orderStatus}</OrderStatus>
                        </PriceDetail>
                      </Order>
                      <OrderDetails id={item._id} />
                    </Fragment>
                  ))}
              </Info>
            </Bottom>
          </Wrapper>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrders;
