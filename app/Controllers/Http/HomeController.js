/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Order = use('App/Models/Order');
const HomeSerializer = use('App/Serializers/HomeSerializer');

class HomeController {
  async index({ response }) {
    const orders = await Order.query()
      .with('customer', customerBuilder => {
        customerBuilder.select(['id', 'name', 'cpf']);
      })
      .with('user', userBuilder => {
        userBuilder.select(['id', 'name']);
      })
      .paginate();

    const order = orders.rows.map(orderInArray => orderInArray.toJSON());

    const homeSerializer = new HomeSerializer();

    const data = homeSerializer.transform(order);

    return response.json(data);
  }
}

module.exports = HomeController;
