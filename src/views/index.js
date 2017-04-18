const Html = ( initialState, html ) => (
    `<!DOCTYPE html
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>

        <script type="application/javascript">
          window.__INITIAL_STATE__=${JSON.stringify(initialState)}
        </script>
      </head>
      <body>
        <div id="react-view">${html}</div>
        <script type="application/javascript" src="static/bundle.js"></script>
      </body>
    </html>`
);

export default Html;