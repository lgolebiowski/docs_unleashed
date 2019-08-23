import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import Button from './Button';
import Header from './Header';
import Spinner from './Spinner';
import img_main from './images/img_main.svg';
import img_done from './images/img_done.svg';
import './StepPage.scss';

function StepPage(props) {

  const delayedRedirect = (time) => {setTimeout(
    delayIt(true), time
  )}

  const [redirect, delayIt] = useState(false);

  useEffect(() => {
    delayedRedirect(9800)
  });

  const { 
    titles,
    handleImageUpload,
    getData,
    loading,
    fieldId,
    fields
  } = props;
  return (
    <div className="StepPageWrapper">
        <img src={img_main} className="" alt="logo" />
        {loading &&
          <Fragment>
            <div className="headerWrapper">
              <Header title={titles.uploading}/>
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
          <Button
            title='upload'
            handleImageUpload={handleImageUpload}
            isInput={true}
          />
        </Fragment>
        }
        {fieldId &&
          <Fragment>
            <div className="titleMain">
              <Header title={titles.done}/>
            </div>
            <div className="iconWrapper">
              <img src={img_done} className="" alt="logo" />
            </div>  
            {/* <Link to={{
              pathname: '/results',
              }}>
                <Button
                  title={titles.download}
                />
              </Link> */}
              {redirect &&
              <Redirect
                to={{
                  pathname: "/results",
                }}
              />
              }
            
          </Fragment>
        }
    </div>
  )
}


export default StepPage;
