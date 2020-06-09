const { rule } = use('Validator');

class CreateCategory {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: [rule('required')],
    };
  }

  get messages() {
    return {
      'title.required': 'O titulo da categoria e obrigatorio.',
    };
  }
}

module.exports = CreateCategory;
