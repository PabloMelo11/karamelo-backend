class OrderService {
  constructor(model, trx = null) {
    this.model = model;
    this.trx = trx;
  }

  async syncItems(items) {
    if (!Array.isArray(items)) {
      return false;
    }

    await this.model.items().delete(this.trx);
    await this.model.items().createMany(items, this.trx);
  }
}

module.exports = OrderService;
