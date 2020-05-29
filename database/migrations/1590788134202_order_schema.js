/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class OrderSchema extends Schema {
  up() {
    this.create('orders', table => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE');
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onUpdate('CASCADE');
      table.decimal('total', 12, 2).defaultTo(0.0);
      table.enu('status', ['pending', 'cancelled', 'paid', 'finish']);
      table.timestamps();
    });
  }

  down() {
    this.drop('orders');
  }
}

module.exports = OrderSchema;
