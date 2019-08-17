import React from 'react'
import { boolean, string } from 'prop-types';
import './Button.scss';

function Button(props) {
  const { isInput, onClick } = props;
  return (
    <div 
      className="buttonWrapper"
      onClick={onclick}
    >
      {isInput && <input
          // onChange={e => props.handleImageUpload(e)}
          type="file"
          id="fileUpload" 
        />}
      <div className="titleWrapper">
        <p>{props.title}</p>
      </div>
    </div>
  )
}

export default Button

Button.defaultProps = {
  title: '',
  isInput: false,
};

Button.propTypes = {
  title: string,
  isInput: boolean,
};