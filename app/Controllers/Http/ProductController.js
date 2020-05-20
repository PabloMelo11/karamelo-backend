/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

class ProductController {
  async store({ request, response }) {
    const data = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'category',
    ]);

    const checkCategory = await Category.query()
      .where('title', data.category)
      .first();

    if (!checkCategory) {
      return response.status(400).json({ error: 'Category does not exists.' });
    }
  }
}

module.exports = ProductController;
