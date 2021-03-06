/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import history from './history';
import router from './router';
/* eslint-disable import/no-unresolved */
import routes from '!!./utils/routes-loader!./routes.json';
/* eslint-enable import/no-unresolved */

const context = { history, store };
const container = document.getElementById('container');

// The top-level React component the goal of which is to provide
// context variables such as Redux store to all the child components
class App extends React.Component {
  static childContextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  };
  static propTypes = {
    component: PropTypes.node.isRequired,
  };
  getChildContext() { return context; }
  render() { return this.props.component; }
}

function render(location) {
  router.resolve(routes, { path: location.pathname })
    .then(component => {
      ReactDOM.render(<App component={component} />, container);
    });
}

history.listen(render);
render(history.getCurrentLocation());
