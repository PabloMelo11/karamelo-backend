const OrderHook = (exports = module.exports = {});

OrderHook.updateValues = async modelInstance => {
  modelInstance.$sideLoaded.subtotal = await modelInstance
    .items()
    .getSum('subtotal');

  modelInstance.$sideLoaded.quantity_items = await modelInstance
    .items()
    .getSum('quantity');

  modelInstance.total = await modelInstance.$sideLoaded.subtotal;

  return modelInstance;
};

OrderHook.updateCollectionValues = async models => {
  for (let model of models) {
    model = await OrderHook.updateValues(model);
  }
};
