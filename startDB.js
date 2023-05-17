"use strict";

require("dotenv").config();

const readline = require("readline");

// conectar a la base de datos
const connection = require("./modules/mongooseConection");

// cargar los modelos
const Play = require("./models/PlayModel");

async function main() {
  await connection.$initialConnection;
  const continuar = await ask(
    "Estas seguro, seguro, seguro, de que quieres borrar toda la base de datos y cargar datos iniciales (si/NO): "
  );
  if (!continuar) {
    process.exit();
  }

  //Import Data File
  const dataFile = require("./initData.json");

  //Inicializamos la colección de juegos
  await initPlays(dataFile.plays);

  connection.close();
}

main().catch((err) => console.log("Hubo un error:", err));

async function initPlays(data) {
  // borrar todos los documentos de juegos
  const deleted = await Play.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} juegos.`);

  const syncIndex = await Play.syncIndexes();
  console.log(`Reviewed ${syncIndex} index`);

  let newData = [...data];

  const inserted = await Play.insertMany(newData);
  console.log(`Creados ${inserted.length} juegos.`);
}

function ask(texto) {
  return new Promise((resolve, reject) => {
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    ifc.question(texto, (respuesta) => {
      ifc.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
