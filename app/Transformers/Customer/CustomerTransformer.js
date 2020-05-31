const BumblebeeTransformer = use('Bumblebee/Transformer');

const OrderTransformer = use('App/Transformers/Order/OrderTransformer');

class CustomerTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['orders'];
  }

  transform(customer) {
    customer = customer.toJSON();
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      quantity_orders:
        customer.__meta__ && customer.__meta__.quantity_orders
          ? Number(customer.__meta__.quantity_orders)
          : 0,
    };
  }

  includeOrders(customer) {
    return this.collection(customer.getRelated('orders'), OrderTransformer);
  }
}

module.exports = CustomerTransformer;
