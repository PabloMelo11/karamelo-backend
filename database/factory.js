/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
    status: 'active',
    ...data,
  };
});

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
  return {
    type: data.type || 'refreshtoken',
    token: faker.string({ lenght: 20 }),
    ...data,
  };
});

Factory.blueprint('App/Models/Customer', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    whatsapp: faker.phone(),
    email: faker.email(),
    state: faker.sentence({ words: 12 }),
    city: faker.sentence({ words: 12 }),
    neighborhood: faker.sentence({ words: 12 }),
    street: faker.sentence({ words: 12 }),
    number: faker.sentence({ words: 4 }),
    status: 'active',
    ...data,
  };
});

Factory.blueprint('App/Models/Category', (faker, i, data = {}) => {
  return {
    title: faker.name(),
    description: faker.string(),
    ...data,
  };
});

Factory.blueprint('App/Models/Product', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    description: faker.name(),
    price: faker.floating({ min: 0, max: 1000, fixed: 2 }),
    quantity: faker.integer({ min: 0, max: 15 }),
    category_id: faker.integer({ min: 1, max: 15 }),
    ...data,
  };
});
