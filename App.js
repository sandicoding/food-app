import React, { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import ContainerApp from "./ContainerApp";
import { persistor, store } from "./redux/store";

const App = () => {


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ContainerApp />
      </PersistGate>
    </Provider>
  )
};

export default App;
