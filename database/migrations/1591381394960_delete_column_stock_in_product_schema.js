/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeleteColumnStockInProductSchema extends Schema {
  up() {
    this.table('products', table => {
      table.dropColumn('stock');
    });
  }

  down() {
    this.table('products', table => {
      table.integer('stock');
    });
  }
}

module.exports = DeleteColumnStockInProductSchema;
