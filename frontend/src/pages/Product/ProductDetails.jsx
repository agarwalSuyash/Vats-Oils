import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../../components/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../../components/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import ImageContainer from "./ImageContainer"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styled from 'styled-components'
import { Add, Remove } from "@material-ui/icons";
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Wrapper = styled.div`
  padding: 50px 25px;
  display: flex;
`;

const ImgContain = styled.div`
display: flex;
align-items: start;
  flex: 1;
`;


const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 0px 0 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Review = styled.span`
  font: 200 0.8vmax cursive;
  color: rgba(0, 0, 0, 0.699);
  font-size: 1.2em;
`

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;


const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [source, setSource] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const handleClick = (e) => {
    setSource(e.target.src);
  }


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Navbar />
          <MetaData title={`${product.name} -- Vats Oils`} />
          <Wrapper>
            <ImgContain>
              <ImageContainer product={product} ClickHandler={handleClick} />
              {product.images && <img src={source ? source : product.images[0].url} alt="Product" id="MainImg" />}
            </ImgContain>
            <InfoContainer>
              <Title>{product.name}</Title>
              <Rating {...options} />
              <Review>
                {" "}
                ({product.numOfReviews} Reviews)
              </Review>
              <br /><br /><br /><br />
              <Desc>
                {product.description}
              </Desc>
              <br /><br /><br />
              <Price>{`₹${product.price}`}</Price>
              <br /><br /><br />
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={decreaseQuantity} style={{ cursor: "pointer" }} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={increaseQuantity} style={{ cursor: "pointer" }} />
                </AmountContainer>
                <Button variant="outlined" startIcon={<ShoppingCartIcon />} size="large" disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}>ADD TO CART</Button>
              </AddContainer>
              <br /><br /><br />
              <AddContainer>Drop a Review: <Button variant="outlined" startIcon={<RateReviewIcon />} size="large" onClick={submitReviewToggle}>
                Submit Review
              </Button></AddContainer>

            </InfoContainer>
          </Wrapper>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
