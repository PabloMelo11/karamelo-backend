const Mail = use('Mail');

const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request }) {
    const email = request.input('email');

    const user = await User.findByOrFail('email', email);

    await Mail.send('emails.forgotpassword', { name: user.name }, message => {
      message
        .to(user.email)
        .from('oi@pisystem.com.br')
        .subject('Karamelo - Recuperacao de senha');
    });
  }
}

module.exports = ForgotPasswordController;
