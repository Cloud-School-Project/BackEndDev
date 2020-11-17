const express = require('express');
const {
  findClasses,
  addClass,
  updateClass,
  deleteClass,
  findStudentById,
  findVolunteerById,
  findAdminById
  }
  = require ('./main-model')

const bcryptjs = require('bcryptjs');
const {restricted,isValid} = require('./middle-ware')

const router = express.Router();


router.get('/class',(req,res) =>{
  findClasses()
  .then(classes => {
    res.status(200).json(classes);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Classes", message:err.message });
  });

})
router.put("/class",validClass, (req, res) => {
  const update = req.body;
  updateClass(update)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new task" });
    });
});

router.post("/class", validClass, (req, res) => {
    const course = req.body
    addClass(course)
      .then(result => {
          console.log(result)
        res.status(201).json(result);
      })
      .catch(err => {
          console.log(err)
        res.status(500).json({ message: "Failed to create new task" });
      });
  });


//Middle for classes

function validClass(req,res,next) {
    if(Boolean(req.body.subject)){
        if(req.body.subject.length<3 ){
            res.status(500).json({ message: "Please provide a full class name" })
        }
        else
        {
            next() 
        }
    }
    else{
        res.status(500).json({ message: "Class seems to be missing subject" });
    }
  }


module.exports = router;