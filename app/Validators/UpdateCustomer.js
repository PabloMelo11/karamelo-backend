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
    return {
      'status.in': 'O status pode ser ativo ou inativo',
    };
  }
}

module.exports = UpdateCustomer;
