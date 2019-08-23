import React from 'react'


export default function PreviewModal(props) {
  const { img_path, hasImage } = props
  if (hasImage) {
    return (
      <div>
        <img src={img_path} className="" alt="logo" />
      </div>
    )
  }
    return null;
}
