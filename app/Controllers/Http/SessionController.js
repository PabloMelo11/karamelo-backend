const User = use('App/Models/User');

class SessionController {
  async store({ request, response, auth }) {
    const { name, password } = request.only(['name', 'password']);

    const { token } = await auth.attempt(name, password);

    const user = await User.query()
      .where('name', name)
      .select('id', 'name', 'avatar')
      .fetch();

    return response.json({
      token,
      user,
    });
  }
}

module.exports = SessionController;
