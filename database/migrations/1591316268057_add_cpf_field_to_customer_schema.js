/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCpfFieldToCustomerSchema extends Schema {
  up() {
    this.table('customers', table => {
      table.string('cpf').unique();
    });
  }

  down() {
    this.table('customers', table => {
      table.dropColumn('cpf');
    });
  }
}

module.exports = AddCpfFieldToCustomerSchema;
