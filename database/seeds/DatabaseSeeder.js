/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Customer = use('App/Models/Customer');

class DatabaseSeeder {
  async run() {
    await User.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123456',
      cpf: '4810324587',
      phone: '12988784512',
      whatsapp: '19985421254',
      state: 'Sao Paulo',
      city: 'Limeira',
      neighborhood: 'Bairro dos loucos',
      street: 'Rua dos loucos',
      number: '12A',
      date_of_birth: '11/08/2000',
      status: 'active',
    });

    const categories = await Factory.model('App/Models/Category').createMany(5);

    await Promise.all(
      categories.map(async category => {
        const products = await Factory.model('App/Models/Product').createMany(
          5
        );

        await Promise.all(
          products.map(async product => {
            await product.categories().attach([category.id]);
          })
        );
      })
    );

    await Customer.create({
      name: 'Iago',
      whatsapp: '(19) 982545214',
      email: 'iagofreire@gmail.com',
      state: 'Sao Paulo',
      city: 'Limeira',
      neighborhood: 'Belinha Ometo',
      street: 'Rua dos bobos',
      number: '12A',
      status: 'active',
    });
  }
}

module.exports = DatabaseSeeder;
