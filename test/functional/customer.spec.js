const { test, trait } = use('Test/Suite')('Customer');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create a new customer', async ({
  client,
  assert,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/customers')
    .loginVia(user, 'jwt')
    .send({
      name: 'Pablo',
      whatsapp: '19985452125',
      email: 'pablo@gmail.com',
      state: 'Sao Paulo',
      city: 'Limeira',
      neighborhood: 'kgjgnvs',
      street: 'ruaqwe',
      number: '127A',
      status: 'active',
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});

test('it should be able to list customers', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  await Factory.model('App/Models/Customer').createMany(2);

  const response = await client
    .get('/customers')
    .loginVia(user, 'jwt')
    .end();

  assert.exists(response.body[0].id);
  response.assertStatus(200);
});
