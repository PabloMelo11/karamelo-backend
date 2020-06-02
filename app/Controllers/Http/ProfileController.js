/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Helpers = use('Helpers');

class ProfileController {
  async index({ response, auth }) {
    const user = await auth.getUser();

    const orders = await User.query()
      .where('id', user.id)
      .select('id', 'name')
      .with('orders', builderOrder => {
        builderOrder.with('customer', builderCustomer => {
          builderCustomer.select(['id', 'name']);
        });
      })
      .fetch();

    return response.status(200).json(orders);
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

module.exports = ProfileController;
