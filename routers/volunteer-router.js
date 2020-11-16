const express = require('express');
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
const {makeToken,restricted,isValid} = require('./middle-ware')

const router = express.Router();

router.post('/register', async (req, res)=>{
  const credentials = req.body //used to get data from the post request

  if(isValid(credentials)){
      const hash = bcryptjs.hashSync(credentials.password, 8) // sets how many times the pass is hashed
      credentials.password = hash;
      addVolunteer(credentials)
      .then(user => {
          res.status(201).json({data: user[0]})
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
      console.log("made it past valid checker")
      findVolunteerById(username)
        .then(([user]) => {
          console.log("this is the return from find by id", user)
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


router.get('/classes',(req,res) =>{
  findClasses()
  .then(classes => {
    res.status(200).json(classes);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Classes", message:err.message });
  });

})

// router.get('/:id',(req,res) =>{
//   (req.params.id)
//   .then(Helper => {
//     res.status(200).json(Helper);
//   })
//   .catch(err => {
//     res.status(500).json({ message: "Failed to get Helper", message:err.message });
//   });
// })


router.put("/class", (req, res) => {
  const update = req.body;
  updateClass(update)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new task" });
    });
});
module.exports = router;