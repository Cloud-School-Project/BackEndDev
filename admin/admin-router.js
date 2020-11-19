const express = require("express");
const bcryptjs = require("bcryptjs");
const { makeToken, isValid } = require("../routers/middle-ware");
const { findAdminById, addAdmin, findAdminByEmail } = require("./admin-model");

const router = express.Router();

router.post("/register", checkAdmin, async (req, res) => {
  const credentials = req.body; //used to get data from the post request
  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 8); // sets how many times the pass is hashed
    credentials.password = hash;
    addAdmin(credentials).then((user) => {
      res.status(201).json(user);
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
        console.log(user, "THIS IS USER");
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

// --- middleware --- //

async function checkAdmin(req, res, next) {
  let testerVar= await findAdminById(req.body.username)
  console.log("my test var",testerVar)
  if (testerVar.length>0) {
    res.status(401).json({ message: "user already exists" });
  }
  else{
  next()
  } 
}

module.exports = router;