/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RenameColumnQuantityToStockSchema extends Schema {
  up() {
    this.table('products', table => {
      table.renameColumn('quantity', 'stock');
    });
  }

  down() {
    this.table('products', table => {
      table.renameColumn('stock', 'quantity');
    });
  }
}

module.exports = RenameColumnQuantityToStockSchema;
