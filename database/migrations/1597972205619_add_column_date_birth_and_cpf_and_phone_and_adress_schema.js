/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddColumnDateBirthAndCpfAndPhoneAndAdressSchema extends Schema {
  up() {
    this.table('users', table => {
      table.string('cpf').unique();
      table.string('phone');
      table.string('whatsapp');
      table.string('state');
      table.string('city');
      table.string('neighborhood');
      table.string('street');
      table.string('number');
      table.string('date_of_birth');
    });
  }

  down() {
    this.table('users', table => {
      table.dropColumn('cpf');
      table.dropColumn('phone');
      table.dropColumn('whatsapp');
      table.dropColumn('state');
      table.dropColumn('city');
      table.dropColumn('neighborhood');
      table.dropColumn('street');
      table.dropColumn('number');
      table.dropColumn('date_of_birth');
    });
  }
}

module.exports = AddColumnDateBirthAndCpfAndPhoneAndAdressSchema;
