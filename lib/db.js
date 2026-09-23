
// import mongoose from "mongoose";
// mongoose.connect(process.env.DB)
// .then(()=>console.log("db connected"))
// .catch(()=>console.log("db not connected"))


import mongoose from "mongoose";


export const dbConnect =()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log('db connected successfully')
    })
    .catch(()=>{
        console.log("failed to connect with db")
    })
    
}