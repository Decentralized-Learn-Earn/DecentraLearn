const fleek = require('@fleekhq/fleek-storage-js');   

const hash = process.argv[2];

const testFunctionGet = async () => {
  const input = {
    hash,
  };

  try {
    const result = await fleek.getFileFromHash(input);
    console.log('result', result);
  } catch(e) {
    console.log('error', e);
  }
}

testFunctionGet();