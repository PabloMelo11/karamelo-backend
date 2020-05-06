const Antl = use('Antl');

const { rule } = use('Validator');

class CreateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      email: [rule('required'), rule('email')],
      password: [rule('required')],
      status: [rule('in', ['active', 'inactive'])],
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = CreateUser;
