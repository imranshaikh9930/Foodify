const mongoose = require("mongoose");

 const connectDb = async()=>{ 
            try {
                await mongoose.connect("mongodb+srv://imran:Imran9930@cluster0.2kx5c2t.mongodb.net/Foodify")
                console.log("Mongodb Connected");
                
            } catch (error) {
                console.log(error.message);
            }
        

}

module.exports =  connectDb;