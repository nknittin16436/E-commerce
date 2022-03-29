import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg"
import './Home.css'
import Product from  './Product.js'


const product={
  name:"Tshirt",
  price:"₹1200",
  _id:"nand kumar",
  images:[{url:'https://m.media-amazon.com/images/I/41mAGkjKNCL.jpg'}]

}
const Home = () => {
  return (
    <Fragment>
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
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        

      </div>
    </Fragment>
  );
};

export default Home;
