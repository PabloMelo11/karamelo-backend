/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Customer = use('App/Models/Customer');

class CustomerController {
  async index() {
    const customers = await Customer.query().fetch();

    return customers;
  }

  async show({ params }) {
    const customer = await Customer.find(params.id);

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

  async update({ request, response, params }) {
    const customer = await Customer.find(params.id);

    const data = request.only([
      'name',
      'whatsapp',
      'state',
      'city',
      'neighborhood',
      'street',
      'number',
      'status',
    ]);

    customer.merge(data);

    const email = request.input('email');

    const checkEmail = await Customer.query()
      .where('email', email)
      .first();

    if (checkEmail) {
      return response.status(400).json({ error: 'This e-mail already used.' });
    }

    customer.email = email;

    await customer.save();

    return customer;
  }
}

module.exports = CustomerController;
