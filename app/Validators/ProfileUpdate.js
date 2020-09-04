const { rule } = use('Validator');

class ProfileUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [rule('required')],
      email: [rule('required')],
      password: [rule('confirmed')],
      cpf: [rule('unique', ['users', 'cpf'])],
      avatar: 'file|file_ext:png,jpg,jpeg|file_size:2mb',
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
      'avatar.file': 'Necessario ser um arquivo de imagem.',
      'avatar.file_ext': 'Permitido somente png, jpg e jpge.',
      'avatar.file_size': 'Arquivos somente ate 2mb.',
    };
  }
}

module.exports = ProfileUpdate;
