/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async index() {
    const users = await User.query()
      .select(['id', 'name', 'email', 'avatar', 'status'])
      .fetch();

    return users;
  }

  async show({ params }) {
    const user = await User.query()
      .where('id', params.id)
      .select(['id', 'name', 'email', 'avatar', 'status'])
      .with('products')
      .with('categories')
      .with('orders')
      .fetch();

    return user;
  }

  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password', 'status']);

    const checkEmail = await User.query()
      .where('email', data.email)
      .first();

    if (checkEmail) {
      return response.status(400).json({ error: 'Email already exists' });
    }

    const checkUsername = await User.query()
      .where('name', data.name)
      .first();

    if (checkUsername) {
      return response.status(400).json({ error: 'Name already exists' });
    }

    const user = await User.create(data);

    return response.status(201).json(user);
  }
}

module.exports = UserController;
