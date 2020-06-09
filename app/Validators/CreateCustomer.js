const { rule } = use('Validator');

class CreateCustomer {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      cpf: [rule('required')],
      status: [rule('in', ['active', 'inactive'])],
    };
  }

  get messages() {
    return {
      'name.required': 'O nome e obrigatorio.',
      'cpf.required': 'O CPF e obrigatorio.',
      'status.in': 'O status pode ser active ou inactive.',
    };
  }
}

module.exports = CreateCustomer;
