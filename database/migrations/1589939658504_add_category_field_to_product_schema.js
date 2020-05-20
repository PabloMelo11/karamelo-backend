/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCategoryFieldToProductSchema extends Schema {
  up() {
    this.table('products', table => {
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
    });
  }

  down() {
    this.table('products', table => {
      table.dropColumn('category_id');
    });
  }
}

module.exports = AddCategoryFieldToProductSchema;
