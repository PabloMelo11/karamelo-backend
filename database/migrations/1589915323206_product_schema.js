/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('products', table => {
      table.increments();
      table.string('name');
      table.string('image');
      table.string('description');
      table.decimal('price', 12, 2);
      table.integer('quantity');
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductSchema;
