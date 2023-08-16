import React from 'react';

import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardHead:{
  	maxHeight: theme.spacing(1),
    backgroundColor:theme.palette.secondary.main,
  },
  redMessage:{
    float:'right',
    backgroundColor:theme.palette.primary.main,
    margin:theme.spacing(1),
    minWidth:'51%',
    maxWidth:'70%',
    textAlign:'left'
  },
  blueMessage:{
  	float:'left',
  	backgroundColor:theme.palette.primary.dark,
  	margin:theme.spacing(1),
  	minWidth:'51%',
    maxWidth:'70%',
  	textAlign:'left'
  }

}));


function Message(props){
  var { msg } = props
  const classes = useStyles();

  var msgCls
  switch(msg.author){
    case "red":
      msgCls = classes.redMessage
      break
    case "blue":
      msgCls = classes.blueMessage
      break
    default:
      msgCls = classes.redMessage
      break
  }
  return <Grid item>
            <Card className={msgCls}>

            {/* Head of message*/}
            <CardHeader className={classes.cardHead} title={
              <Typography style={{textOverflow:'ellipsis', whiteSpace:'nowrap'}}
               variant='subtitle2'>
              {`Message from ${msg.author}`}</Typography>
            } />

            {/* Main body of message*/}
            <Typography gutterBottom variant='h6'>
            {`${msg.text}`}
            </Typography>

            {/* Datetime of message*/}
            <Typography style={{float:'right'}}
            variant='caption'>
            {`${msg.time}`}</Typography>

            </Card>
        </Grid>

}

export default Message