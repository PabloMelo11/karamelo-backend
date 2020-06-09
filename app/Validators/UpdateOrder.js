const { rule } = use('Validator');

class UpdateOrder {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      date: [rule('dateFormat', 'YYYY-MM-DDTHH:mm:ss')],
      'items.*.product_id': 'exists:products,id',
    };
  }

  get messages() {
    return {
      'date.dateFormat': 'Data invalida.',
      'items.*.product_id.exists':
        'O id do produto nao existe na base de dados.',
    };
  }
}

module.exports = UpdateOrder;
