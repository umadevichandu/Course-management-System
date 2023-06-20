const express = require('express');

const router = express.Router();

const student = require('../models/student')

var mongo = require("mongodb");


router.post('/createStudent', (req, res) => 
{
const userData = req.body;
const db = new student();
db.firstName = userData.firstName;
db.lastName = userData.lastName;
db.email = userData.email;
db.mobileNumber = userData.mobileNumber;
db.password = userData.password;
db.save(function (err, userFound)
{
if (err) 
{
     response = { success: false, msg: err };
     res.json(response);
 } 
 else
  {
    response = { success: true, msg: "successfully student regiseter" };
    res.json(response);
}})
});


router.get('/getStudents',(req, res) => {
const db = student;
 db.find({},
function (err, userDetails) {
if (err) {
response = { success: false, status: "fail" };
 res.json(response);
 } else {
if (userDetails && userDetails.length > 0) {
  res.send({ success: true, data: userDetails });
 } else {
  res.send({ success: false, msg: "Student details not found" });
 }
  }
  })});

  router.delete("/deleteAllStudents", (req, res) =>
  {
    const db = student;
    db.deleteMany({}, function (err, userDetails) 
    {
      if (err)
      {
        response = { success: false, status: "fail" };
        res.json(response);
      } 
      else 
      {
        res.json({ success: true, msg: "Student details deleted successfully" });
      }
    });
  });
  router.delete("/deleteByID/:id", (req, res) =>
  {
    const db = student;
    const stu_id=req.params.id
    db.deleteOne({_id:stu_id}, function (err, userDetails) 
    {
      if (err)
      {
        response = { success: false, status: "fail  " };
        res.json(response+stu_id);
      } 
      else 
      {
        res.json({ success: true, msg: "Student details deleted successfully" +stu_id});
      }
    });
  });
  


  router.put('/updateStudent', (req, res) => {
   const studentDetails = req.body// storing the data into obj
   const id= studentDetails.id;// capturing id from studentDetails obj
   const db = student; // DB model
   const update_data = { $set: {} };// create empty obj to store the data
   //syntax: obj.$set["column_name"]= <value>
   update_data.$set["firstName"] = studentDetails.firstName;
   update_data.$set["lastName"] = studentDetails.lastName;
   update_data.$set["country"] = studentDetails.country;
   update_data.$set["mobileNumber"] = studentDetails.mobileNumber;
   update_data.$set["email"] = studentDetails.email;
   // console.log("studentDetails::",studentDetails);
   db.aggregate([{
          $match: { "_id": new  mongo.ObjectId(id) }
         },],
   function (err, data) {
    if (err) {
    response = { success: false, status: "fail" };
    res.json(response);
    } else {
    // console.log("data::",data);
    if (data && data.length > 0) {
    // syntax: dbObj.updateOne({},update_obj,function(err){})
     db.updateOne({ "_id": new mongo.ObjectId(id) }, update_data, function (err) {
    if (err) {
    response = { success: false, msg: err };
    } else {
     response = { success: true, msg: "Student updated successfully" };
    }
     res.json(response);
     });
    } else {
     res.send({ success: false, msg: "Student id not found" });
     }}});  
    });


  router.get('/getStudentById/:id',(req, res) => {
    const id=req.params.id;
    const db = student;
    db.find({"_id":id},
    function (err, userDetails) {
    if (err) {
    response = { success: false, status: "fail" };
     res.json(response);
    } else {
    if (userDetails && userDetails.length > 0) {
     res.send({ success: true, data: userDetails });
     } else {
     res.send({ success: false, msg: "Student details not found" });
     }}}
    );
    })
 
module.exports = router

