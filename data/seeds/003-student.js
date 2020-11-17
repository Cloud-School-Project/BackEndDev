exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("student")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("student").insert([
        {
          username: "newstudent",
          password: "newstudent123",
          email: "student@gmail.com",
        },
        {
          username: "oldstudent",
          password: "oldstudent",
          email: "oldstudent@gmail.com",
        },
        {
          username: "morgan",
          password: "morgan100",
          email: "morgan@gmail.com",
        },
        { username: "dasher", password: "dash10", email: "dash@gmail.com" },
        {
          username: "smartguy",
          password: "imsmartforsure",
          email: "smart@gmail.com",
        },
      ]);
    });
};
