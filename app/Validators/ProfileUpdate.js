const { rule } = use('Validator');

class UpdateProfile {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      customer_id: [rule('required')],
      date: [rule('dateFormat', 'YYYY-MM-DDTHH:mm:ss')],
      'items.*.product_id': 'exists:products,id',
    };
  }

  get messages() {
    return {
      'customer_id.required': 'O id do customer e obrigatorio.',
      'date.dateFormat': 'Data invalida.',
      'items.*.product_id.exists':
        'O id do produto nao existe na base de dados.',
    };
  }
}

module.exports = UpdateProfile;
