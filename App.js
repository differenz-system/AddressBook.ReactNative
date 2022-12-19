import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import Router from './src/Router'
import { Settings } from 'react-native-fbsdk-next';

export default function App() {

  useEffect(() => {
    initFBSDK()
  }, [])

  const initFBSDK = () => {
    Settings.initializeSDK();
    Settings.setAppID('1087077594777469');
  }

  return (
    <Router />
  );
}


