import React from 'react'
import ProgresBar from './ProgresBar'
import Checkbox from './Checkbox'
import './ResultsItem.scss';

function ResultsItem(props) {
  console.log()

  const renderItems = (item) => {
    if (item[0] === 'confidence' && !header) {
      return (
        <ProgresBar percentage={ item[1] }/>
      )
     }
     if (item[0] === 'abn' && !header) {
      return (
        <div className='element_with_check'>
          { header? item[0] : item[1] }
          <button onClick={() => this.checkAbn(item[1])}>
            check ABN
          </button>
        </div>
      )
     }
     return (
     <div className='element'>
        {header? item[0] : item[1]}
      </div>
     )
  }
  const { result, header, checked, handleCheckboxChange } = props;
  const handleLocalCheckboxChange = (e) => handleCheckboxChange(e, result)

  return (
    <div className="listItems">
      <div singleItemWrapper>
        <div className={header ? 'flex-row header' : 'flex-row'} role="rowgroup">
          { 
            header ? <div></div> : <Checkbox
            checked={checked}
            onChange={(e)=>{handleLocalCheckboxChange(e)}}
          />
          }
          {result.map(i => renderItems(i, header))}
        </div>
      </div>
    </div>
  )
}

export default ResultsItem