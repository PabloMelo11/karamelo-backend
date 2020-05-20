/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddUserFieldToCategorySchema extends Schema {
  up() {
    this.table('categories', table => {
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
    this.table('categories', table => {
      table.dropColumn('user_id');
    });
  }
}

module.exports = AddUserFieldToCategorySchema;
