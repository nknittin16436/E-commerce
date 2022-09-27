const express=require('express');
const app=express();
const dotenv = require('dotenv');

const errorMiddleware=require('./middleware/error');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const fileUpload=require('express-fileupload');
dotenv.config({ path: 'backend/config/config.env' });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
/**************************************************Route Imports*****************************************************************************/
const product=require('./routes/productRoute');
const user=require('./routes/userRoute');
const order=require('./routes/orderRoute');
const payment=require('./routes/paymentRoute')




  //PRODUCT ROUTE
app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);



/*************************************************** MIDDLEWARE*******************************************************/

 
app.use(errorMiddleware);

 
module.exports=app;