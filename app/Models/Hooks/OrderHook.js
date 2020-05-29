// eslint-disable-next-line no-multi-assign
const OrderHook = (exports = module.exports = {});

OrderHook.updateValues = async modelInstance => {
  modelInstance.$sideLoaded.subtotal = await modelInstance
    .products()
    .getSum('subtotal');

  modelInstance.$sideLoaded.quantity_products = await modelInstance
    .products()
    .getSum('quantity');

  modelInstance.total = modelInstance.$sideLoaded.subtotal;
};

OrderHook.updateCollectionValues = async modelsInstance => {
  // eslint-disable-next-line no-restricted-syntax
  for (let modelInstance of modelsInstance) {
    // eslint-disable-next-line no-await-in-loop
    modelInstance = await OrderHook.updateValues(modelInstance);
  }
};
