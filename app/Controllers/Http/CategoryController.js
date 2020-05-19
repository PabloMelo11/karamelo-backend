/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

class CategoryController {
  async index() {
    const categories = await Category.query()
      .select(['id', 'title', 'description'])
      .fetch();

    return categories;
  }

  async show({ params }) {
    const category = await Category.query()
      .where('id', params.id)
      .select(['id', 'title', 'description'])
      .fetch();

    return category;
  }

  async store({ request, response }) {
    const data = request.only(['title', 'description']);

    const checkCategory = await Category.query()
      .where('title', data.title)
      .first();

    if (checkCategory) {
      return response.status(400).json({ error: 'Category already exists' });
    }

    const category = await Category.create(data);

    return response.status(201).json(category);
  }

  async update({ request, response, params }) {
    const category = await Category.find(params.id);

    if (!category) {
      return response.status(400).json({ error: 'Category does not exists.' });
    }

    const data = request.only(['description']);

    category.merge(data);

    const title = request.input(['title']);

    const checkCategory = await Category.query()
      .where('title', title)
      .first();

    if (checkCategory) {
      return response.status(400).json({ error: 'Category already used.' });
    }

    category.title = title;

    await category.save();

    return category;
  }
}

module.exports = CategoryController;
