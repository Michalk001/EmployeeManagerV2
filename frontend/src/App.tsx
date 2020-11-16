import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import {Header} from "./components/header/Header";

import {GlobalProvider} from "./context/Provider";
import {AppRoutes} from "./routing/AppRoutes";

function App() {

  return (
      <GlobalProvider>
          <BrowserRouter>
              <Header />
              <AppRoutes />
          </BrowserRouter>
      </GlobalProvider>
  );
}

export default App;
