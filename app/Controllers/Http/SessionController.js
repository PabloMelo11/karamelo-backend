class SessionController {
  async store({ request, auth }) {
    const { name, password } = request.only(['name', 'password']);

    const { token } = await auth.attempt(name, password);

    return { token };
  }
}

module.exports = SessionController;
