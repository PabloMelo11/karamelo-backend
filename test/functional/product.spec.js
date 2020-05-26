const { test, trait } = use('Test/Suite')('Product');

// const Helpers = use('Helpers');

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
      quantity: 5,
      category_id: category.id,
    })
    .end();

  response.assertStatus(201);
  assert.equal(response.body.category_id, category.id);
  assert.equal(category.user_id, user.id);
});
