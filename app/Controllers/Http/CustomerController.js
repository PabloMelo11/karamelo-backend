/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Customer = use('App/Models/Customer');

const CustomerTransformer = use(
  'App/Transformers/Customer/CustomerTransformer'
);

class CustomerController {
  async index() {
    const customers = await Customer.query().fetch();

    return customers;
  }

  async show({ params, response, transform }) {
    const customer = await Customer.find(params.id);

    if (!customer) {
      return response.status(400).json({ errro: 'Customer not found' });
    }

    return response.json(
      await transform.include('orders').item(customer, CustomerTransformer)
    );
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
