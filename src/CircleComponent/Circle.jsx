import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../Style/App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function Circle() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress style={{ color: "#00c853", width: "70px", height: "70px", }} />
    </div>
  );
}