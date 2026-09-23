// import studentModel from "@/modal/student.model"
// import { NextResponse as res, NextRequest as req} from "next/server"

// import mongoose from "mongoose";
// mongoose.connect(process.env.DB)

// export const PUT = async (req,{params})=>{
//     try{
//        const {id }= await params
//        const body = await req.json();
//        const user = await studentModel.findByIdAndUpdate(id,body,{new:true})

//        if(!user)
//         return res.json({message:"user not found"},{status:404})

//         return res.json(user)
//     }
//     catch(err){
//         return res.json({message:err.message}, {status:500})
//     }
// }

// export const DELETE = async (req,{params})=>{
//     try{
//        const {id }= await params
//        const user = await studentModel.findByIdAndDelete(id)

//        if(!user)
//         return res.json({message:"user not found"},{status:404})

//         return res.json(user)
//     }
//     catch(err){
//         return res.json({message:err.message}, {status:500})
//     }
// }

import studentModel from "@/modal/student.model"
import { NextRequest as req, NextResponse as res } from "next/server"

export const PUT = async(req,{params})=>{
    try{
      const {id} = await params

      const body = await req.json()

      const user = await studentModel.findByIdAndUpdate(id,body,{new:true})
      if(!user){
        return res.json({message:"invalid user"},{status:404})
      }

      return res.json({message:"Student data edited Successfully",user})

    }
    catch(err){
        return res.json({message:err.message}, {status: 500 })
    }

}


export const DELETE = async(req,{params})=>{
    try{
     const {id} = await params
     const student = await studentModel.findByIdAndDelete(id)
     if(!student){
        return res.json({message:"student not found"},{status:404})
     }
     return res.json({message:"student data deleted successfully",student})
    }
    catch(err){
      return res.json({message:err.message},{status:500})
    }
}


