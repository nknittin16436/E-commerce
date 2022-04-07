import React, { Fragment,useEffect,useState } from 'react'
import './Products.css'
import { getProducts ,clearErrors} from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import ProductCard from '../Home/ProductCard'
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';



const Products = () => {

    const dispatch = useDispatch();
    const alert=useAlert();

  const { loading, error, products, productsCount,resultPerPage } = useSelector((state) => state.products);

 const [currentPage, setCurrentPage] = useState(1);


 const setCurrentPageNo=(e)=>{
   setCurrentPage(e);
 }
  const keyword=useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
     
    dispatch(getProducts(keyword.keyword,currentPage));

  }, [dispatch, error, alert,keyword.keyword,currentPage]);
  return (
    <Fragment>
        {loading ? (<Loader/>) : (
            <Fragment>
           <h2 className="productsHeading">Products</h2>
           <div className="products">
               {products && products.map((product)=>
                   <ProductCard key={product._id} product={product}/>
               )}
           </div>


           <div className='paginationBox'>

             {resultPerPage < productsCount&&

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
      }
      </div>
                </Fragment>
        )}
    </Fragment>
  )
}

export default Products