import React from 'react'
import ProgresBar from './ProgresBar'
import './ResultsItem.scss';

function ResultsItem(props) {
  console.log()

  const renderItems = (item) => {
    if(item[0] === 'confidence') { 
      return <ProgresBar percentage={item[1]}/>
     }
     return <div className='element'>{item[1]}</div>
  }

  const { result, header } = props;
  return (
    <div className="listItems">
      <div singleItemWrapper>
        <div className={header ? 'flex-row header' : 'flex-row'} role="rowgroup">
          {result.map(i => renderItems(i))}
        </div>
      </div>
    </div>
  )
}

export default ResultsItem