import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg"
import MetaData from "../layout/MetaData";
import './Home.css'
import ProductCard from './ProductCard.js'
import { getProducts ,clearErrors} from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
 
const Home = () => {

  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }


    dispatch(getProducts());

  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (<Loader />) : (<Fragment>
        <MetaData title={"E-Commerce"} />
        <div className="banner">
          <p>Welcome to Ecommerce</p>
          <h1>Find Amazing Products Below</h1>

          <a href="#container">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
          {products && products.map(product =>
            <ProductCard key={product._id} product={product} />
          )}
        </div>
      </Fragment>)}

    </Fragment>
  );
};

export default Home;
