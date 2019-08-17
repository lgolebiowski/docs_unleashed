import React from 'react'
import { string } from 'prop-types'
import './styles/Header.scss'

function Header(props) {
  return (
    <div className="titleWrapper">
      <div className="title" data-selector-type="header-title">
        <h1>
          {props.title}
        </h1>
      </div>
    </div>
  )
}

Header.propTypes = {
  title: string
}

export default Header

