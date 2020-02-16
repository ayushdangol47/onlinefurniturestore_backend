const path = require("path");
module.exports = {
  client: "sqlite3",
  connection: {
    filename: "storage.sqlite"
  },
  migrations: {
    tableName: "migrations",
    directory: path.resolve(__dirname, "./migrations")
  },
  useNullAsDefault: true
};
