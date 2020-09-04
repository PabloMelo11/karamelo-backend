class AvatarProfile {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      avatar: 'file|file_ext:png,jpg,jpeg|file_size:2mb',
    };
  }

  get messages() {
    return {
      'avatar.file': 'Necessario ser um arquivo de imagem.',
      'avatar.file_ext': 'Permitido somente png, jpg e jpge.',
      'avatar.file_size': 'Arquivos somente ate 2mb.',
    };
  }
}

module.exports = AvatarProfile;
