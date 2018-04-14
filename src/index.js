import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App, state} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App {...state} />, document.getElementById('root'));
registerServiceWorker();
