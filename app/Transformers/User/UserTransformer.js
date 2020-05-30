const BumblebeeTransformer = use('Bumblebee/Transformer');

class UserTransformer extends BumblebeeTransformer {
  transform(user) {
    user = user.toJSON();
    delete user.updated_at;
    delete user.created_at;
    delete user.password;
    return user;
  }
}

module.exports = UserTransformer;
