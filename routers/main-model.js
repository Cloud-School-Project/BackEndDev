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
  findVolunteerByEmail,
  findStudentByEmail
};
function findClasses() {
  return db("classes")
    .select("id", "completed", "subject", "morning", "afternoon", "evening")
    .orderBy("id");
}

async function addVolunteer(user) {
    // console.log("What we send to as user", user)
    const [id] = await db("volunteer").insert(user);
    return findVolunteerById(user.username);
}

async function addStudent(user) {
      const [id] = await db("student").insert(user);
      return findStudentById(user.username);
  }

  async function addClass(course) {
    try {
      const [id] = await db("classes").insert(course);
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








function findStudentById(username) {
  return db("student").where({ username })
}
function findStudentByEmail(email) {
  return db("student").where({ email });
}
function findVolunteerById(username) {
  return db("volunteer").where({ username });
}
function findVolunteerByEmail(email) {
  return db("volunteer").where({ email });
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
