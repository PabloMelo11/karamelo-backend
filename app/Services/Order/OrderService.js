class OrderService {
  constructor(model, trx = null) {
    this.model = model;
    this.trx = trx;
  }

  async syncItems(items) {
    if (!Array.isArray(items)) {
      return false;
    }

    const checkQuantity = items.filter(item => item.quantity >= 1);

    if (checkQuantity.length === 0) {
      throw new Error('O produto deve possuir pelo menos 1 quantidade.');
    }

    await this.model.items().delete(this.trx);
    await this.model.items().createMany(items, this.trx);
  }
}

module.exports = OrderService;
