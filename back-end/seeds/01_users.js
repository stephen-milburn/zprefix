/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([
    {first_name: 'Mr.', last_name: 'Manager', username: 'Manager1', password: '$2a$10$TtEJHSGTZXA8eZWmEoATO./THY/80EJWjFCkORsZYid7WoO4BnAfG'}
  ]);
};
