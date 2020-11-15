const db = require("../data/db-config");
module.exports = {
  addStudent,
  addVolunteer,
  findClasses,
  addClass,
  updateClass,
  deleteClass,
  findStudentById,
  findVolunteerById,
  findAdminById,
  getLoggedOutList,
  addLoggedOut,
};
function findClasses() {
  return db("classes")
    .select("id", "closed", "subject", "morning", "afternoon", "evening")
    .orderBy("id");
}

async function addVolunteer(user) {
  try {
    const [id] = await db("volunteer").insert(user, "id");
    return findVolunteerById(id);
  } catch (error) {
    throw error;
  }
}

async function addStudent(user) {
    try {
      const [id] = await db("student").insert(user, "id");
      return findStudentById(id);
    } catch (error) {
      throw error;
    }
  }

  async function addClass(data) {
    try {
      const [id] = await db("classes").insert(data, "id");
      return findClasses()
    } catch (error) {
      throw error;
    }
  }

   function updateClass(changes, id) {
    return db('classes')
    .where({ id: id })
    .update(changes)
    .then(res => {
        return db('classes')
        .where({ id: id })
    })
}

  async function deleteClass(id) {
      return db('classes').where({ id }).delete();
  }

//   async function addAdmin(user) {
//     try {
//       const [id] = await db("admin").insert(user, "id");
//       return findById(id);
//     } catch (error) {
//       throw error;
//     }
//   }








function findStudentById(id) {
  return db("student").where({ id }).first();
}

function findVolunteerById(id) {
  return db("volunteer").where({ id }).first();
}

function findAdminById(id) {
  return db("admin").where({ id }).first();
}





function getLoggedOutList(filter) {
  return db("loggedout").select("test"); // Sends back the whole list of logged out tokens
}

async function addLoggedOut(token) {
  try {
    const [test] = await db("loggedout").insert(token, "id"); //Adds the token brought in to our logged out list.
    return token; //Returns the token given as (test:token)
  } catch (error) {
    throw error;
  }
}
