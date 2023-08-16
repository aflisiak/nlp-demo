import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root:{
    flexGrow:1,
    position:'relative',
    overflow:'auto',
    width: '100%',
    height: '100%'
  },
  messageDrawer:{
    flexGrow:1,
    bottom: theme.spacing(8),
    overflow:'scroll'
  },
  writingDrawer:{
    height:theme.spacing(8),
  },
  textField:{
    flexGrow:1,

  }

}));

// A persistent drawer with the message submit logic.
// Includes shift+enter and send button click event handling
// Takes a user prop to display in the message hint
// e.g. "Write message as red"
function TextInputDrawer(props){
  const [contents, setContents] = useState('');

  const classes = useStyles()

  // Parse props
  const mountMessage = props.mountMessage
  const { user } = props

  // Message management is in parent...
  const handleSubmit = (e) => {
    e.persist()
    if (e.shiftKey && (e.key === 'Enter')){
      mountMessage(e, contents)
      setContents('')
      }
  }


  return <Drawer variant="persistent" anchor="bottom" className={classes.writingDrawer} open >
        <Grid  container

        direction="row"
        alignItems="stretch">
        <TextField
          id="filled-multiline-static"
          label={`Write a message as ${user}`}
          value={contents}
          onKeyPress={(e)=>{handleSubmit(e,contents)}}
          onChange={(e)=>{setContents(e.target.value)}}
          multiline
          rows="4"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <Button
        onClick={
          (e)=>{
            mountMessage(e, contents)
            setContents('')
          }
        }>Send
        </Button>
        </Grid></Drawer>
  }

  export default TextInputDrawer