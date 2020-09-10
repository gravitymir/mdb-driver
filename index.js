/**
 * @autor Andrey Sukhodeyeyv
 * @url https://docs.mongodb.com/drivers/node/compatibility
*/

const { MongoClient } = require('mongodb');

const MONGODB_URL = process.env.MONGODB_DEFAULT_URL || 'mongodb://localhost:27017';
const MONGODB_DEFAULT_DBNAME = process.env.MONGODB_DEFAULT_DBNAME || 'main';

class MongoConnect {
  constructor({ url, dbName }) {
    this.url = url ?? MONGODB_URL;
    this.dbName = dbName ?? 'main';
    this.client = MongoClient;
  }

  async connect() {
    return await this.client.connect(this.url, { useNewUrlParser: true, useUnifiedTopology: true })
      .catch(err => console.log(err));
  }
}

class MongoDB extends MongoConnect {
  constructor(...args) {
    super(args.shift());
  }

  async listDatabases() {
    const client = await this.connect();
    try {
      return await client.db().admin().listDatabases();
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async listCollections({ dbName = this.dbName }) {
    const client = await this.connect();
    try {
      return await client.db(dbName).listCollections().toArray();
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async findOne({ dbName = this.dbName, collection, query, options }) {
    //https://docs.mongodb.com/drivers/node/usage-examples/findOne
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).findOne(query, options);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async find({ dbName = this.dbName, collection, query, options }) {
    //https://docs.mongodb.com/drivers/node/usage-examples/find
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).find(query, options);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async insertOne({ dbName = this.dbName, collection, document }) {
    //https://docs.mongodb.com/drivers/node/usage-examples/insertOne
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).insertOne(document);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async insertMany({ dbName = this.dbName, collection, documents, options }) {
    //https://docs.mongodb.com/drivers/node/usage-examples/insertMany
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).insertMany(documents, options);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async updateOne({ dbName = this.dbName, collection, filter, update, options }) {
    //https://docs.mongodb.com/drivers/node/usage-examples/updateOne
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).updateOne(filter, update, options);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async updateMany({ dbName = this.dbName, collection, filter, update }) {
    //https://docs.mongodb.com/drivers/node/usage-examples/updateMany
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).updateMany(filter, update);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async replaceOne({ dbName = this.dbName, collection, query, replacement, options }) {
    //https://docs.mongodb.com/drivers/node/usage-examples/replaceOne
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).replaceOne(query, replacement, options);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async deleteOne({ dbName = this.dbName, collection, query}) {
    //https://docs.mongodb.com/drivers/node/usage-examples/deleteOne
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).deleteOne(query);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async deleteMany({ dbName = this.dbName, collection, query}) {
    //https://docs.mongodb.com/drivers/node/usage-examples/deleteOne
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).deleteMany(query);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async estimatedDocumentCount({ dbName = this.dbName, collection}) {
    //https://docs.mongodb.com/drivers/node/usage-examples/count
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).estimatedDocumentCount();
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async countDocuments({ dbName = this.dbName, collection, query}) {
    //https://docs.mongodb.com/drivers/node/usage-examples/count
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).countDocuments(query);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async distinct({ dbName = this.dbName, collection, field, query}) {
    //https://docs.mongodb.com/drivers/node/usage-examples/distinct
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).distinct(field, query);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async command({ dbName = this.dbName, command}) {
    //https://docs.mongodb.com/drivers/node/usage-examples/command
    const client = await this.connect();
    try {
      return await client.db(dbName).command(command);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  async watch() {
    //method not implemented
    //https://docs.mongodb.com/drivers/node/usage-examples/changeStream
    return false;
  }
  async bulkWrite({ dbName = this.dbName, commands}) {
    //https://docs.mongodb.com/drivers/node/usage-examples/bulkWrite
    const client = await this.connect();
    try {
      return await client.db(dbName).collection(collection).bulkWrite(commands);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
}

let mongo = new MongoDB({});

(async function () {

  console.log(await mongo.listDatabases());
  console.log(await mongo.listDatabases());
  /*
  console.log(await mongo.insertOne({
    dbName: 'main',
    collection: 'test_first',
    document: {
      _id: 7,
      name: 'Роман',
      phone: 380989897777,
      age: 41,
      test_array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      test_obj: {
        a: 'access',
        b: 'broke',
        c: 'cansel'
      }
    }
  }));
  */

})()

