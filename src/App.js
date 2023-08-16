import React, { useState } from 'react';
import MessageSpace from './MessageSpace.js';
import TextInputBar from './TextInputBar.js';
import AppLayout from './AppLayout.js';

import dummyMessages from './dummyMessages.js';

import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import lightBlue from '@material-ui/core/colors/lightBlue';

import Backdrop from '@material-ui/core/Backdrop';

import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles/';

import TextAnalysis from './textAnalysis.js';

const theme = createMuiTheme({
  palette: {
    primary: {main:grey[100]},
    secondary: {main:lightBlue[200]},
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background:{
      default:lightBlue[300]
    }
  },
  typography: {
    useNextVariants: true,
  },
});


const App = (props) => {

  const [messages, setMessages] = useState(dummyMessages)
  const [user, setUser] = useState("red");


  const mountMessage = (e, contents) =>{


      var text = contents
      var msgUpdate = messages
      msgUpdate.push({text:text, time: new Date().toLocaleString(),
      author:user})
      setMessages(msgUpdate)
      if (user === 'red'){
        setUser('blue')
      }else{
        setUser('red')
      }
      e.preventDefault()
    }


  return (
      <ThemeProvider theme={theme}>
      <CssBaseline/><Backdrop open />
       <AppLayout
       messageSpace={<MessageSpace
       messages={messages}
       txt={new TextAnalysis(messages)}
       />}
       textInputBar={<TextInputBar
       mountMessage={mountMessage}
       messages={messages}
       user={user}
       />}
        />


       </ThemeProvider>


    );

}

export default App;