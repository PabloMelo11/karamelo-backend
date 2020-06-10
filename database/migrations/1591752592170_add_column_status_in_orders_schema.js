/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddColumnStatusInOrdersSchema extends Schema {
  up() {
    this.table('orders', table => {
      table
        .enu('status', [
          'pending',
          'in_progress',
          'done',
          'finished',
          'canceled',
        ])
        .defaultTo('pending');
    });
  }

  down() {
    this.table('orders', table => {
      table.dropColumn('status');
    });
  }
}

module.exports = AddColumnStatusInOrdersSchema;
