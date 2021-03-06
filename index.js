import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'
import * as serviceWorker from './serviceWorker'
import 'leaflet/dist/leaflet.css'
import 'typeface-roboto'
import 'react-leaflet-markercluster/dist/styles.min.css'
import { CssReset } from '@dhis2/ui'

ReactDOM.render(
    <>
        <CssReset />

        <App />
    </>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change.
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
