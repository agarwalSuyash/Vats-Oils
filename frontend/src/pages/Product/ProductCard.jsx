import React from "react";
import { NavLink } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { ShoppingCartOutlined } from "@material-ui/icons"
import "./ProductCard.css"
import { useSelector } from "react-redux";

const ProductCard = () => {
    const {
        products,
    } = useSelector((state) => state.products);

    const options = {
        value: products.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div id="productCard">
            {products &&
                products.map((product) => (
                    <NavLink key={product._id} className="pro" to={`/product/${product._id}`}>
                        <img src={product.images[0].url} alt={product.name} />
                        <div className="des">
                            <h5>{product.name}</h5>
                            <Rating {...options} className="rating" />{" "}
                            <h4>{`₹${product.price}`}</h4>
                        </div>
                        <ShoppingCartOutlined className="cart" />
                    </NavLink>
                ))
            }
        </div >
    );
};

export default ProductCard;
