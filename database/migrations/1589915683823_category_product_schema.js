/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategoryProductSchema extends Schema {
  up() {
    this.create('category_products', table => {
      table.increments();
      table.integer('product_id').unsigned();
      table.integer('category_id').unsigned();

      table
        .foreign('product_id')
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');

      table
        .foreign('category_id')
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');

      table.timestamps();
    });
  }

  down() {
    this.drop('category_products');
  }
}

module.exports = CategoryProductSchema;
