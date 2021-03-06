import React, { useContext, useState} from 'react';
import { NavigationContainer,DefaultTheme, DarkTheme} from '@react-navigation/native';
import { createStackNavigator,TransitionPresets} from '@react-navigation/stack';
import Login from '../src/Screen/Login';
import Detail from '../src/Screen/Detail';
import AddContact from '../src/Screen/AddContact';
import Splash from '../src/Screen/Splash';
import { useColorScheme } from 'react-native-appearance';
import AuthContext from './AuthContext';

const AppStack = createStackNavigator();
function Router() {
  const scheme=useColorScheme();
  const [isScheme,setScheme] = useState(scheme);
    return (
      <NavigationContainer theme={scheme==='dark'?DarkTheme:DefaultTheme}>
        <AuthContext.Provider value={{isScheme,setScheme}}>
            <AppStack.Navigator 
                screenOptions={{ 
                  headerShown: false ,
                  gestureEnabled:false,
                  gestureDirection:'horizontal',
                  ...TransitionPresets.SlideFromRightIOS
                }}
                headerMode='screen'>
                    <AppStack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                    <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <AppStack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
                    <AppStack.Screen name="AddContact" component={AddContact} options={{ headerShown: false }} />
            </AppStack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    );
}
export default Router;