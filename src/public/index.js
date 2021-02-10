import App from 'GUIBridgeComponent/App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js').then((registration) => {
    //         console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     }, (err) => {
    //         console.log('ServiceWorker registration failed: ', err);
    //     });
    // });
}
