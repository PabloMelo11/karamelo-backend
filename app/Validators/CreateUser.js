const { rule } = use('Validator');

class CreateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      email: [rule('email')],
      password: [rule('required')],
      status: [rule('in', ['active', 'inactive'])],
    };
  }

  get messages() {
    return {
      'name.required': 'O nome e obrigatorio.',
      'email.email': 'E necessario um e-mail valido.',
      'password.required': 'A senha e obrigatoria.',
      'status.in': 'O status pode ser ativo ou inativo.',
    };
  }
}

module.exports = CreateUser;
