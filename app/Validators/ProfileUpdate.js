const { rule } = use('Validator');

class UpdateProfile {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      email: [rule('required')],
      password: [rule('confirmed')],
      cpf: [rule('unique', ['users', 'cpf'])],
    };
  }

  get messages() {
    return {
      'name.required':
        'Seu nome nao esta preenchido! Por favor preencher o campo.',
      'email.required':
        'Seu e-mail nao esta preenchido! Por favor preencher o campo.',
      'password.confirmed': 'Para trocar sua senha, e necessario confirma-la.',
      'cpf.unique': 'Esse Cpf ja esta sendo utilizado.',
    };
  }
}

module.exports = UpdateProfile;
