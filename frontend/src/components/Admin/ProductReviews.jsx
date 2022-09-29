import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import SideBar from "./Sidebar.jsx";
import Metadata from "../layout/MetaData";
import "./ProductReviews.css";
import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import StartIcon from "@mui/icons-material/Star";
import { Button } from "@material-ui/core";
import { clearErrors, getAllReviews, deleteReview } from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstant.js";
const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [productId, setProductId] = useState("");

  const { error, reviews, loading } = useSelector((state) => state.productReviews);
  const { error: deleteError, isDeleted } = useSelector((state) => state.review);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(productId, id));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review Deleted Succesfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
    // dispatch(getAllReviews());
  }, [dispatch, deleteError, error, isDeleted, alert]);


  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.4 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 0.6,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.2,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        comment: review.comment,
        rating: review.rating,
        name: review.name,
      });
    });



  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  }
  return (
    <Fragment>
      <Metadata title="All REVIEWS - Admin" />
      <div className="dashboard">
        <SideBar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            encType="multipart/form-data"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <StartIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false || productId === "" ? true : false}
            >
              Get Reviews
            </Button>
          </form>
          {reviews && reviews.length > 0 ? <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            pageSize={10}
            autoHeight
            className="productListTable"
          /> :
            <h1 className="productReviewsFormHeading">No Reviews</h1>
          }
        </div>
      </div>
    </Fragment>
  );
};



export default ProductReviews;
