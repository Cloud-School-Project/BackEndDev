const express = require('express');
const Helper = require ('./main-model')
const bcryptjs = require('bcryptjs');


const router = express.Router();

router.get('/classes',(req,res) =>{
  Helper.findClasses()
  .then(classes => {
    res.status(200).json(classes);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Classes", message:err.message });
  });

})

router.post('/login', (req, res)=>{
    const {username, password} = req.body

    if(isValid(req.body)){
        Helper.findBy({username:username})
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

router.get('/',(req,res) =>{
    Helper.getAllHelpers()
    .then(Helper => {
      res.status(200).json(Helper);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get Helpers", message:err.message });
    });
})

router.get('/:id',(req,res) =>{
  Helper.getHelperById(req.params.id)
  .then(Helper => {
    res.status(200).json(Helper);
  })
  .catch(err => {
    res.status(500).json({ message: "Failed to get Helper", message:err.message });
  });
})

router.post("/", (req, res) => {
  const Helper = req.body;
  Helper.addHelper(Helper)
  Helper.getAllHelpers()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

router.post("/res", (req, res) => {

  const resource = req.body;
  Helper.addResource(resource)
  Helper.getResources()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

router.post("/tasks", (req, res) => {
  const task = req.body;
  Helper.addTask(task)
  Helper.getTasks()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new task" });
    });
});




module.exports = router;