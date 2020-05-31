const CustomerHook = (exports = module.exports = {});

CustomerHook.quantityOrders = async customerInstance => {
  customerInstance.$sideLoaded.quantity_orders = await customerInstance
    .orders()
    .getCount();
};
