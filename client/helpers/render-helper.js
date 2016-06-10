import ReactDOMServer from 'react-dom/server';

const renderToString = (ReactComponent) => {
    console.log(ReactComponent);
    return ReactDOMServer.renderToString(ReactComponent);
}

export { renderToString }