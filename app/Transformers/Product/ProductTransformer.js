const BumblebeeTransformer = use('Bumblebee/Transformer');

class ProductTransformer extends BumblebeeTransformer {
  transform(product) {
    product = product.toJSON();
    delete product.user_id;
    return {
      ...product,
      price: Number(product.price),
    };
  }
}

module.exports = ProductTransformer;
