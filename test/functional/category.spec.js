const { test, trait } = use('Test/Suite')('Category');

// const Hash = use('Hash');
// const Helpers = use('Helpers');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create a new category', async ({
  client,
  assert,
}) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/categories')
    .loginVia(user, 'jwt')
    .send({
      title: 'Chocolates',
      description: 'Essa categortia e para os doces que de chocolate',
    })
    .end();

  response.assertStatus(201);
  assert.exists(response.body.id);
});

test('it should be able to list all catgories', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();
  await Factory.model('App/Models/Category').createMany(2);

  const response = await client
    .get('/categories')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.exists(response.body[0].id);
});

test('it should be able to show single category', async ({
  assert,
  client,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const category = await Factory.model('App/Models/Category').create();

  const response = await client
    .get(`/categories/${category.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.equal(response.body[0].id, category.id);
});

test('it should be able to update a category', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();
  const category = await Factory.model('App/Models/Category').create({
    title: 'Chocolate',
    description: 'Categoria para bolos de chocolate',
  });

  const response = await client
    .put(`/categories/${category.id}`)
    .loginVia(user, 'jwt')
    .field('title', 'Azedos')
    .field('description', 'Categoria de doces azedos')
    .end();

  response.assertStatus(200);

  assert.equal(response.body.title, 'Azedos');
});
