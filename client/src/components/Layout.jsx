import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import StepPage from './StepPage';
import ResultsList from './ResultsList';
import './Layout.scss';


function Layout(props) {
  const { 
    handleImageUpload,
    getData,
    getImage,
    hasImage,
    loading,
    fields,
    fieldId,
    checkAbn,
    abn,
  } = props;

  const titles = {
    upload: "Upload file to scan your document.",
    uploading: "Uploading...",
    done: 'Done!',
    download: 'Get data',
    csv: 'Download as csv'
  }
  return (
    <div>
      <div className="layoutWrapper">
        <Router>
          <div>
            <Route 
              exact path="/"
              render={(props) => <StepPage
                {...props}
                title='Upload'
                titles={titles}
                titleMain='Upload file to scan your document'
                handleImageUpload={handleImageUpload}
                getData={getData}
                getImage={getImage}
                loading={loading}
                fieldId={fieldId}
                fields={fields}
              /> }
            />
            <Route path="/results" 
              render={
                (props) => (
                  <ResultsList 
                    {...props}
                    fields={fields}
                    fieldId={fieldId}
                    abn={abn}
                    titles={titles}
                    getData={getData}
                    getImage={getImage}
                    hasImage={hasImage}
                    checkAbn={checkAbn}
                    getJson={(val) => this.getJson(val)} 
                  />
                )
              }
            />
          </div>
        </Router>
      </div>
    </div>
  )
}

export default Layout
