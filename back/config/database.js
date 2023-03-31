const mongoose = require('mongoose');



function connect_with_mongodb () {
     mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true})
        .then((data) =>{
            console.log(`successfully connect database host in ${data.connection.host}`)
        })
}


module.exports = connect_with_mongodb;