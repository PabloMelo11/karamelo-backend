const BumblebeeTransformer = use('Bumblebee/Transformer');

const ProductTransformer = use('App/Transformers/Product/ProductTransformer');

class OrderItemTransformer extends BumblebeeTransformer {
  static get defaultInclude() {
    return ['product'];
  }

  transform(item) {
    return {
      id: item.id,
      subtotal: Number(item.subtotal),
      quantity: item.quantity,
    };
  }

  includeProduct(orderItem) {
    return this.item(orderItem.getRelated('product'), ProductTransformer);
  }
}

module.exports = OrderItemTransformer;
