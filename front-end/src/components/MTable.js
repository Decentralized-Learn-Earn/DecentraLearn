import faker from 'faker';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import '../App'

import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    TablePagination,
    TableFooter,
    IconButton
 } from '@material-ui/core';
 const Quiz = require('./Quiz');


const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 720
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
    
    
  }));
  


    
  

  const uniSwap = {
    name:  <Link to="/uniswapbutton">
    <button type="button">
         UniSwap
    </button>
</Link>,
    email: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    phone: "https://uniswap.org/",
    joinDate: faker.date.past().toLocaleDateString('en-US'),
    status: "Active"
    
  }
  const aave = {
    name: <button> Aave</button>,
    email: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    phone: "https://aave.com/",
    joinDate: faker.date.past().toLocaleDateString('en-US'),
    status: "Active"
    
    
  }
  const compound = {
    name: <button>Compound</button>,
    email: "0x673ad3A7b95490934AdA8D999FF9B03C74ED2cDB",
    phone: "https://compound.finance/",
    joinDate: faker.date.past().toLocaleDateString('en-US'),
    status: "Active"
    
  }

  const dleToken = {
    name: <button>Decentralearn</button>,
    email: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    phone: "decentralearn.eth",
    joinDate: faker.date.past().toLocaleDateString('en-US'),
    status: "Active"
    
  }

  let USERS = [aave, compound, uniSwap, dleToken], STATUSES = ['Active'];
for(let i=0;i<4;i++) {
    USERS[aave, uniSwap, compound, dleToken] = {
      
        
    }
}

function MTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    
      
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Current Campaigns</TableCell>
            <TableCell className={classes.tableHeaderCell}>Start Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            
            <TableRow key={row.name}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          
                          
                      </Grid>
                      <Grid item lg={10}>
                       
                      
                
                        
                          
                          
                      
                      
                     
                      
                            <Typography className={classes.name}>{row.name}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.phone}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              
              <TableCell>{row.joinDate}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'Active' && 'green') ||
                        (row.status === 'Complete' && 'red'))
                    }}
                  >{row.status}</Typography>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
   
  );
}

export default MTable;