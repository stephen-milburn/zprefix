// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const seedingString = 'postgres://postgres:docker@127.0.0.1:5432/zdb'
const buildingString = 'postgres://postgres:docker@zdb:5432/zdb'

module.exports = {

  development: {
    client: 'pg',
    connection: buildingString
  },

  seeding: {
    client: 'pg',
    connection: seedingString
  },

};
