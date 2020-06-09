const { rule } = use('Validator');

class ResetPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: [rule('required')],
      password: [rule('required'), rule('confirmed')],
    };
  }

  get messages() {
    return {
      'token.required': 'O token e obrigatorio.',
      'password.required': 'A senha e obrigatoria.',
      'password.confirmed': 'A necessario a confirmacao de senha.',
    };
  }
}

module.exports = ResetPassword;
