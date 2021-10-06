import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IpfsUpload from './ipfsUpload';
import Answers from './Answers'

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            
            <TextField
              placeholder="Enter the ERC-20 Contract Address"
              label="Contract Address"
              onChange={handleChange('contractAddress')}
              defaultValue={values.contractAddress}
              margin="normal"
              fullWidth
            />
            <IpfsUpload title="Enter Campaign Content/Questions"
            onChange={handleChange('campaignContent')}
             />
            
            <br />
            
            <br />
            <Answers
              placeholder="Type Answer"
              label="Question 2 Answer"
              onChange={handleChange('answers')}
              defaultValue={values.answers}
              margin="normal"
              fullWidth
            />
            <Answers
              placeholder="Type Answer"
              label="Question 3 Answer"
              onChange={handleChange('answers')}
              defaultValue={values.answers}
              margin="normal"
              fullWidth
            />
           
            
            
            <br />
            
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default FormUserDetails;