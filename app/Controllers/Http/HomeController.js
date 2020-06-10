/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Order = use('App/Models/Order');
const HomeSerializer = use('App/Serializers/HomeSerializer');

class HomeController {
  async index({ response }) {
    const orders = await Order.query()
      .whereNot('status', 'canceled')
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

  async update({ response, request, params }) {
    try {
      const order = await Order.find(params.orderId);

      if (!order) {
        return response
          .status(400)
          .json({ error: 'Encomenda nao encontrada.' });
      }

      const { status } = request.only(['status']);

      order.merge({ status });

      await order.save();

      return response.status(204).json();
    } catch (err) {
      return response
        .status(err.status)
        .json({ error: 'Erro ao tentar trocar o status da encomenda.' });
    }
  }
}

module.exports = HomeController;
