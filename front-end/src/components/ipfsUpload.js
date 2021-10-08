import { useState } from 'react'
import { create } from 'ipfs-http-client'

const ipfs = create("https://ipfs.infura.io:5001");

export function IpfsUpload() {
  const [fileUrl, updateFileUrl] = useState({
    campaignContent: '',
      })
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const cid = await ipfs.add(file)
      const url = `https://ipfs.infura.io/ipfs/${cid.path}`
      updateFileUrl(url)
      console.log("IPFS cid:", cid);
      console.log(await ipfs.cat(cid));
   
} catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <h1>Upload Campaign Content</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <text src={fileUrl} width="600px" />
        )
      }
    </div>
  );
}

export default IpfsUpload;