import React from 'react';

const Html = ({js, css, html, initialState}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Universal React-Redux Simple TO-DO List</title>
      <meta name="theme-color" content="#ffffff" />
      {css.map(css => <link key={css} rel="stylesheet" href={`/static/${css}`} />)}
    </head>
    <body>
      <div
        id="react-view"
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__=${JSON.stringify(initialState)}`
        }}
      />
      {js.map(js => <script defer key={js} src={`/static/${js}`} />)}
    </body>
  </html>
);

export default Html;
