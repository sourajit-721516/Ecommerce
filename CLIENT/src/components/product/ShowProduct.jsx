import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import "./ShowProduct.css"; // Ensure you have this CSS file for custom styles

const ShowProduct = () => {
  const { filteredData, addToCart } = useContext(AppContext);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row my-5">
        {filteredData?.map((product) => (
          <div
            key={product._id}
            className="col-md-3 d-flex justify-content-center align-items-center my-3"
          >
            <div className="card product-card">
              <Link to={`/product/${product._id}`} className="product-image-container">
                <img
                  src={product.imgSrc}
                  className="card-img-top product-image"
                  alt={product.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <div className="product-price-container">
                  <span className="product-price">{product.price} ₹</span>
                </div>
                <button
                  className="btn btn-primary add-to-cart-btn"
                  onClick={() =>
                    addToCart(
                      product._id,
                      product.title,
                      product.price,
                      1,
                      product.imgSrc
                    )
                  }
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
