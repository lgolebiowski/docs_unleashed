import React from 'react'
import { array } from 'prop-types';
import { Link } from "react-router-dom";
import DocumentHeader from './DocumentHeader';
import ProgressCircle from './ProgressCircle';
import ResultsItem from './ResultsItem';
import Button from './Button';
import './ResultsList.scss';

const fields = [
  {
    name: 'invoice.gst',
    value: '304.80',
    confidence: 0.9681321445013021,
    boundingBox: [Object]
  },
  {
    name: 'invoice.dueDate',
    value: '2018-11-11',
    confidence: 0.5933404538436766,
    boundingBox: [Object]
  },
  {
    name: 'invoice.purchaseOrderNo',
    value: null,
    confidence: 0.9429813746456704,
    boundingBox: null
  },
  {
    name: 'invoice.total',
    value: '2844.80',
    confidence: 0.9120387857678078,
    boundingBox: [Object]
  },
  {
    name: 'invoice.amountDue',
    value: '2844.80',
    confidence: 0.8467959087169304,
    boundingBox: [Object]
  },
  {
    name: 'invoice.amountPaid',
    value: null,
    confidence: 0.8913786573543437,
    boundingBox: null
  },
  {
    name: 'invoice.tax',
    value: '304.80',
    confidence: 0.9230812675589126,
    boundingBox: [Object]
  },
  {
    name: 'invoice.subTotal',
    value: '2540.00',
    confidence: 0.9819441432788888,
    boundingBox: [Object]
  },
  {
    name: 'document.supplierGSTN',
    value: null,
    confidence: 0.9542778193680761,
    boundingBox: null
  },
  {
    name: 'document.referenceNo',
    value: 'INVO2061',
    confidence: 0.9115599416426258,
    boundingBox: [Object]
  },
  {
    name: 'document.type',
    value: [Object],
    confidence: 0.6805119999999999,
    boundingBox: null
  },
  {
    name: 'document.supplierABN',
    value: null,
    confidence: 0.8407658089135305,
    boundingBox: null
  },
  {
    name: 'document.date',
    value: '2018-11-11',
    confidence: 0.9747789321168238,
    boundingBox: [Object]
  }
]

function ResultsList(props) {

  const getFiltered = (type) => {
    return (
    fields
    .filter(item => item.value)
    .map(field => Object[type](field)
    .filter(item => (typeof item[1] === 'string' || typeof item[1] === 'number')))
  )}

  console.log(fields);
  let filtered = getFiltered('entries');
  let filteredHeaders = getFiltered('entries').slice(0,1);

  const getList = (content, headers) => {
   return content.map(result => {
      console.log(result);
      return (
        <ResultsItem
          result={result}
          key={result.name}
          header={headers}
        />
      )
    })
  }

  return (
    <div>
      <div className="resultsPageButtonWrapper">
          <Link to={'/'}>
            <Button
              title='Upload new document'
            />
          </Link>
      </div>
      <div className="resultsListWrapper">
        <DocumentHeader/>
        <ProgressCircle/>
        <div className="listContainer" role="table" aria-label="Fields">
          {getList(filteredHeaders, true)}
          {getList(filtered, false)}
        </div>
      </div>
    </div>
  )
}

export default ResultsList

ResultsList.defaultProps = {

};

ResultsList.propTypes = {
  fields: array,
};