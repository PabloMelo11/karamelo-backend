const Antl = use('Antl');

const { rule } = use('Validator');

class UpdateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      password: [rule('string'), rule('confirmed')],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UpdateUser;
