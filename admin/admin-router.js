const express = require("express");
const bcryptjs = require("bcryptjs");
const { makeToken, isValid } = require("../routers/middle-ware");
const { findAdminById, addAdmin } = require("./admin-model");
const { getMaxListeners } = require("../data/db-config");

const router = express.Router();

router.post("/register", checkAdmin, async (req, res) => {
  const credentials = req.body; //used to get data from the post request
  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8); // sets how many times the pass is hashed
    credentials.password = hash;
    addAdmin(credentials)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(401).json({ message: error });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password should be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    findAdminById(username)
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeToken(user); // makes the token
          res.status(200).json({ message: "Welcome Friendo", token });
        } else {
          res.status(401).json({ message: "Invalid creds!" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide valid shit!",
    });
  }
});

function checkAdmin(req,res,next) {
    findAdminById(req.body.username)
    .then(response =>{
      if(response.length<1){
        findAdminByEmail(req.body.email)
        .then(result=>{
          if(result.length<1)
          {
            next() 
          }
          else
          {
            res.status(401).json({message: "user already exists"})
          }
        })
      }
      else
      {
       res.status(401).json({message: "user already exists"})
      }
     })
    .catch(error =>{
      console.log("this is error",error)
    })
  }

module.exports = router;
