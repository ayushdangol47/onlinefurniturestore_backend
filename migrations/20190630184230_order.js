exports.up = async function(knex, Promise) {
  await knex.schema.hasTable("order");

  return await knex.schema.createTable("order", table => {
    table.increments("id").primary(),
      table.integer("foodID"),
      table.integer("userID"),
      table.string("foodName"),
      table.string("foodImage"),
      table.integer("quantity"),
      table.string("isDelivered");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("order");
};
