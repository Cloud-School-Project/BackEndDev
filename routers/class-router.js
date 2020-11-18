const express = require('express');
const {
  findClasses,
  addClass,
  updateClass,
  deleteClass,
  findStudentById,
  findVolunteerById,
  findAdminById,
  findClassBySubject
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
router.put("/class",validClass,classUpdateCheck, (req, res) => {
  const changes = req.body;
  updateClass(changes)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update class", err });
    });
});

router.delete("/class",validClass, async (req, res) => {
    const newId = await findClassBySubject(req.body.subject)
    const needToDelete = req.body;
    deleteClass(newId)
      .then(result => {
        console.log("result = ", result)
        res.status(201).json(`${needToDelete.subject} class removed`);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to delete class, might not exist", err });
      });
  });

router.post("/class", validClass, (req, res) => {
    const course = req.body
    addClass(course)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new task" });
      });
  });


//Middle for classes
async function classUpdateCheck (req,res,next){
    if(Boolean(req.body.morning || req.body.afternoon || req.body.evening)){
      // Need to add a checker for if class doesnt exisit.
        next()
    }
    else
    {
        res.status(500).json({ message: "Need to have a Volunteer id to pass to time slot" });
    }
  }  



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