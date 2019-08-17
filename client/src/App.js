import React, { Component } from 'react';
import Layout from './components/Layout';
import { array } from 'prop-types';
import './App.css';

class App extends Component {
  state = {
      data: {}
    };
  
  handleImageUpload = event => {
    const files = event.target.files
    this.setState({
      loading: true
    })
    this.postWithFetchUpload(files[0])
  }

  postWithFetchUpload = (file) => {
    const formData = new FormData();
    formData.append('upload', file);
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success:', JSON.stringify(response))
      this.setState({
        fieldId: response,
        loading: false
      })
    });
    }

    checkAbn = async (number, guid) => {
      const url = `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${number}&callback=callback&guid=${guid}`
      const response = await fetch(url , {
        method: 'GET',
        headers:{
          mode: 'no-cors'
        }
      })
    }

    getJson = (json) => {
      let jsonCopy = json.fields;
      const fields = Object.keys(json[0]);
      const replacer = (key, value) => { return value === null ? '' : value } 
      let csv = jsonCopy.map((row) => {
        return fields.map((fieldName) => {
          return JSON.stringify(row[fieldName], replacer)
        }).join(',')
      })
      csv.unshift(fields.join(',')) // add header column

      console.log(csv.join('\r\n'))
    }

    getData = async () => {
      const { fieldId } = this.state;
      const response = await fetch('/getFields', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fieldId)
      })
      const body = await response.json();
      console.log(body);
      this.setState({
        data: body,
      })
    }

    render() {
      this.checkAbn('71545697419', '6fe924c9-491e-4291-b61f-9bc3a540971b');
      const { data: { fields = [] }, loading, fieldId } = this.state;
      return (
        <div>
          <Layout
            fieldId={false}
            fields={fields}
            handleImageUpload={this.handleImageUpload}
            getData={this.getData}
            getJson={(val) => this.getJson(val)}
            loading={false}
          />
        </div>
      );
    }
  }


export default App;

App.defaultProps = {
  fields: [
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
  ],

};

App.propTypes = {
  fields: array,
};
