/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Customer = use('App/Models/Customer');

class CustomerController {
  async index() {
    const customers = await Customer.query().fetch();

    return customers;
  }

  async show({ params, response }) {
    const customer = await Customer.find(params.id);

    await customer.load('orders', ordersBuilder => {
      ordersBuilder.with('user', userBuilder => {
        userBuilder.select(['id', 'name', 'email', 'avatar']);
      });
    });

    const sidesLoaded = customer.$sideLoaded;

    const custom = {
      quantity_orders: Number(sidesLoaded.quantity_orders),
    };

    if (!customer) {
      return response.status(400).json({ errro: 'Customer not found' });
    }

    return response.json({ customer, custom });
  }

  async store({ request, response }) {
    const data = request.only([
      'name',
      'whatsapp',
      'email',
      'state',
      'city',
      'neighborhood',
      'street',
      'number',
      'status',
      'cpf',
    ]);

    const checkEmail = await Customer.query()
      .where('email', data.email)
      .first();

    if (checkEmail) {
      return response.status(400).json({ error: 'This e-mail already used.' });
    }

    const checkCPF = await Customer.query()
      .where('cpf', data.cpf)
      .first();

    if (checkCPF) {
      return response.status(400).json({ error: 'This CFP already used.' });
    }

    const customer = await Customer.create(data);

    return response.status(201).json(customer);
  }

  async update({ request, params }) {
    const customer = await Customer.find(params.id);

    const data = request.only([
      'name',
      'whatsapp',
      'state',
      'email',
      'city',
      'neighborhood',
      'street',
      'number',
      'status',
      'cpf',
    ]);

    customer.merge(data);

    await customer.save();

    return customer;
  }
}

module.exports = CustomerController;
