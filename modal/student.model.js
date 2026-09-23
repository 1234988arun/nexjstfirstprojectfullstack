// import {Schema,model,models} from "mongoose"

// const studentSchema = new Schema({
// fullname:{
//     type:String,
//     required:true,
//     lowercase:true,
//     trim:true
// },
// class:{
//     type:String,
//     required:true,
//     lowercase:true,
//     trim:true
// },
// roll:{
//     type:Number,
//     required:true,
//     trim:true
// }
// },{timestamps:true})

// const studentModel =  models.studentsnextjs || model("studentsnextjs", studentSchema);

// export default studentModel





import {Schema,models,model} from "mongoose"



const studentSchema = new Schema({
    fullname:{
            type:String,
            required:true,
            lowerCaste:true,
            trim:true
     },
     class:{
        type:Number,
        required:true,
        lowerCaste:true,
        trim:true
     },
     roll:{
        type:Number,
        required:true,
        trim:true
     }
},{timestamps:true})

const studentModel = models.studentnextjs2 || model("studentnextjs2", studentSchema)
export default studentModel