import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility
  const navigate = useNavigate();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() === cat.toLowerCase()
      )
    );
    setIsSidebarOpen(false); // Close sidebar after selecting a category
  };

  const filterbyPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
    setIsSidebarOpen(false); // Close sidebar after selecting a price filter
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm(" ");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>Local Mart</h3>
          </Link>
          
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>{" "}
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
         
          <div className="right">
            <span className="material-symbols-outlined" onClick={toggleSidebar}>
              menu {/* Icon for opening the sidebar */}
            </span>
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>

                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <h4>Categories</h4>
          <div className="items" onClick={() => setFilteredData(products)}>
            All Products
          </div>
          <div className="items" onClick={() => filterbyCategory("jewelry")}>
            Jewelry
          </div>
          <div className="items" onClick={() => filterbyCategory("clothing")}>
            Clothing
          </div>
          <div className="items" onClick={() => filterbyCategory("artwork")}>
            Artwork
          </div>
          <div className="items" onClick={() => filterbyCategory("furniture")}>
            Furniture
          </div>
          <h4>Filter by Price</h4>
          <div className="items" onClick={() => filterbyPrice(1000)}>
            1000+
          </div>
          <div className="items" onClick={() => filterbyPrice(5000)}>
            5000+
          </div>
          <div className="items" onClick={() => filterbyPrice(10000)}>
            10000+
          </div>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div className="overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Navbar;
