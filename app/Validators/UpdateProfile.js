const { rule } = use('Validator');

class UpdateUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      password: [rule('string'), rule('confirmed')],
      status: [rule('in', ['active', 'inactive'])],
    };
  }

  get messages() {
    return {
      'password.confirmed': 'E necessario a confirmacao de senha correta.',
      'status.in': 'O status pode ser ativo ou inativo.',
    };
  }
}

module.exports = UpdateUser;
