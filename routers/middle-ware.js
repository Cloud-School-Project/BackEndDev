const {getLoggedOutList}= require ('./main-model')
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('./secrets.js');
const bcryptjs = require('bcryptjs');

module.exports = {
    makeToken,
    restricted,
    isValid,
};


function makeToken(user) {
    const payload = {
      userid: user.id,
      username: user.username,
      email: user.email,
    };
    const options = {
      expiresIn: '9999 seconds',
    };
    return jwt.sign(payload, jwtSecret, options);
  }

  function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }


//Checks for for logged out tokens

function restricted (req,res,next) {
    // add code here to verify users are logged in
    const token = req.headers.authorization;  //grabs the token as a string
    if (!token) { //if no token exists then error is thrown and middleware stops operation
      return res.status(401).json({ message: 'we wants token' });
    }
    getLoggedOutList({test:token})// we pass the token in as an object(test:token)to our logged out list finder
    .then(resd => { //the response will be ALL of the logged out tokens
      const result=resd.filter(tokenchecker => tokenchecker.test===token) //we now filter through to see the users token is on this list
      if(result.length===1){ //if result holds a value then it did exisit on our logged out list
        return res.status(404).json("Token is on the logged out list")
      }
      jwt.verify(token, jwtSecret, (err, decoded) => { //else we verify that this token is still valid
        if (err) {
         return res.status(401).json({ message: 'token bad' });
        }
        //console.log('decoded token ->', decoded, "token",token);
        req.decodedJwt = decoded;
        next();
    })
    })
    .catch(errr =>{
       console.log("error when FLG not working",errr)
    });
};
