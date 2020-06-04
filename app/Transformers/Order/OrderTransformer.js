const BumblebeeTransformer = use('Bumblebee/Transformer');

const UserTransformer = use('App/Transformers/User/UserTransformer');

const CustomerTransformer = use(
  'App/Transformers/Customer/CustomerTransformer'
);

const OrderItemTransformer = use('App/Transformers/Order/OrderItemTransformer');

class OrderTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['customer', 'items', 'user'];
  }

  transform(order) {
    order = order.toJSON();
    return {
      id: order.id,
      status: order.status,
      total: order.total ? parseFloat(order.total) : 0,
      subtotal:
        order.__meta__ && order.__meta__.subtotal
          ? parseFloat(order.__meta__.subtotal)
          : 0,

      quantity_items:
        order.__meta__ && order.__meta__.quantity_items
          ? Number(order.__meta__.quantity_items)
          : 0,
      created_at: order.created_at,
      date: order.date ? order.date : null,
    };
  }

  includeUser(order) {
    return this.item(order.getRelated('user'), UserTransformer);
  }

  includeCustomer(order) {
    return this.item(order.getRelated('customer'), CustomerTransformer);
  }

  includeItems(order) {
    return this.collection(order.getRelated('items'), OrderItemTransformer);
  }
}

module.exports = OrderTransformer;
