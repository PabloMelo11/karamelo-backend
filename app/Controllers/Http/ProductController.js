/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');

const Helpers = use('Helpers');

class ProductController {
  async index() {
    const products = await Product.query()
      .select([
        'id',
        'name',
        'image',
        'price',
        'quantity',
        'user_id',
        'created_at',
      ])
      .with('categories', builder => {
        builder.select(['id', 'title']);
      })
      .fetch();

    return products;
  }

  async show({ response, params }) {
    const product = await Product.query()
      .where('id', params.id)
      .with('categories', builder => {
        builder.select(['id', 'title', 'description']);
      })
      .with('user', builder => {
        builder.select(['id', 'name', 'avatar', 'email', 'status']);
      })
      .first();

    if (!product) {
      response.status(400).json({ error: 'Esse produto nao existe.' });
    }

    return product;
  }

  async store({ request, response, auth }) {
    const user = await auth.getUser();

    const { categories, ...data } = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'categories',
    ]);

    const product = await user.products().create(data);

    if (categories && categories.length > 0) {
      await product.categories().attach(categories);
      await product.load('categories');
    }

    return response.status(200).json(product);
  }

  async update({ request, response, params }) {
    const product = await Product.find(params.id);

    if (!product) {
      response.status(400).json({ error: 'Produto nao encontrado.' });
    }

    const { categories, ...data } = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'categories',
    ]);

    await product.categories().detach();

    const image = request.file('image');

    if (image) {
      await image.move(Helpers.tmpPath('uploads'), {
        name: `${new Date().getTime()}.${image.subtype}`,
      });

      if (!image.moved()) {
        return image.error();
      }

      product.image = image.fileName;
    }

    product.merge(data);

    if (categories && categories.length > 0) {
      await product.categories().attach(categories);
      await product.load('categories');
    }

    await product.save();

    return product;
  }
}

module.exports = ProductController;
