import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  messageSpace:{
    marginBottom:theme.spacing(9),
    overflow:'auto',
    position:'relative',
  },
  textInputBar:{
    display: 'inline-block',
    height: theme.spacing(8),
    width: '100%',
    position:'relative',
  },

}));

// The messages were overlapping with the text drawer
// and this is the hacky solution I went with
function AppLayout(props) {
    const { messageSpace, textInputBar } = props
    const classes = useStyles()
    return(
      <Fragment>
        <div className={classes.messageSpace}>
        {messageSpace}
        </div>
        <div className={classes.textInputBar}>
        {textInputBar}
        </div>
      </Fragment>


      )
}

export default AppLayout