const CustomerHook = (exports = module.exports = {});

CustomerHook.quantityOrders = async customerInstance => {
  customerInstance.$sideLoaded.quantity_orders = await customerInstance
    .orders()
    .getCount();
};

CustomerHook.updateCollectionValues = async models => {
  for (let model of models) {
    model = await CustomerHook.quantityOrders(model);
  }
};
