/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddUserFieldToProductSchema extends Schema {
  up() {
    this.table('products', table => {
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down() {
    this.table('products', table => {
      table.dropColumn('user_id');
    });
  }
}

module.exports = AddUserFieldToProductSchema;
