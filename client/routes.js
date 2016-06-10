import React from 'react';
import { renderToString } from './helpers/render-helper';
import Home from './containers/home';


const routes = {
    '/': (req, res) => { res.send(renderToString(<Home/>)) }
}

export default routes;