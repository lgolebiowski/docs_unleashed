import React, { Component } from 'react';
import Layout from './components/Layout';
import { array } from 'prop-types';
import './App.css';

class App extends Component {
  state = {
      data: {}
    };
  handleImageUpload = event => {
    const files = event.target.files;
    console.log(event);
    this.setState({
      loading: true,
      filename: files[0].name,
      fileExtension: files[0].type,
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
        fileType: file,
        loading: false
      })
    });
    }

    checkAbn = async (number, guid) => {
     const response = await fetch('/checkAbn' , {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(number)
      })
      let that = this;
      response.json().then(body => {
        function callback(data) {
          that.setState({ abn: data })
        }
        // deliberately called eval - the url is trusted;
        eval(body); 
      })
    }

    getToken = async () => {
      const { fieldId } = this.state;
      const response = await fetch('/getToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fieldId)
      })
      const body = await response.json();
      console.log(body);
      this.setState({
        tkn: body,
      })
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

    getImage = async () => {
      const { fieldId } = this.state;
      const bodyPayload = {
        fieldId,

      }
      const response = await fetch('/getImage', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fieldId)
      })
      // const body = await response.json();
      console.log(response);
      this.setState({
        hasImage: response.ok,
      })
    }

    render() {
      const { 
        data: { fields = [] },
        fileType,
        loading,
        fieldId,
        hasImage, 
        abn
      } = this.state;
      console.log(this.state);
      return (
        <div>
          <button onClick={this.checkAbn}>Check ABN</button>
          <Layout
            fieldId={fieldId}
            fields={fields}
            hasImage={hasImage}
            handleImageUpload={this.handleImageUpload}
            abn={abn}
            fileType={fileType}
            getData={this.getData}
            getImage={this.getImage}
            getJson={(val) => this.getJson(val)}
            checkAbn={this.checkAbn}
            loading={loading}
          />
        </div>
      );
    }
  }


export default App;

App.defaultProps = {
  fields: [],
};

App.propTypes = {
  fields: array,
};
