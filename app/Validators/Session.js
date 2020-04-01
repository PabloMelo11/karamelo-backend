const Antl = use('Antl');

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
    return Antl.list('validation');
  }
}

module.exports = Session;
