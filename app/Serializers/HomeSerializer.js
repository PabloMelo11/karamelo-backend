class HomeSerializer {
  transform(orderInArray) {
    const data = orderInArray.map(order => {
      return {
        order: {
          id: order.id,
          user_id: order.user_id,
          customer_id: order.customer.id,
          total: order.total,
          status: order.status,
          created_at: order.created_at,
          updated_at: order.updated_at,
          date: order.date,
        },
        custom: {
          quantity_items:
            order.__meta__ && order.__meta__.quantity_items
              ? Number(order.__meta__.quantity_items)
              : 0,
        },
        customer: {
          ...order.customer,
        },
        user: {
          ...order.user,
        },
      };
    });

    return data;
  }
}

module.exports = HomeSerializer;
