/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddDateFieldToOrdersSchema extends Schema {
  up() {
    this.table('orders', table => {
      table.datetime('date');
    });
  }

  down() {
    this.table('orders', table => {
      table.dropColumn('date');
    });
  }
}

module.exports = AddDateFieldToOrdersSchema;
