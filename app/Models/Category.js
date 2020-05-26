/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  products() {
    return this.belongsToMany('App/Models/Product');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Category;
