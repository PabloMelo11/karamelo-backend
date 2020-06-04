/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Order extends Model {
  static boot() {
    super.boot();

    this.addHook('afterFind', 'OrderHook.updateValues');
    this.addHook('afterPaginate', 'OrderHook.updateCollectionValues');

    this.addTrait('@provider:CastAttributes');
  }

  items() {
    return this.hasMany('App/Models/OrderItem');
  }

  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }

  customer() {
    return this.belongsTo('App/Models/Customer', 'customer_id', 'id');
  }

  static get casts() {
    return {
      total: 'float',
    };
  }
}

module.exports = Order;
