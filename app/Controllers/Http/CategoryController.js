/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

class CategoryController {
  async index() {
    const categories = await Category.query()
      .with('user', builder => {
        builder.select(['id', 'name', 'avatar', 'email', 'status']);
      })
      .fetch();

    return categories;
  }

  async show({ response, params }) {
    const category = await Category.query()
      .where('id', params.id)
      .select(['id', 'title', 'description', 'user_id'])
      .with('user', builder => {
        builder.select(['id', 'name', 'avatar', 'email', 'status']);
      })
      .fetch();

    if (!category) {
      response.status(400).json({ error: 'Essa categoria nao existe.' });
    }

    return category;
  }

  async store({ request, response, auth }) {
    const user = await auth.getUser();

    const data = request.only(['title', 'description']);

    const checkCategory = await Category.query()
      .where('title', data.title)
      .first();

    if (checkCategory) {
      return response.status(400).json({ error: 'Essa categoria ja existe.' });
    }

    const category = await user.categories().create(data);

    return response.status(201).json(category);
  }

  async update({ request, response, params }) {
    const category = await Category.find(params.id);

    if (!category) {
      return response.status(400).json({ error: 'Essa categoria nao existe.' });
    }

    const data = request.only(['description', 'title']);

    category.merge(data);

    await category.save();

    return category;
  }
}

module.exports = CategoryController;
