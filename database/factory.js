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
    state: faker.sentence({ words: 7 }),
    city: faker.sentence({ words: 7 }),
    neighborhood: faker.sentence({ words: 7 }),
    street: faker.sentence({ words: 7 }),
    number: faker.string(),
    status: faker.string({ pool: 'active' }),
    ...data,
  };
});
