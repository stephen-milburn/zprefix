/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE items RESTART IDENTITY CASCADE')
  await knex('items').insert([
    {user_id: 1, item_name: 'computer', description: 'clickity clackity', quantity: 3},
    {user_id: 2, item_name: '> 100', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim orci sed neque condimentum, eu hendrerit quam malesuada. Integer vitae enim et justo consequat ullamcorper non id purus. Maple', quantity: 3},
    {user_id: 1, item_name: "Tea - Herbal I Love Lemon", description: "Extended tangible hardware", quantity: 6},
    {user_id: 2, item_name: "Beef - Rouladin, Sliced", description: "Mandatory user-facing contingency", quantity: 0},
    {user_id: 1, item_name: "Creme De Cacao Mcguines", description: "Ergonomic client-server Graphical User Interface", quantity: 7},
    {user_id: 2, item_name: "Sauce - Soya, Light", description: "Enterprise-wide high-level complexity", quantity: 10},
    {user_id: 1, item_name: "Chickhen - Chicken Phyllo", description: "Future-proofed static instruction set", quantity: 8},
    {user_id: 2, item_name: "Wine - Marlbourough Sauv Blanc", description: "Distributed empowering monitoring", quantity: 3},
    {user_id: 1, item_name: "Straw - Regular", description: "Self-enabling multimedia framework", quantity: 9},
    {user_id: 2, item_name: "Horseradish - Prepared", description: "Reactive real-time system engine", quantity: 9},
    {user_id: 1, item_name: "Steampan - Foil", description: "Reactive 6th generation info-mediaries", quantity: 9},
    {user_id: 2, item_name: "Juice - Pineapple, 341 Ml", description: "Face to face solution-oriented implementation", quantity: 7},
    {user_id: 1, item_name: "Ecolab - Lime - A - Way 4/4 L", description: "Virtual clear-thinking flexibility", quantity: 1}

  ]);
};
