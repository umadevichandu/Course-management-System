const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentmarksSchema = new Schema
({
 m1:{
   type: Number,
   required: true
  },
  m2:{
    type:Number,
    required:true
  },
 m3:{
    type: Number,
    required: true
     },
   m4:{
        type:Number,
        required:true
     },
    m5:{
        type: Number,
        required: true
         },
     m6:{
            type:Number,
            required:true
         },
         //total,avg,grade,percent,stu_no,stu_name,mobile,addr)
         total:{
            type:Number,
         },
         avg:{
            type:Number
         }, 
         grade:{
            type:String,
         },       
         percent:{
            type:Number
         },   
         stu_no:{
            type:String,
            required:true
         },  
         stu_name:{
            type:String,
            required:true
         },  
         mobile:{
            type:Number,
            required:true
         }, 
         addr:{
            type:String,
            required:true
         }
});
module.exports = mongoose.model('marks', studentmarksSchema);
