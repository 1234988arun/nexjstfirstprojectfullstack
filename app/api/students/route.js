// import studentModel from "@/modal/student.model"
// import { NextResponse as res, NextRequest as req} from "next/server"


// import mongoose from "mongoose";
// mongoose.connect(process.env.DB)


// export const GET = async()=>{
//     try{
//         const user = await studentModel.find()
//         if(!user)
//         return res.json({message:"data not found"},{status:404})   
//         return res.json(user)
//     }
//     catch(err){
//         return res.json({message:err.message}, {status:500})
//     }
// }


// export const POST = async(req)=>{
//     try{
//     const body = await req.json()
//     const user = await  studentModel.create(body)
 
//     return res.json(user);   
//     }
//     catch(err){
//         return res.json({message:err.message}, {status:500})
//     }
// }



import { dbConnect } from "@/lib/db"
import studentModel from "@/modal/student.model"
import { NextRequest as req, NextResponse as res } from "next/server"

export const POST = async(req)=>{
    try{
      await dbConnect()

     const body = await req.json()

     const student = await studentModel.create(body)

     return res.json({message:"Student filled added successfully", student},{status:201})

    }

    catch(err){
     console.log(err.message)
    }
}


export const GET = async(req)=>{
    try{
      await dbConnect()
      const user = await studentModel.find()
      if(user.length === 0){
        return res.json({messge:"data not found"},{status:404})
      }

      return res.json(user)
    }
    catch(err){
        console.log(err.message)
        return res.json(
    { message: "Internal server error" },
    { status: 500 }
    )
    }
}





























