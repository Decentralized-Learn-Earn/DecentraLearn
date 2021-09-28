const fleek = require('@fleekhq/fleek-storage-js');   

const apiKey = (process.env.FLEEKSTORAGE_KEY);
const apiSecret = (process.env.FLEEKSTORAGE_SECRET);

const testFunctionListBuckets = async () => {
  const input = {
    apiKey,
    apiSecret,
  };

  try {
    const result = await fleek.listBuckets(input);
    console.log(result);
  } catch(e) {
    console.log('error', e);
  }
}

testFunctionListBuckets();