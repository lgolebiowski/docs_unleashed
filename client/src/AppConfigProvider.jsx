import React, { Component, Fragment } from 'react';
import {
  node,
  oneOfType,
  arrayOf,
  shape,
} from 'prop-types';
import _ from 'lodash';
require 
import { withRouter } from 'react-router';

// Create new context
export const ApplicationConfig = React.createContext();

const templates = [
  // eslint-disable-next-line
  require('../staticAppConfig/config.json'),
];


// Then create a Provider Component
class AppConfigProvider extends Component {
  static propTypes = {
    appConfig: shape({}).isRequired,
    match: shape({}).isRequired,
    children: oneOfType([
      arrayOf(node),
      node,
    ]).isRequired,
  };

  // constructor(props) {
  //   super(props);
  // }

  getTemplate(template) {
    return JSON.parse(JSON.stringify(template));
  }

  getConfig = (key) => {
    const { appConfig } = this.props;
    const { match: { params } } = this.props;

    let value = key.split('.').reduce((a, b) => a[b], appConfig);
    if (!value) return '';
    if (value[language]) {
      value = value[language];
    }
    if (key === 'optionKeys') {
      const keys = Object.keys(value);
      value = Object.assign(...Object.entries(value).map(([k]) => (value[k].options[language]))
        .map((item, index) => ({ [keys[index]]: item })));
    }
    return value;
  }

  render() {
    const { children } = this.props;
    const value = {
      getConfig: this.getConfig,
    };

    return (
      <Fragment>
        <ApplicationConfig.Provider value={value}>
          {children}
        </ApplicationConfig.Provider>
      </Fragment>
    );
  }
}

export default AppConfigProvider;
