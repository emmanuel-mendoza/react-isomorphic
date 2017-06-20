const Html = ( initialState, css, html ) => (
    `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
        
        ${css.map(css => `<link key="css" rel="stylesheet" href="static/${css}" />`)}
      </head>
      <body>
        <div id="react-view">${html}</div>
        <script type="application/javascript">
          window.__INITIAL_STATE__=${JSON.stringify(initialState)}
        </script>
        <script type="application/javascript" src="static/bundle.js"></script>
      </body>
    </html>`
);

export default Html;