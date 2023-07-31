import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Header from './header/Header';
import Footer from './footer/Footer';
import Router from '../navigation/RootNavigation';
import styled from 'styled-components/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
const LayoutBody = styled.View`
  background:#393E46;
  height:100%;
`


function Layout(): JSX.Element {
  const target = useSelector(
    (state: any) => state.translate.translateTarget,
  );
  const source = useSelector(
    (state: any) => state.translate.translateSource,
  );
  const activeFooter = useSelector(
    (state: any) => state.navigation.activeFooter,
  );
  AsyncStorage.setItem('translate/target', target);
    AsyncStorage.setItem('translate/source', source);
  return (
    <LayoutBody>
      <Header />
      <Router />
      {activeFooter ? <Footer /> : <></>}
      
    </LayoutBody>
  );
}

export default Layout;
