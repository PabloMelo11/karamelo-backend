/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
  products() {
    return this.hasMany('App/Models/OrderItem');
  }

  customer() {
    return this.belongsTo('App/Models/Customer', 'customer_id', 'id');
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }
}

module.exports = Order;
