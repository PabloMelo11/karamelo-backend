const Antl = use('Antl');

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
    return Antl.list('validation');
  }
}

module.exports = ForgotPassword;
