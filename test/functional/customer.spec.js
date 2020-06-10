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
      cpf: '481032451',
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

test('it should be to show single customer', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const customer = await Factory.model('App/Models/Customer').create();

  const response = await client
    .get(`/customers/${customer.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.exists(response.body.customer.id);
});

test('it should be able to update customer', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const customer = await Factory.model('App/Models/Customer').create({
    name: 'Guilherme',
    email: 'guilherme@teste.com',
    cpf: '48412544154',
  });

  const response = await client
    .put(`/customers/${customer.id}`)
    .loginVia(user, 'jwt')
    .field('name', 'Jorge')
    .field('email', 'jorge@gmail.com')
    .field('cpf', '4521255412')
    .end();

  response.assertStatus(200);

  assert.equal(response.body.name, 'Jorge');
});
