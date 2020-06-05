const { test, trait } = use('Test/Suite')('Product');

const Helpers = use('Helpers');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create a new product', async ({
  client,
  assert,
}) => {
  const user = await Factory.model('App/Models/User').create();
  const category = await Factory.model('App/Models/Category').make();

  await user.categories().save(category);

  const response = await client
    .post('/products')
    .loginVia(user, 'jwt')
    .send({
      name: 'Diamente negro',
      description: 'Essa categortia e para os doces que de chocolate',
      price: 15.99,
    })
    .end();

  response.assertStatus(200);
  assert.exists(response.body.id);
  assert.equal(category.user_id, user.id);
});

test('it should be able to list all products', async ({ client, assert }) => {
  const user = await Factory.model('App/Models/User').create();
  await Factory.model('App/Models/Product').create();

  const response = await client
    .get('/products')
    .loginVia(user, 'jwt')
    .end();

  assert.exists(response.body[0].id);
  response.assertStatus(200);
});

test('it should be able show a product', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const category = await Factory.model('App/Models/Category').make();
  const product = await Factory.model('App/Models/Product').make();

  await Promise.all([
    user.products().save(product),
    user.categories().save(category),
  ]);

  const response = await client
    .get(`/products/${product.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);

  assert.equal(response.body.user_id, user.id);
  assert.equal(response.body.id, product.id);
});

test('it should be able to update a product', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const category = await Factory.model('App/Models/Category').create();

  const product = await Factory.model('App/Models/Product').create({
    name: 'Bolo de chocolate',
    description: 'Esse produto e para todos os bolos de chocolate',
    price: 19.0,
  });

  await Promise.all([
    user.products().save(product),
    user.categories().save(category),
  ]);

  const response = await client
    .put(`/products/${product.id}`)
    .loginVia(user, 'jwt')
    .field('name', 'Morango')
    .field('price', 20.0)
    .attach('image', Helpers.tmpPath('test/avatar.png'))
    .end();

  response.assertStatus(200);

  assert.equal(response.body.name, 'Morango');
  assert.equal(response.body.price, 20.0);
});
