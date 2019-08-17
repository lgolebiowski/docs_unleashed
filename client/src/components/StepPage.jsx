import React, { Fragment } from 'react';
import Button from './Button';
import InputButton from './InputButton';
import Header from './Header';
import Spinner from './Spinner';
import img_main from './images/img_main.svg';
import img_done from './images/img_done.svg';
import './StepPage.scss';

function StepPage(props) {
  const { 
    titles,
    handleImageUpload,
    getData,
    loading,
    fieldId
  } = props;
  return (
    <div className="StepPageWrapper">
      <div>
        <img src={img_main} className="" alt="logo" />
        {loading &&
          <Fragment>
            <div className="headerWrapper">
              <Header title={titles.upload}/>
            </div>
            <div className="iconWrapper">
              <Spinner/>
            </div>
          </Fragment>
        }
        {!loading && !fieldId &&
          <Fragment>
          <div className="title">
            <Header title={titles.upload}/>
          </div>
          <div className="iconWrapper">
            <img src={img_done} className="" alt="logo" />
          </div>
          
          <Button
            title='upload'
            handleImageUpload={handleImageUpload}
            isInput={true}
          />
        </Fragment>
        }
        {/* {fieldId && 
          <Fragment>
            <div className="titleMain">
              <h1>{titles.done}</h1>
            </div>
            <Button
              title={titles.download}
              onclick={getData}
            />
          </Fragment>
        } */}
      </div>
    </div>
  )
}


export default StepPage;
