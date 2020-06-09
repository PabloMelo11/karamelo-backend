/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const Env = use('Env');

class Product extends Model {
  static get computed() {
    return ['image_url'];
  }

  static boot() {
    super.boot();

    this.addTrait('@provider:CastAttributes');
  }

  categories() {
    return this.belongsToMany('App/Models/Category');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  getImageUrl({ image }) {
    return `${Env.get('APP_URL_BACK')}/files/${image || 'product.png'}`;
  }

  static get casts() {
    return {
      price: 'float',
    };
  }
}

module.exports = Product;
