import React from 'react';
import {View, Text, LogBox} from 'react-native';
import Navigation from './src/navigation/Index';
import 'react-native-gesture-handler';
import store, {persistor} from './src/redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
