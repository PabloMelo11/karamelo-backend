/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Product = use('App/Models/Product');

const Helpers = use('Helpers');

class ProductController {
  async index({ request, pagination, response }) {
    const name = request.input('name');

    const products = await Product.query()
      .select(['id', 'name', 'image', 'price', 'user_id', 'created_at'])
      .with('categories', builder => {
        builder.select(['id', 'title']);
      });

    if (name) {
      products.where('name', 'ILIKE', `%${name}%`);
    }

    const data = await products.paginate(pagination.page, pagination.limit);

    return response.json(data);
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
      'categories',
    ]);

    const checkNameProduct = await Product.query()
      .where('name', data.name)
      .first();

    if (checkNameProduct) {
      return response
        .status(400)
        .json({ error: 'Ja existe um produto com esse nome.' });
    }

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
      'categories',
    ]);

    const checkNameProduct = await Product.query()
      .where('name', data.name)
      .first();

    if (checkNameProduct && checkNameProduct.name !== product.name) {
      return response
        .status(400)
        .json({ error: 'Esse nome ja esta vinculado a outro produto.' });
    }

    if (categories) {
      const [checkNumberZeroCategories] = categories.filter(
        category => category <= 0
      );
      if (checkNumberZeroCategories && checkNumberZeroCategories === 0) {
        return response
          .status(400)
          .json({ error: 'Nao existe uma categoria com Id 0.' });
      }
    }

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
