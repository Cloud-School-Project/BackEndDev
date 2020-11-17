
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admin').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        { username: 'bigboss', password: 'bigboss100', email: 'bigboss@gmail.com' },
        { username: 'CEO', password: 'imurboss', email: 'ceo@gmail.com' },
        { username: 'admin', password: 'admin234', email: 'admin@gmail.com' },
        { username: 'table', password: 'table5634789', email: 'table@gmail.com' },
        { username: 'imurdad', password: 'getgoodkid', email: 'getgood@gg.com' },
      
      ]);
    });
};
