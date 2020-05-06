const Antl = use('Antl');

const { rule } = use('Validator');

class UpdateCustomer {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      status: [rule('in', ['active', 'inactive'])],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UpdateCustomer;
