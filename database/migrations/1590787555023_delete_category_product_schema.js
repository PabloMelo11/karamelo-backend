/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeleteCategoryProductSchema extends Schema {
  up() {
    this.table('products', table => {
      table.dropColumn('category_id');
    });
  }

  down() {
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
}

module.exports = DeleteCategoryProductSchema;
