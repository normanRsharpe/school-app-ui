import React from 'react';
import {AppProvider} from "./context/AppContext";

import Main from "./components/Main/Main";

const App: React.FC = () => {
  return (
    <AppProvider>
        <Main/>
    </AppProvider>
  );
}

export default App;
