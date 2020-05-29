// eslint-disable-next-line no-multi-assign
const OrderProductHook = (exports = module.exports = {});

const Product = use('App/Models/Product');

OrderProductHook.updateSubtotal = async modelInstance => {
  const product = await Product.find(modelInstance.product_id);

  modelInstance.subtotal = modelInstance.quantity * product.price;
};
