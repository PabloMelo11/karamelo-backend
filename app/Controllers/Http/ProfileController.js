/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Helpers = use('Helpers');

class ProfileController {
  async index({ response, auth }) {
    const user = await auth.getUser();

    const orders = await User.query()
      .where('id', user.id)
      .select('id', 'name', 'avatar', 'email', 'created_at', 'updated_at')
      .with('orders', builderOrder => {
        builderOrder.with('customer', builderCustomer => {
          builderCustomer.select(['id', 'name']);
        });
      })
      .fetch();

    return response.status(200).json(orders);
  }

  async update({ response, request, auth }) {
    const user = await auth.getUser();

    const data = request.only(['name', 'email', 'status']);

    if (!data.email) {
      return response.status(400).json({
        error: 'Seu e-mail nao esta preenchido! Por favor preencher o campo.',
      });
    }

    if (!data.name) {
      return response.status(400).json({
        error: 'Seu nome nao esta preenchido! Por favor preencher o campo.',
      });
    }

    const checkEmailUser = await User.query()
      .where('email', data.email)
      .first();

    if (checkEmailUser && checkEmailUser.email !== user.email) {
      return response
        .status(400)
        .json({ error: 'Esse e-mail ja esta vinculado a uma conta.' });
    }

    const checkNameUser = await User.query()
      .where('name', data.name)
      .first();

    if (checkNameUser && checkNameUser.name !== user.name) {
      return response
        .status(400)
        .json({ error: 'Esse nome de usuario ja esta vinculado a uma conta.' });
    }

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

module.exports = ProfileController;
