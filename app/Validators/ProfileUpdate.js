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
    };
  }

  get messages() {
    return {
      'name.required':
        'Seu nome nao esta preenchido! Por favor preencher o campo.',
      'email.required':
        'Seu e-mail nao esta preenchido! Por favor preencher o campo.',
      'password.confirmed': 'Para trocar sua senha, e necessario confirma-la.',
    };
  }
}

module.exports = UpdateProfile;
