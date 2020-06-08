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
      token: 'O token e obrigatorio.',
    };
  }
}

module.exports = ResetPassword;
