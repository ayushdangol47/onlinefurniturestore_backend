exports.up = async function(knex, Promise) {
  await knex.schema.hasTable("food");

  return await knex.schema.createTable("food", table => {
    table.increments("id").primary(),
      table.string("name"),
      table.string("category"),
      table.integer("price"),
      table.string("image");
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("food");
};
