/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Customer = use('App/Models/Customer');

class CustomerController {
  async index() {
    const customers = await Customer.query().fetch();

    return customers;
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

    const customer = await Customer.create(data);

    return response.status(201).json(customer);
  }
}

module.exports = CustomerController;
