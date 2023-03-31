const app = require('./app');
const dotenv = require('dotenv');
const connect_with_mongodb = require('./config/database')

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
  


//--------config dotenv-----//
dotenv.config({path:'back/config/config.env'});

//----- call mongodb connection function------//
connect_with_mongodb();






app.listen(process.env.PORT,(req,res,next) =>{
    console.log(`Server is working port on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
  














































































































































































































// ==========================

//========= sensivity----- 24==============
//========= red dot --------full================
//========== x---- 1.50 y------ 2.04===============//













///////////////////=====================









