const Antl = use('Antl');

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
    return Antl.list('validation');
  }
}

module.exports = ResetPassword;
