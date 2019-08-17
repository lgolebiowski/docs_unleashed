import React from 'react'
import { array } from 'prop-types';
import './InputButton.scss';

function InputButton(props) {
  return (
      <div className="buttonWrapper">
        <input
          onChange={e => props.handleImageUpload(e)}
          type="file"
          id="fileUpload" 
        />
        {props.children}
      </div>
  )
}

export default InputButton

InputButton.defaultProps = {
  fields: [],
};

InputButton.propTypes = {
  fields: array,
};