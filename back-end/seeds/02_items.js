/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE items RESTART IDENTITY CASCADE')
  await knex('items').insert([
    {user_id: 1, item_name: 'computer', description: 'clickity clackity', quantity: 3},
    {user_id: 1, item_name: '> 100', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim orci sed neque condimentum, eu hendrerit quam malesuada. Integer vitae enim et justo consequat ullamcorper non id purus. Maple', quantity: 3}
  ]);
};
