import logo from './logo5.jpg';
import {useState} from 'react';
import React from 'react';
import './App.css';
import Navbar from './components';
import {BrowserRouter as Router} from 'react-router-dom';
import uploadContent from './ipfs/upload';
import './components/metamask';
import OnboardingButton from './components/metamask';







function App() {
  const [form, setForm] = useState({
    address: '',
    questions: '',
    content: '',
    token: '',
    
  });
  const NavBtnLink = document.getElementsByClassName('Navbar')[4]
const WalletConnect = document.getElementsByClassName('Wallet-connect')[0]

  const [error, setError] = useState({
    address: ''
  })
  
  const onChange = (e) => {
    const {value, name} = e.target;

    setForm((state) => ({
      ...state,
      [name]: value

    }));
  }

  const showData = () => {
    console.log('Form: ', form);
    console.log('IPFS/FLEEK info', uploadContent)
  
  }

  

  const onSubmit = (e) => {
    if(form.address.length !== 42) {
      setError((state) => ({
        address: 'Ethereum address must be 42 characters'
      }));
      return;
    }
    uploadContent()
    showData();
    e.preventDefault();
  }

  return (
    
    <div className="Navbar">
      <Router>
      <Navbar />
    </Router>

    <div className="Wallet-connect">
      
    </div>
      
      <header className="App-header">
        
        <img src={logo} alt="HTML5 Icon" width="550" height="400"></img>
        
       <form onSubmit={onSubmit}>
         <label>
           Contract Address:
           <input onChange={onChange} name="address" value={form.address}/>
         </label>
         {!!error.name && <i>{error.name}</i>}
         <hr/>

         <label>
           Number of Questions: 
           <select onChange={onChange} value={form.questions} name="questions">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
           </select>
         </label>
         <hr/>

      
         <label>
           Enter Content:
           <textarea onChange={onChange} name="content" value={form.content}/>
           
         </label>
         <hr/>

         <label>
           Token Amount:
           <input onChange={onChange} name="token" value={form.token}/>
         </label>
         <hr/>
         
         <div>
         <button>Submit</button>
         </div>  
       </form>
      </header>
    </div>
  );
}

export default App;
