import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'react-virtualized/styles.css';
import 'rc-tooltip/assets/bootstrap_white.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
