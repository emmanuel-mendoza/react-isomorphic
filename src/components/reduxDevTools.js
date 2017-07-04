// TODO: Conditionally render the component and use of the enhancer (see ../store.js)
// to use it only in dev environment.

import React from 'react';
import { createDevTools } from 'redux-devtools';

// Using log and dock monitors
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// Building the Redux Dev Tools component using the monitors.
const ReduxDevTools = createDevTools(
  // To review monitors properties check their repositories.
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default ReduxDevTools;
