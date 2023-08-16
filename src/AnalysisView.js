import React from 'react';

import AnalysisCard from './AnalysisCard.js';


// Maps props to AnalysisCard component
// TODO: extend this or refactor it out
function AnalysisView(props){
  var { txt } = props


  var cardData = txt.cardData()
  return cardData.map((data, idx)=>{
  	return <AnalysisCard
  		key={`analysis-card-${idx}`} data={data}
  		/>
  })

}

export default AnalysisView