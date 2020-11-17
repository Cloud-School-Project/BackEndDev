const express = require('express');
const Helper = require ('./main-model')

const {addStudent,
    addVolunteer,
    findClasses,
    addClass,
    updateClass,
    deleteClass,
    findStudentById,
    findVolunteerById,
    findAdminById,
    getLoggedOutList,
    addLoggedOut,}
    = require ('./main-model')

    const bcryptjs = require('bcryptjs');
const {makeToken,restricted,isValid,checkStudent} = require('./middle-ware')

const router = express.Router();

router.post('/register', checkStudent, async (req, res)=>{
    const credentials = req.body //used to get data from the post request
  
    if(isValid(credentials)){
        const hash = bcryptjs.hashSync(credentials.password, 8) // sets how many times the pass is hashed
        credentials.password = hash;
        addStudent(credentials)
        .then(user => {
            res.status(201).json({data:user[0]})
        })
    }
    else {
        res.status(400).json({
            message: "please provide username and password and the password should be alphanumeric",
        });
    }
 })
  
  router.post('/login', (req, res)=>{
      const {username, password} = req.body
      if(isValid(req.body)){
        findStudentById(username)
          .then(([user]) => {
              if (user && bcryptjs.compareSync(password, user.password)){
                  const token = makeToken(user) // makes the token
                  res.status(200).json({message: "Welcome Friendo", token})
              } 
              else
              {
                  res.status(401).json({message: "Invalid creds!"})
              }
          })
          .catch(error => {
              res.status(500).json({ message: error.message });
            });
      }
      else
      {
          res.status(400).json({
              message:"Please provide valid shit!"
          })
      }
  })


module.exports = router;