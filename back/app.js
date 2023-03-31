const  express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



//----------- import all middlewares-------//
const error = require('./middlewares/error')
//---------- use express cors -------------//
app.use(cors({origin: true, credentials: true}));
//---------- use express json --------/
app.use(express.json());



//****** 7 *******/
//---------- cookie parser and body-parser will be here-----//
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


// ---------- import all routes--------//
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')

//--------- all routes will be here------//
app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order)





//--------- all middlewares will be here-------//
app.use(error)




module.exports = app;













































//******************************************* */
//auth.JSX
//logout function controllers
//authorize role
//insert user value
//getiig password reset token user model
//forgot password method user controller 
//create sendEmaiil function 
//reset password controller user

//********************************************* */

