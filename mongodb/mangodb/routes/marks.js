const express = require('express');
const router = express.Router();
const studentmarks = require('../models/marks')
var mongo = require("mongodb");


router.post('/createStudentmarks', (req, res) => 
{
const userData = req.body;
const db = new studentmarks();
//total,avg,grade,percent,stu_no,stu_name,mobile,addr)

db.m1 = userData.m1;
db.m2 = userData.m2;
db.m3 = userData.m3;
db.m4 = userData.m4;
db.m5 = userData.m5;
db.m6 = userData.m6;
db.grade=userData.grade;
db.stu_no=userData.stu_no;
db.stu_name=userData.stu_name;
db.mobile=userData.mobile;
db.addr=userData.addr;

// db.total= (userData.m6 +userData.m5+userData.m4+userData.m3+userData.m2+userData.m1);
let grade="";
let percentage=0;
let avg=0;
let total_marks=0;

total_marks=(userData.m6 +userData.m5+userData.m4+userData.m3+userData.m2+userData.m1);
avg= total_marks/6;
percentage= (total_marks/600)*100;

//find the grade
if (avg >= 90) {
  grade = "A";
 } else if (avg >= 80) {
  grade = "B";
  } else if (avg >= 70) {
  grade = "C";
   } else if (avg >= 60) {
  grade = "D";
   } else if (avg >= 50) {
  grade = "E";
   } else {
  grade = "F";
   }
db.total=total_marks;
db.avg=avg;
db.percent=percentage;
db.grade=grade;

db.save(function (err, userFound)
{
if (err) 
{
     response = { success: false, msg: err };
     res.json(response);
 } 
 else
  {
    response = { success: true, msg: "successfully student marks  regiseter" };
    res.json(response);
}})
});

router.get('/getStudentsMarks',(req, res) => {
  const db = studentmarks;
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



    
   
    router.put('/updateStudent', (req, res) => {
      const studentDetails = req.body
      const id= studentDetails.id;
      const db = studentmarks; 
      const update_data = { $set: {} };
      update_data.$set["stu_name"] = studentDetails.stu_name;
      update_data.$set["stu_no"] = studentDetails.stu_no;
      update_data.$set["grade"] = studentDetails.grade;
      update_data.$set["mobile"] = studentDetails.mobile;
      update_data.$set["addr"] = studentDetails.addr;
      console.log(id);
      db.aggregate([{
             $match: { "_id":new mongo.ObjectId(id) }
            },],
      function (err, data) {
       if (err) {
       response = { success: false, status: "fail" };
       res.json(response);
       } else {
       if (data && data.length > 0) {
        db.updateOne({ "_id":new mongo.ObjectId(id) }, update_data, function (err) {
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


    router.get('/getStudentMarksById/:id',(req, res) => {
      const id=req.params.id;
      const db = studentmarks;

      db.find({"_id":id},
      function (err, userDetails) {
      if (err) {
      response = { success: false, status: "fail" };
       res.json(response);
      } else {
      if (userDetails && userDetails.length > 0) {
       res.send({ success: true, data: userDetails });
       } else {
       res.send({ success: false, msg: "Student  marks details not found" });
       }}}
      );
      });

      router.delete("/deleteByID/:id", (req, res) =>
      {
        const db = studentmarks;
        const stu_id=req.params.id
        db.deleteOne( {_id:stu_id}, function (error, userDetails) 
        {
          if (error)
          {
            response = { success: false, status: "fail" };
            res.json(response+stu_id);
          } 
          else 
          {
            res.json({ success: true, msg: "Student details deleted successfully" +stu_id});
          }
        });
      });


module.exports = router;