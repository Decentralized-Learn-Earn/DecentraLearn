
   
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';




export class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  

  render() {
    const {
      values: { contractAddress, campaignContent, answers, tokenAmount,}
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Confirm User Data" />
            <List>
              <ListItem>
                <ListItemText primary="contractAddress" secondary={contractAddress} />
              </ListItem>
              <ListItem>
                <ListItemText primary="campaignContent" secondary={campaignContent} />
              </ListItem>
              <ListItem>
                <ListItemText primary="answers" secondary={answers} />
              </ListItem>
              <ListItem>
                <ListItemText primary="tokenAmount" secondary={tokenAmount} />
              </ListItem>
              
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Confirm & Create Campaign</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;