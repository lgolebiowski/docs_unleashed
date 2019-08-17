import React from 'react';
import { ApplicationConfig } from './ApplicationConfigProvider';

const AppConfigWrapper = (WrappedComponent, configKey) => props => (
  <ApplicationConfig.Consumer>
    {(context) => {
      let config = {};
      if (context) {
        if (typeof configKey === 'string') {
          config = context.getConfig(configKey);
        } else if (Array.isArray(configKey)) {
          configKey.forEach((key) => {
            Object.assign(config, context.getConfig(key));
          });
        } else {
          throw new Error('configKey must be supplied and be of type [string|Array]');
        }
      }
      return (
        <WrappedComponent
          {...config}
          {...props}
        />
      );
    }}
  </ApplicationConfig.Consumer>
);

export default AppConfigWrapper;