/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Category extends Model {
  products() {
    return this.belongsToMany('App/Models/Product');
  }

  user() {
    return this.hasOne('App/Models/User', 'id', 'user_id');
  }
}

module.exports = Category;
