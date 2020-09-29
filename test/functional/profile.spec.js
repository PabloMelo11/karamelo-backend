const { test, trait } = use('Test/Suite')('Profile');

const Hash = use('Hash');
// const Helpers = use('Helpers');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able the user to be update his profile', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create({
    name: 'Pablo',
    email: 'pablo@gmail.com',
    password: '123456',
  });

  const response = await client
    .put('/me')
    .loginVia(user, 'jwt')
    .field('name', 'Jorge')
    .field('email', 'teste@gmail.com')
    .field('password', '123456789')
    .field('password_confirmation', '123456789')
    .end();

  response.assertStatus(200);

  assert.equal(response.body.name, 'Jorge');
  assert.equal(response.body.email, 'teste@gmail.com');

  await user.reload();

  assert.isTrue(await Hash.verify('123456789', user.password));
});
