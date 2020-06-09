const { rule } = use('Validator');

class UpdateProduct {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      price: [rule('number')],
    };
  }

  get messages() {
    return {
      'price.number': 'O preco precisa ser um numero.',
    };
  }
}

module.exports = UpdateProduct;
