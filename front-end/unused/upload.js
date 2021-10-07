const fleek = require('@fleekhq/fleek-storage-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const apiKey = "zF6evcGXpvKSXmNEJfvY0Q==";
const apiSecret = "1CxiW7T9ECqgl7tPTS+LPmSTuay069sBHg6WKxmGFr4=";


export async function UploadContent(data) {
    const date = new Date();
    const timestamp = date.getTime();

    const input = {
        apiKey,
        apiSecret,
        key: `file.${timestamp}`,
        data,
    };

    try {
        const result = await fleek.upload(input);
        console.log(result);
    }catch(e) {
        console.log('error', e)
    }

}
const filePath = ('/Users/tomterrific/ethGlobal/LearnEarn/README.md');

const readFile = (filePath, (err, data) => {
  if(!err) {
    UploadContent(data);
  }
})


export default UploadContent