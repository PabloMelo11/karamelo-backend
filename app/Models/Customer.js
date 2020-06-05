/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Customer extends Model {
  static boot() {
    super.boot();

    this.addHook('afterFind', 'CustomerHook.quantityOrders');
    this.addHook('afterPaginate', 'CustomerHook.updateCollectionValues');
  }

  orders() {
    return this.hasMany('App/Models/Order');
  }
}

module.exports = Customer;
