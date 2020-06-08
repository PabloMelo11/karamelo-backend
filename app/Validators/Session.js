const { rule } = use('Validator');

class Session {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      password: [rule('required')],
    };
  }

  get messages() {
    return {
      'name.required': 'O nome e obrigatório!',
      'password.required': 'A senha e obrigatória!',
    };
  }
}

module.exports = Session;
