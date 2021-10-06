import { useState } from 'react'
import { create } from 'ipfs-http-client'
import { Input, TextField } from '@material-ui/core';

const ipfs = create("https://ipfs.infura.io:5001");

export function IpfsUpload() {

    
    
    

  const [answerUrl, updateAnswerUrl] = useState({
    answers: '',
  })
  async function onChange(e) {
    
    try {
        const doc = JSON.stringify({
            input: ipfs.add('')
            
          });
      const cid = await ipfs.add(doc)
      const other = await ipfs.cat(cid);
      const url = `https://ipfs.infura.io/ipfs/${cid.path}`
      updateAnswerUrl(url)
      console.log("IPFS cid:", cid);
      console.log("cat:", other);
   
} catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    
    <div className="App">
      <TextField
      placeholder="Type Question Here"
      label="Create Question"
        onChange={onChange}
        margin="normal"
        fullWidth
      />
      {
        answerUrl && (
          <text src={answerUrl} width="600px" />
        )
      }
    </div>
  );
}

export default IpfsUpload;