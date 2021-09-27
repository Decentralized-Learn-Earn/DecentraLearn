const fleek = require('@fleekhq/fleek-storage-js');   

const apiKey = (process.env.FLEEKSTORAGE_KEY);
const apiSecret = (process.env.FLEEKSTORAGE_SECRET);

const testFunctionListFiles = async () => {
  const input = {
    apiKey,
    apiSecret,
    getOptions: [
      'bucket',
      'key',
      'hash',
      'publicUrl'
    ],
  };

  try {
    const result = await fleek.listFiles(input);
    console.log(result);
  } catch(e) {
    console.log('error', e);
  }
}

testFunctionListFiles();