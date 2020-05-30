/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Database = use('Database');
const Order = use('App/Models/Order');
const OrderService = use('App/Services/Order/OrderService');
const OrderTransformer = use('App/Transformers/Order/OrderTransformer');

class OrderController {
  async index({ transform, response, pagination }) {
    const orders = await Order.query()
      .orderBy('id', 'DESC')
      .paginate(pagination.page, pagination.perpage);

    return response.json(
      await transform.include('customer').paginate(orders, OrderTransformer)
    );
  }

  async show({ params, transform, response }) {
    const order = await Order.find(params.id);

    if (!order) {
      return response.status(400).json({ errro: 'Order not found' });
    }

    return response.json(
      await transform
        .include('items,user,customer')
        .item(order, OrderTransformer)
    );
  }

  async store({ request, response, auth, transform }) {
    const user = await auth.getUser();
    const trx = await Database.beginTransaction();

    try {
      const { customer_id, items, status } = request.only([
        'customer_id',
        'items',
        'status',
      ]);

      let order = await user.orders().create({ customer_id, status }, trx);

      const service = new OrderService(order, trx);

      if (items && items.length > 0) {
        await service.syncItems(items);
      }

      await trx.commit();

      order = await Order.find(order.id);

      order = await transform
        .include('items,customer')
        .item(order, OrderTransformer);

      return response.status(201).json(order);
    } catch (err) {
      await trx.rollback();
      return response.status(400).json({ error: err.message });
    }
  }

  async update({ request, params, response, transform }) {
    let order = await Order.find(params.id);

    if (!order) {
      return response.status(400).json({ error: 'Order does not exists' });
    }

    const trx = await Database.beginTransaction();

    try {
      const { customer_id, items, status } = request.only([
        'customer_id',
        'items',
        'status',
      ]);

      order.merge({ customer_id, status });

      const service = new OrderService(order, trx);

      if (items && items.length > 0) {
        await service.updateItems(items);
      }

      await order.save(trx);

      await trx.commit();

      order = await transform
        .include('items,customer')
        .item(order, OrderTransformer);

      return response.status(200).json(order);
    } catch (err) {
      await trx.rollback();
      return response.status(400).json({ error: err.message });
    }
  }
}

module.exports = OrderController;
