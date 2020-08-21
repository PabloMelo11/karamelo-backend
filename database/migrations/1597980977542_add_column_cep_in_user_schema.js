/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddColumnCepInUserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.string('cep', 9);
    });
  }

  down() {
    this.table('users', table => {
      table.dropColumn('cep');
    });
  }
}

module.exports = AddColumnCepInUserSchema;
