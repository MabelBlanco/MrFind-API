const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connection.on("error", (err) => {
  console.log("error de conexion", err);

  process.exit(1);
});

mongoose.connection.once("open", () => {
  console.log("conectado a mongodb en", mongoose.connection.name);
});

mongoose.connect(process.env.MONGODB_CONECTION_STRING);

module.exports = mongoose.connection;
