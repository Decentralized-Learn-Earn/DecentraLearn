import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Form } from 'react-bootstrap';
import '../../src/App.css'


const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function UserForm() {

  const [buf, setBuf] = useState();
  const [hash, setHash] = useState("");
  const [loader, setLoader] = useState(false);
  

  const captureFile = (event) => {
    event.stopPropagation()
    event.preventDefault()
    const file = event.target.files[0]
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => convertToBuffer(reader)
  };

  const convertToBuffer = async (reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    setBuf(buffer);
  };
  


  const onSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    let ipfsId
    const buffer = buf
    await ipfs.add(buffer)
      .then((response) => {
        ipfsId = response[0].hash
        console.log("Generated IPFS Hash: ", ipfsId)
        setHash(ipfsId);
      }).catch((err) => {
        console.error(err)
        alert('An error occured. Please check the console');
      })
    setLoader(false);
  }
  if (loader) {
    return (
      <div>
        <h2>Please wait...Uploading to IPFS</h2>
      </div>
    )
  }
  
    
    
  return (
  
    <div className="Form">
      
      <h1>Complete Form to Create Campaign</h1>
      <a href={"https://ipfs.io/ipfs/QmX6K8UB2V1TVjPzkb4JMU6HSxyKdLuW3zzgtrwUKEckGH"}>Fill out Template</a>
      <br/>
      <br/>
      <a href={"https://ipfs.io/ipfs/QmRyDQBHrMwGKgzrjGJUZTWEJqbzsBqZPWVjydrYZivH8R"}>Example Template</a>
      
      <br/>
            <TextField
              placeholder="Enter Address"
              label="ERC20 Token Address"

              margin="normal"
              halfWidth
            />
            <br />
            <TextField
              placeholder="Enter Amount"
              label="Deposit Tokens"

              margin="normal"
              halfWidth
            />
            <br />
            <TextField
              placeholder="Choose Amount"
              label="Payout per User"

              margin="normal"
              halfWidth
            />
           
            <br/>
            <br/>
            
      <Form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} required />
        <br/>
        <br/>
        <Button type="submit">Submit</Button>
      </Form>
      <h6>IPFS Hash: {hash}</h6>
      
      
      
    </div>
  );
}

export default UserForm;