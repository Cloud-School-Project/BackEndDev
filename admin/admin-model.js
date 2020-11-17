const express = require('express');



const router = express.Router();
const db = require("../data/db-config");
module.exports = {
    findAdminById,
    findAdminByEmail,
    addAdmin, 
    
};

async function addAdmin(user) {
    const [id] = await db("admin").insert(user);
    return findAdminById(user.username);
}

function findAdminById(id) {
    return db("admin").where({ id }).first();
}

  function findAdminByEmail(email) {
    return db("admin").where({ email });
  }

// ---- middle-ware ---- //

// function checkAdmin(req,res,next) {
//     findVolunteerById(req.body.username)
//     .then(response =>{
//       if(response.length<1){
//         findVolunteerByEmail(req.body.email)
//         .then(result=>{
//           if(result.length<1)
//           {
//             next()
//           }
//           else
//           {
//             res.status(401).json({message: "user already exists"})
//           }
//         })
//       }
//       else
//       {
//        res.status(401).json({message: "user already exists"})
//       }
//      })
//     .catch(error =>{
//       console.log("this is error",error)
//     })
//   }

