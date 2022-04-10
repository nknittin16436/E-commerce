import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { getProducts, clearErrors } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";



const categories=[
  "Laptop",
  "Footwear",
  "acessories",
  "Electronics",
  "Clothing",
  "Camera",
  "Smartphones",
];

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, products, productsCount, resultPerPage ,filteredProductsCount} =
    useSelector((state) => state.products);
 

    let count=filteredProductsCount;
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler=(event,newPrice)=>{
            setPrice(newPrice);
  }

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const keyword = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword.keyword, currentPage,price,category,ratings));
  }, [dispatch, error, alert, keyword.keyword, currentPage,price,category,ratings]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS-ECOMMERCE"/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {/* PRICE FILTER */}

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                  {categories.map((category)=>(
                    <li
                    
                     className="category-link"
                     key={category}
                     onClick={()=>setCategory(category)}
                
                    >
                      {category}
                    </li>
                  ))}
              </ul>

              <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {/* BOTTOM BAR TO GO TO NEXT AND PREV PAGE */}
          {resultPerPage < count  && (
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
