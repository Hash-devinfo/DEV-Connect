// import mongoose from "mongoose";


// export const connectDB= async () =>{
//     await mongoose.connect('mongodb+srv://hashdevinfo_db_user:2VT2d00iU1I0H9Do@cluster0.66kimpu.mongodb.net/devconnect')
//     .then(()=>{
//         console.log("MongoDB Connected")
//     }) 
// } 


import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected")
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`)
    process.exit(1)
  }
}