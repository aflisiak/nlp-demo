import React from 'react';

import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ChartistGraph from 'react-chartist'

const useStyles = makeStyles(theme => ({
  cardHead:{
  	maxHeight: theme.spacing(1),
    backgroundColor:theme.palette.secondary.main,
  },
  cardBody:{
    flexGrow:1,
    padding: theme.spacing(2)
  },
  card:{
    margin: theme.spacing(2),
    maxWidth: '450px'
  },

}));

// Parses a single object from TextAnalysis.cardData()
function AnalysisCard(props){
  var { data } = props
  const classes = useStyles();

  return (
    <Grid item>
        <Card className={classes.card}>

        {/* Head of card*/}
        <CardHeader className={classes.cardHead} title={
          <Typography style={
            {textOverflow:'ellipsis', whiteSpace:'nowrap'}
          }
           variant='subtitle2'>
          {data.title}</Typography>
        } />

        {/* Main body of message (a chart)*/}
        <ChartistGraph
        data={data.chartData}
        type={data.chartType}
        options={data.chartOpts} />
        </Card>
    </Grid>
  )
}

export default AnalysisCard