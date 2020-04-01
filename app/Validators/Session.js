const { rule } = use('Validator');

class Session {
  get rules() {
    return {
      name: [rule('required')],
      password: [rule('required')],
    };
  }
}

module.exports = Session;
