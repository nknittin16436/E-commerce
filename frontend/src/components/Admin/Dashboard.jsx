import React from "react";
import SideBar from "./Sidebar.jsx";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut,Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);



const Dashboard = () => {
   const linestate = {
    labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "Total Amount",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197,72,49)"],
          data: [0, 4000],
        },
      ],
  };

   const doughnutstate = {
    labels: ["Out Of Stock", "In Stock"],
      datasets: [
        {
          backgroundColor: ["#00A684","#6800B4"],
          hoverBackgroundColor: ["#4B5000","#35014F"],
          data: [2, 10],
        },
      ],
  };

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br />
              ₹200
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>50</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>30</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>20</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={linestate} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutstate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
