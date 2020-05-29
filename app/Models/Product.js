/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Env = use('Env');

class Product extends Model {
  static get computed() {
    return ['image_url'];
  }

  categories() {
    return this.belongsToMany('App/Models/Category');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  getImageUrl({ image }) {
    return `${Env.get('APP_URL')}/files/${image || 'product.png'}`;
  }
}

module.exports = Product;
