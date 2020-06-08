const BumblebeeTransformer = use('Bumblebee/Transformer');

class CustomerTransformer extends BumblebeeTransformer {
  static get availableInclude() {
    return ['orders'];
  }

  transform(customer) {
    customer = customer.toJSON();
    return {
      id: customer.id,
      name: customer.name,
      cpf: customer.cpf,
      whatsapp: customer.whatsapp,
      email: customer.email,
      state: customer.state,
      city: customer.city,
      neighborhood: customer.neighborhood,
      street: customer.street,
      number: customer.number,
      status: customer.status,
      created_at: customer.created_at,
      updated_at: customer.updated_at,

      custom: {
        quantity_orders:
          customer.__meta__ && customer.__meta__.quantity_orders
            ? Number(customer.__meta__.quantity_orders)
            : 0,
      },
    };
  }
}

module.exports = CustomerTransformer;
