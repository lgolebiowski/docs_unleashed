import React, { Component } from 'react'
import { array } from 'prop-types';
import { Link } from "react-router-dom";
import DocumentHeader from './DocumentHeader';
import ProgressCircle from './ProgressCircle';
import ResultsItem from './ResultsItem';
import PreviewModal from './PreviewModal';
import Header from './Header';
import Button from './Button';
import Spinner from './Spinner';
import img_main from './images/img_main.svg';
import './ResultsList.scss';


class ResultsList extends Component {

  static getDerivedStateFromProps(props,state) {
    const {
      fields
    } = props;
    return { fields };
  }

  componentDidMount() {
    this.mobileMediaQuery = window.matchMedia(`(max-width: ${768}px)`);
    this.mobileMediaQuery.addListener(this.mobileMediaQueryHandler);
    this.setState({
      isMobile: this.mobileMediaQuery.matches,
    });
    const { fieldId, getImage } = this.props;
    getImage();
  }

  componentDidUpdate(prevProps, prevState) {
    const { fields, fieldId, hasImage, getImage } = this.props;
    const { isLoading } = this.state;
    if (fields && isLoading) { this.setState({isLoading: false})}

    if (prevProps.fieldId !== fieldId) {
      getImage();
    }
    if (prevProps.hasImage !== hasImage) {
      this.setState({
        img_path: fieldId.fileId
      })
    }
  }

  getFiltered = (type) => {
    const { fields } = this.state;
    return (
    fields
    .filter(item => item.value)
    .map(field => Object[type](field)
    .filter(item => (typeof item[1] === 'string' || typeof item[1] === 'number')))
  )}

  getList = (content, headers) => {
   return content.map(result => {
      const { checkAbn } = this.props;
      return (
        <ResultsItem
          result={result}
          key={result.name}
          header={headers}
          checkAbn={checkAbn}
          handleCheckboxChange={(e,r) => this.handleCheckboxChange(e,r)}
        />
      )
    })
  }

  getCsv = async () => {
    debugger;
    const { fieldsChecked } = this.state;
    let fieldsCopy = fieldsChecked
      .map(fi => {
        let fieldCopy = fi
        delete fieldCopy.boundingBox;
        return fieldCopy;
      })
      .filter(field => field.checked)
      .map(fi => {
        let fieldCopy = fi
        delete fieldCopy.checked;
        return fieldCopy;
      })
      console.log({fieldsCopy});
      console.log(JSON.stringify(fieldsCopy));
     
    const response = await fetch('/getCsv', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fieldsCopy)
    })
    const body = await response;
    console.log(body);
  }

  handleCheckboxChange = (event, result) => {
    const { fields } = this.state;
    const { target: { checked } } = event;
    let name = result[0][1];
    const fieldsCopy = [...fields].map((field) => {
      if(field.name === name) {
        field.checked = checked;
      }
      return field;
    });

    this.setState({fieldsChecked: fieldsCopy});
    console.log(fieldsCopy);
  }

  handleGetDataClick = () => {
    const { getData } = this.props;
    this.setState({isLoading: true}, getData)
  }
  
  render() {
    // this.getCSV(this.state.fields);
    let filtered = this.getFiltered('entries');
    let filteredHeaders = this.getFiltered('entries').slice(0,1);
    console.log(filteredHeaders);
    const { titles, getImage, fieldId, hasImage } = this.props;
    const { fields, isLoading, img_path } = this.state;

  return (
    <div>
      <div className="resultsPageButtonWrapper">
          <Button
            title={'get_IMG'}
            onclick={getImage}
          />
          <Link to={'/'}>
            <Button
              title='Upload new document'
            />
          </Link>
      </div>
      <div className="resultsListWrapper">
        <div className="resultsListBox">
         {fieldId &&
          <div>
            <img src={`http://localhost:5000/content/img_${img_path}.png?${Date.now()}`} className="" alt="logo" />
          </div>
        }
          <DocumentHeader/>
          {
            !fields.length &&
            <div className="titleMain">
              <Header title={titles.done}/>
            </div>
          }
          {fieldId &&
          <PreviewModal 
            hasImage={hasImage} 
            img_path={`http://localhost:5000/content/img_${fieldId.fileId}.png`}/>
          }
          {
            !fields.length &&
          <div className="titleMain">
            <Header title={titles.done}/>
          </div> &&
          <Button
            title={titles.download}
            onclick={this.handleGetDataClick}
          />
          }
        </div>
        {
          fields.length
          && <ProgressCircle/>
        }
        {
          isLoading && <Spinner/>}
        <div className="listContainer" role="table" aria-label="Fields">
          { this.getList(filteredHeaders, true) }
          { this.getList(filtered, false) }
          {
            fields.length
            && <div className="resultsListBox">
               <Button
                title={titles.csv}
                onclick={this.getCsv}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )}
}

export default ResultsList

ResultsList.defaultProps = {
  fields: [],
};

ResultsList.propTypes = {
  fields: array,
};