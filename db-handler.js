const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

async function connect() {
    const uri = await mongod.getUri();
    
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };

    mongoose.connect(uri, mongooseOpts).then(() => {
        console.log(`MongoDB successfully connected to ${uri}`);
    });
}

async function closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

module.exports = { connect, closeDatabase, clearDatabase }