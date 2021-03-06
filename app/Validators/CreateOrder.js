const { rule } = use('Validator');

class CreateOrder {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      customer_id: [rule('required')],
      date: [rule('dateFormat', 'YYYY-MM-DDTHH:mm:ss')],
      status: [
        rule('in', ['pending', 'in_progress', 'done', 'finished', 'canceled']),
      ],
      'items.*.product_id': 'exists:products,id',
    };
  }

  get messages() {
    return {
      'customer_id.required': 'O id do customer e obrigatorio.',
      'date.dateFormat': 'Data invalida.',
      'items.*.product_id.exists':
        'O id do produto nao existe na base de dados.',
      'status.in':
        'O status so pode ser pending, in_progress, done, finished, canceled.',
    };
  }
}

module.exports = CreateOrder;
