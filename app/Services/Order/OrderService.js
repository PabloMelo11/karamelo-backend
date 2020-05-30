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

  async updateItems(items) {
    const currentItems = await this.model
      .items()
      .whereIn(
        'id',
        items.map(item => item.id)
      )
      .fetch();

    await this.model
      .items()
      .whereNotIn(
        'id',
        items.map(item => item.id)
      )
      .delete(this.trx);

    await Promise.all(
      currentItems.rows.map(async item => {
        item.fill(items.filter(itemInArray => itemInArray.id === item.id)[0]);
        await item.save(this.trx);
      })
    );
  }
}

module.exports = OrderService;
