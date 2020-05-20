/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  category() {
    return this.belongsTo('App/Models/Category');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Product;
