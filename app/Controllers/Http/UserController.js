const Helpers = use('Helpers');

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
      .fetch();

    return user;
  }

  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password', 'status']);

    const createUser = await User.create(data);

    const user = await User.query()
      .where('id', createUser.id)
      .select(['id', 'name', 'email', 'avatar', 'status'])
      .fetch();

    return response.status(201).json(user);
  }

  async update({ request, auth }) {
    const user = await auth.getUser();

    const data = request.only(['name', 'email', 'status']);

    const avatar = request.file('avatar');

    if (avatar) {
      await avatar.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${avatar.subtype}`,
      });

      if (!avatar.moved()) {
        return avatar.error();
      }

      user.avatar = avatar.fileName;
    }

    user.merge(data);

    const password = request.input('password');

    if (password) {
      user.password = password;
    }

    await user.save();

    return user;
  }
}

module.exports = UserController;
