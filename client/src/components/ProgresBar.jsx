import React from 'react';
import './ProgresBar.scss';


function ProgresBar(props) {
  console.log(props);

  function Filler(props) {
    return (
      <div
        className="filler"
        style={{ width:`${props.percentage*100}%` }}
      >
      </div>
    )
  }

  return (
    <div className="progressBar">
      <div className="percentageValue">{parseFloat((props.percentage*100).toFixed(3))}</div>
      <Filler percentage={props.percentage}/>
    </div>
  )
}

export default ProgresBar;




