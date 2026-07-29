import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppColors, string } from '../Constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CommonStyle from './Style'
import { useNavigation } from '@react-navigation/native';

const AuthLoadingScreen = () => {
  
  const navigation = useNavigation()

  useEffect(()=>{
    _bootstrapAsync()
  },[])

  const _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem(string.ASYNC_USERTOKEN);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.navigate(userToken ? 'Detail' : 'Login');
  };

  return (
    <View style={CommonStyle.Splashcontainer}>
      <ActivityIndicator size='large' color={AppColors.DARK_GREEN} />
    </View>
  );
}

export default AuthLoadingScreen

