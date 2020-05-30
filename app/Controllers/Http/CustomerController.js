/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Customer = use('App/Models/Customer');

class CustomerController {
  async index() {
    const customers = await Customer.query().fetch();

    return customers;
  }

  async show({ params, response }) {
    const customer = await Customer.query()
      .where('id', params.id)
      .with('orders')
      .fetch();

    if (!customer) {
      return response.status(400).json({ error: 'Customer not found' });
    }

    return customer;
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
    ]);

    const checkEmail = await Customer.query()
      .where('email', data.email)
      .first();

    if (checkEmail) {
      return response.status(400).json({ error: 'This e-mail already used.' });
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
    ]);

    customer.merge(data);

    await customer.save();

    return customer;
  }
}

module.exports = CustomerController;
