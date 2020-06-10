const { rule } = use('Validator');

class HomeUpdate {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      status: [
        rule('in', ['pending', 'in_progress', 'done', 'finished', 'canceled']),
      ],
    };
  }

  get messages() {
    return {
      'status.in':
        'O status so pode ser pending, in_progress, done, finished, canceled.',
    };
  }
}

module.exports = HomeUpdate;
