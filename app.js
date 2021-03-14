import express from 'express';
import pkg from 'mongodb';

const {MongoClient} = pkg;
import bodyParser from 'body-parser';
import routes from './routes.js';

const MONGO_URI = "mongodb://localhost:27017/";
const DB_NAME = 'api-forum';
const SERVER_PORT = 8080

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);


MongoClient.connect(MONGO_URI, async (err, client) => {
    if (err) {
        console.warn(`Failed to connect to the database. ${err.stack}`);
    }
    const db = client.db(DB_NAME);
    const users = db.collection('Users')

    // Creation of Mongo unique Index
    try {
        await users.createIndex({email: 1}, {unique: false});
    } catch (err) {
        console.log(`Error: ${err}`)
    }


    app.locals.db = db;
    app.listen(SERVER_PORT, () => {
        console.info(`Node.js app is listening at http://localhost:${SERVER_PORT}`);
    });
});
