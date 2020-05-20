/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Customer = use('App/Models/Customer');

class DatabaseSeeder {
  async run() {
    const user = await User.create({
      name: 'admin',
      email: 'admin@gmail.com',
      password: '123456',
      status: 'active',
    });

    const category = await user.categories().create({
      title: 'Chocolate',
      description: 'Categoria para os bolos de chocolate.',
    });

    await user.products().create({
      name: 'Bolo de chocolate',
      description: 'Esse bolo de chocolate e para minha namorada',
      price: 15.99,
      quantity: 3,
      category_id: category.id,
    });

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
