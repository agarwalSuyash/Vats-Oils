import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../../components/Loader/Loader";
import ProductCard from "./ProductCard";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import MetaData from "../../components/MetaData";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import Select from "react-select";

const categories = [
  { label: "All", value: "" },
  { label: "Yellow Mustard", value: "Yellow Mustard" },
  { label: "Black Mustard", value: "Black Mustard" },
  { label: "Flax", value: "Flax" },
  { label: "Sesame", value: "Sesame" },
  { label: "Peanuts", value: "Peanuts" },
  { label: "Almond", value: "Almond" },
  { label: "Coconut", value: "Coconut" },
  { label: "Kalonji", value: "Kalonji" },
];

const Title = styled.h1`
  margin-top: 3%;
  text-align: center;
`;

const Filter = styled.div`
  margin-top: 1%;
  margin-left: 5%;
  display: flex;
  align-items: center;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const customTheme = (theme) => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary25: '#70dfd7',
      primary: '#05c2b5'
    }
  }
}
const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "20%",
    textAlign: "center"
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    padding: 20,
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: "10px",
  }),
  menuList: (base) => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1"
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888"
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings] = useState(0);
  const [value, setValue] = useState({ label: "All", value: "" });

  const {
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const handleChange = (e) => {
    setCategory(e.value);
    setValue(e)
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Navbar />
          <MetaData title="PRODUCTS -- Vats Oils" />
          <section id="page-header">
            <h2>#stayhome</h2>
            <p>Free and Fast Delivery</p>
          </section>
          <Title>Products</Title>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select
              styles={customStyles}
              theme={customTheme}
              options={categories}
              value={value}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Filter>

          <section className="item-section">
            <div className="products">
              <ProductCard />
            </div>
          </section>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
