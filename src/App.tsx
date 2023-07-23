import React from 'react';
import Layout from './layout/Layout';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/store';
import {LogBox} from 'react-native';

function App(): JSX.Element {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
