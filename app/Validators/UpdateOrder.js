const { rule } = use('Validator');

class UpdateOrder {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      date: [rule('dateFormat', 'YYYY-MM-DDTHH:mm:ss')],
      status: [
        rule('in', ['pending', 'in_progress', 'done', 'finished', 'canceled']),
      ],
      'items.*.product_id': 'exists:products,id',
    };
  }

  get messages() {
    return {
      'date.dateFormat': 'Data invalida.',
      'items.*.product_id.exists':
        'O id do produto nao existe na base de dados.',
      'status.in':
        'O status so pode ser pending, in_progress, done, finished, canceled.',
    };
  }
}

module.exports = UpdateOrder;
