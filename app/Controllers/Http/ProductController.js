/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

class ProductController {
  async store({ request, response, auth }) {
    const createProductWithUser = await auth.getUser();

    const data = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'category_id',
    ]);

    const checkCategory = await Category.query()
      .where('id', data.category_id)
      .first();

    if (!checkCategory) {
      return response.status(400).json({ error: 'Category does not exists.' });
    }

    await createProductWithUser.products().create(data);

    return response.status(201).json(data, createProductWithUser.id);
  }
}

module.exports = ProductController;
