const BumblebeeTransformer = use('Bumblebee/Transformer');

class CustomerTransformer extends BumblebeeTransformer {
  transform(customer) {
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
    };
  }
}

module.exports = CustomerTransformer;
