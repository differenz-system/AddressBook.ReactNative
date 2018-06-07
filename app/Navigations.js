
import Login from './Login'
import AddContact from './AddContact'
import Detail from './Detail'





import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}




class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppStack = StackNavigator({ 
  Detail: {
            screen: Detail,
  },
  Add: {
    screen: AddContact,
  }, 
},
{
      // initialRouteName: initialRouteName,
      navigationOptions: {
        headerLeft: null,
        headerStyle: {
          // color:'white',
          backgroundColor: '#008277',
          borderBottomColor: '#ffffff',
        },
        headerTitleStyle: {
          color:'white',
          fontSize: 18,
          justifyContent: 'space-between',
          textAlign: 'center',
        },
      }
    }
);
const AuthStack = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
        color:'white'
        // shadowColor: 'transparent',
        // width: '100%',
      },
    },
  },
},{
      navigationOptions: {
        headerLeft: null,
        headerStyle: {       
          backgroundColor: '#008277',
          borderBottomColor: '#ffffff',
          // borderBottomWidth: 3,
          // alignSelf:'center'
        },
        headerTitleStyle: {
          color:'white',
          fontSize: 18,
          justifyContent: 'space-between',
          textAlign: 'center',
        },
      }
    }
);

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
