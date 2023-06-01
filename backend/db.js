const mongoose= require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/CanvasDB";

const connectToMongo=async()=>{
   try{
    mongoose.connect(mongoURI);
    console.log("connected to mongoDB")
   } 
   catch(error){
    console.log("error occured");
   }
}

module.exports=connectToMongo;