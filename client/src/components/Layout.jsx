import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import StepPage from './StepPage';
import ResultsList from './ResultsList';
import './Layout.scss';


function Layout(props) {
  const { handleImageUpload, getData, loading, fields, fieldId } = props;
  const titles = {
    upload: "Upload file to scan your document.",
    uploading: "Uploading...",
    done: 'Done!',
    download: 'Get data'
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
                loading={loading}
                fieldId={fieldId}
                fields={fields}
              /> }
            />
            <Route path="/upload" render={(props) => <StepPage {...props} titles={titles}/>} />
            <Route path="/done" render={(props) => <StepPage {...props} titles={titles}/>} />
            <Route path="/results" render={(props) => <ResultsList {...props} titles={titles} getJson={(val) => this.getJson(val)} />} />
          </div>
        </Router>
      </div>
    </div>
  )
}

export default Layout
