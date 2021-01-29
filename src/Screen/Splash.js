import React from 'react';
import {ActivityIndicator,View} from 'react-native';
import {Appcolors, string} from '../Constant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CommonStyle from './Style'
export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem(string.ASYNC_USERTOKEN);
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Detail' : 'Login');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={CommonStyle.Splashcontainer}>
        <ActivityIndicator size='large' color={Appcolors.DARK_GREEN} />
      </View>
    );
  }
}
