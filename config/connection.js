const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    // Substitua por sua string de conexão do Azure Cosmos DB
    const dbURI = process.env.DATABASE_URL;
    const dbName = process.env.DATABASE_NAME;

    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName
    });

    console.log('Conectado ao Azure Cosmos DB');
  } catch (error) {
    console.error('Erro ao conectar ao Azure Cosmos DB:', error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;