const express = require('express');
const debug = require('debug')('app:productRouter');
const { MongoClient, ObjectID } = require('mongodb');

const products = require('../data/products.json');

const productsRouter = express.Router();

productsRouter.route('/').get((req, res) => {
  const url =
  'mongodb+srv://dbUser:<password>@cluster0.hgqmn72.mongodb.net/?retryWrites=true&w=majority';
  
  const dbName = 'ITWorx_NodeJS_Practice';


  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const products = await db.collection('products').find().toArray();

      res.render('products', { products });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

productsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
  'mongodb+srv://dbUser:<password>@cluster0.hgqmn72.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'ITWorx_NodeJS_Practice';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const product = await db
        .collection('products')
        .findOne({ _id: new ObjectID(id) });

      res.render('product', {
        product,
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = productsRouter;
