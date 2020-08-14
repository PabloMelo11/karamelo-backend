const User = use('App/Models/User');

class SessionController {
  async store({ request, response, auth }) {
    const { name, password } = request.only(['name', 'password']);

    const { token } = await auth.attempt(name, password);

    const userQuery = await User.query()
      .where('name', name)
      .select('id', 'name', 'email', 'avatar')
      .fetch();

    const [user] = userQuery.rows.map(userInArray => userInArray);

    return response.json({
      token,
      user,
    });
  }
}

module.exports = SessionController;
