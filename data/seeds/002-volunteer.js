exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("volunteer")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("volunteer").insert([
        {
          username: "Sydney10",
          password: "iamteacher",
          email: "sydney10@gmail.com",
        },
        {
          username: "adamr",
          password: "alsobigteacher",
          email: "adam@gmail.com",
        },
        {
          username: "bigmax",
          password: "iamalsoteacher",
          email: "max@gmail.com",
        },
        {
          username: "koberuffner",
          password: "iamdoggo",
          email: "doggo@gmail.com",
        },
        {
          username: "pablov",
          password: "bigboypablo",
          email: "pablo@gmail.com",
        },
        { username: "tammyT", password: "password", email: "tammy@gmail.com" },
      ]);
    });
};
