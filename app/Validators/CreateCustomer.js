const Antl = use('Antl');

const { rule } = use('Validator');

class CreateCustomer {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      status: [rule('in', ['active', 'inactive'])],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = CreateCustomer;
