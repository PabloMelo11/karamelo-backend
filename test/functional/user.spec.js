const { test, trait } = use('Test/Suite')('User');

const Hash = use('Hash');
const Helpers = use('Helpers');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create a new user', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/users')
    .loginVia(user, 'jwt')
    .send({
      name: 'GuilhermeMelo',
      email: 'guilherme@gmail.com',
      password: '123456',
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body[0].id);
});

test('it should be able to list users', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .get('/users')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.equal(response.body[0].id, user.id);
});

test('it should be able to show single user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .get(`/users/${user.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.equal(response.body[0].id, user.id);
});

test('it should be able to update user', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    name: 'Pablo',
    password: '123456',
  });

  const response = await client
    .put('/users')
    .loginVia(user, 'jwt')
    .field('name', 'Jorge')
    .field('password', '123456789')
    .attach('avatar', Helpers.tmpPath('test/avatar.png'))
    .end();

  response.assertStatus(200);

  assert.equal(response.body.name, 'Jorge');
  assert.exists(response.body.avatar);

  await user.reload();

  assert.isTrue(await Hash.verify('123456789', user.password));
});
