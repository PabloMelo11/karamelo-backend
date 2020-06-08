const { rule } = use('Validator');

class ForgotPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: [rule('required'), rule('email')],
    };
  }

  get messages() {
    return {
      'email.required': 'E-mail obrigatorio',
      'email.email': 'Precisa ser um e-mail valido.',
    };
  }
}

module.exports = ForgotPassword;
