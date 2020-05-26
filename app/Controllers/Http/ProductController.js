/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Category = use('App/Models/Category');

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
        'category_id',
        'user_id',
        'created_at',
      ])
      .with('category', builder => {
        builder.select(['id', 'title']);
      })
      .fetch();

    return products;
  }

  async show({ response, params }) {
    const product = await Product.query()
      .where('id', params.id)
      .with('category', builder => {
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
    const createProductWithUser = await auth.getUser();

    const data = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'category_id',
    ]);

    const checkCategory = await Category.query()
      .where('id', data.category_id)
      .first();

    if (!checkCategory) {
      return response.status(400).json({ error: 'Category does not exists.' });
    }

    await createProductWithUser.products().create(data);

    return response.status(201).json(data, createProductWithUser.id);
  }

  async update({ request, response, params }) {
    const product = await Product.find(params.id);

    if (!product) {
      response.status(400).json({ error: 'Produto nao encontrado.' });
    }

    const data = request.only([
      'name',
      'description',
      'price',
      'quantity',
      'category_id',
    ]);

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

    await product.save();

    return product;
  }
}

module.exports = ProductController;
