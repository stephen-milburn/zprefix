/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([
    {first_name: 'Stephen', last_name: 'Milburn', username: 'stephen-milburn', password: 'password'},
    {first_name: 'Tatum', last_name: 'Young', username: 'spud', password: 'password'},
    {first_name: 'Brennan', last_name: 'Bolen', username: 'bbboy', password: 'password'},

  ]);
};
