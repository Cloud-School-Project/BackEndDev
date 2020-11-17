exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("classes")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("classes").insert([
        { subject: "Math", morning: 1, afternoon: null, evening: null, completed:false },
        { subject: "scince", morning: null, afternoon: 2, evening: null, completed:false },
        { subject: "HTML", morning: null, afternoon: null, evening: 3, completed:false },
        { subject: "react", morning: 4, afternoon: null, evening: null, completed:false },
        { subject: "server", morning: null, afternoon: 5, evening: null, completed:false },

        // { subject: "Science", afternoon: 2 },
        // { subject: "Software", evening: 3 },
        // { subject: "Shop", afternoon: 1 },
        // { subject: "Games", evening: 2 },
      ]);
    });
};
