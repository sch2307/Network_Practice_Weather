import React from 'react';

import {CoreProvider} from './core/CoreManagement';
import Route from './Route';

const App = () => {
  return (
    <>
      <CoreProvider>
        <Route />
      </CoreProvider>
    </>
  );
};

export default App;
