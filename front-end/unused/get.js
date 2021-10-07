const fleek = require('@fleekhq/fleek-storage-js');   
require('dotenv').config();
const apiKey = (process.env.FLEEKSTORAGE_KEY);
const apiSecret = (process.env.FLEEKSTORAGE_SECRET);
const key = process.argv[2];

const functionGet = async () => {
  const input = {
    apiKey,
    apiSecret,
    key,
    getOptions: ['hash', 'data', 'publicUrl']
  };

  try {
    const result = await fleek.get(input);
    console.log(result);
  } catch(e) {
    console.log('error', e);
  }
}

functionGet();


