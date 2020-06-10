const { test, trait } = use('Test/Suite')('User');

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
  assert.exists(response.body.id);
});

test('it should be able to list users', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .get('/users')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.exists(response.body.data[0].id);
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
