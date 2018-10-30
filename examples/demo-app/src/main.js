// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import document from 'global/document';
import {Provider} from 'react-redux';
import {browserHistory, Router, Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {render} from 'react-dom';
import store from './store';
import App from './app';
// import {getAppUrlPrefix} from './constants/default-settings';

const history = syncHistoryWithStore(browserHistory, store);
// const prefix = getAppUrlPrefix();
// const path = prefix === '' ? '(:id)' : `${prefix}(/:id)`;

// TODO: We can store the auth token with a route callback

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route name="map" path="/map" component={App} />
      <Route path="/(:id)" component={App} />
      <Route path="/demo/(:id)" component={App} />
      {/*
      For Auth we could use a different component because we only need to update
      the locale storage.
      */}
      <Route path="/auth" component={App}/>
    </Router>
  </Provider>
);

render(<Root />, document.body.appendChild(document.createElement('div')));
