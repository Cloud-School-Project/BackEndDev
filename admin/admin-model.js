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

function findAdminById(username) {
    return db("admin").where({ username });
}

  function findAdminByEmail(email) {
    return db("admin").where({ email });
  }
