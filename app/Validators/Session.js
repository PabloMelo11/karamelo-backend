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
}

module.exports = Session;
