
require('dotenv').config()
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGODB_URI = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@printchic.3sbd38b.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
const Promise = require('bluebird');
const { ServerApiVersion } = require('mongodb');
const database = [];
mongoose.Promise = Promise;
mongoose.dbs = {};
var gfs = null;
(async () => {
    async function connectDb() {
        try {
            const options = {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                }
            };
            mongoose.connection.once("open", function () {
                gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
            })
            mongoose.set('strictQuery', false);
            await mongoose.connect(MONGODB_URI, options);
            console.log('connected to system database!');
            return Promise.resolve({ connection: mongoose.connection });
        } catch (err) {
            return Promise.reject(err);
        }
    }
    const connected = await connectDb();
    module.exports = gfs;
})();
