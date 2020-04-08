/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CustomerSchema extends Schema {
  up() {
    this.create('customers', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('whatsapp');
      table.string('email').unique();
      table.string('state');
      table.string('city');
      table.string('neighborhood');
      table.string('street');
      table.string('number');
      table.enu('status', ['active', 'inactive']);
      table.timestamps();
    });
  }

  down() {
    this.drop('customers');
  }
}

module.exports = CustomerSchema;
