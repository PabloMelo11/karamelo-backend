/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategoryProductSchema extends Schema {
  up() {
    this.create('category_product', table => {
      table.increments();
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('category_product');
  }
}

module.exports = CategoryProductSchema;
