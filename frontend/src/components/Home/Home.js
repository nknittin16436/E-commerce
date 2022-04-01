import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg"
import MetaData from "../layout/MetaData";
import './Home.css'
import Product from './Product.js'
import { getProducts } from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";





// const product = {
//   name: "Tshirt",
//   price: "₹1200",
//   _id: "nand kumar",
//   images: [{ url: 'https://m.media-amazon.com/images/I/41mAGkjKNCL.jpg' }]

// }
const Home = () => {

  const alert=useAlert();

  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector((state) => state.products);
  useEffect(() => {
   if(error){
     return alert.error(error);
   }


    dispatch(getProducts());

  }, [dispatch,error,alert]);
  return (
   <Fragment>
   {loading?(<Loader/>) : ( <Fragment>
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
        {/* <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/> */}

        {products && products.map(product =>
          <Product key={product._id} product={product} />
        )}
      </div>
    </Fragment>)}

   </Fragment>
  );
};

export default Home;
