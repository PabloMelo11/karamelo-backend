const { rule } = use('Validator');

class CreateProduct {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      price: [rule('required'), rule('number')],
    };
  }

  get messages() {
    return {
      'name.required': 'O nome nao pode ser nulo.',
      'price.required': 'O preco e obrigatorio.',
      'price.number': 'O preco precisa ser um numero.',
    };
  }
}

module.exports = CreateProduct;
