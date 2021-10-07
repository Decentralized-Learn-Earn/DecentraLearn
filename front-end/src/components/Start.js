import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import React from 'react';

const Start = ({ onQuizStart }) => {
  return(
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h1>Start the quiz</h1>
          <p>Good luck!</p>
          <Button color="primary" variant="contained" className="button is-info is-medium" onClick={onQuizStart}>Start</Button>
        </div>
      </div>
    </div>
  );
}

export default Start;