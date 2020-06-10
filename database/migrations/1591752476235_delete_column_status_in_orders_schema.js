/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeleteColumnStatusInOrdersSchema extends Schema {
  up() {
    this.table('orders', table => {
      table.dropColumn('status');
    });
  }

  down() {
    this.table('orders', table => {
      table
        .enu('status', ['pending', 'cancelled', 'shipped', 'paid', 'finished'])
        .defaultTo('pending');
    });
  }
}

module.exports = DeleteColumnStatusInOrdersSchema;
