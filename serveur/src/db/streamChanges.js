const { MongoClient } = require("mongodb");

async function watchChanges(uri, database, collectionName, res) {
  try {
    const client = new MongoClient(uri);

    const db = client.db(database); 
    const collection = db.collection(collectionName);

    // Créer un curseur de changement (change stream) pour surveiller les events
    const changeStream = collection.watch();

    // Écouter les modifications apportées à la collection
    changeStream.on("change", (change) => {
      console.log("Changement détecté : ", change);
      res.write(`data:${JSON.stringify(change)}\n\n`)
    });

  } catch (err) {
    console.error("Une erreur est survenue : ", err);
  }
}

module.exports = {
    watchChanges
};





