import React, { useContext, useEffect, useState, } from 'react'
import { View, BackHandler, Keyboard, Alert, ActivityIndicator, StyleSheet } from 'react-native'
import ButtonControl from '../Controls/ButtonControl'
import TextInputControl from '../Controls/TextInputControl'
import { string } from '../Constant';
import Header from '../Controls/Headercontrol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../AuthContext';
import CommonStyle from './Style'
import { heightPercentageToDP as hp } from '../Utils/LayoutMeasurement';

let Name = React.createRef();
let Pwd = React.createRef();

const Login = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
    })
    const [extraScrollHeight, setExtraScrollHeight] = useState(0)
    const [isLoader, setIsLoader] = useState(false)
    const navigation = useNavigation()
    const { isScheme } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            header: () => (
                <Header Headertxt={string.LOGIN} SearchView={false} />
            ),
        })
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            backHandler?.remove()
        }
    }, [])

    const handleBackButtonClick = () => {
        BackHandler.exitApp();
        return true;
    }

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const _onPressSignIN = function () {
        Keyboard.dismiss()
        const { username, password } = userData;
        if (username == '') {
            Alert.alert('Please enter email');
            return;
        }
        else if (!validateEmail(username)) {
            Alert.alert('Please enter valid email');
            return;
        }
        else if (password == '') {
            Alert.alert('Please enter password');
            return;
        }
        setIsLoader(true)
        setTimeout(async () => {
            setIsLoader(false)
            var LoginData = {
                'type': 0,
                "Email": username,
                "Name": password,
            }
            let username = await AsyncStorage.getItem(string.ASYNC_USERNAME)
            let pwd = await AsyncStorage.getItem(string.ASYNC_PWD)
            if (username != userData.username || pwd != userData.password) {
                await AsyncStorage.removeItem(string.ASYNC_DATA)
                await AsyncStorage.setItem(string.ASYNC_USERNAME, userData.username)
                await AsyncStorage.setItem(string.ASYNC_PWD, userData.password)
                await AsyncStorage.setItem(string.ASYNC_USERTOKEN, JSON.stringify(LoginData)).then(() => {
                    navigation.navigate('Detail');
                    setUserData({
                        username: '',
                        password: '',
                    })
                    return;
                }).catch(err => console.log(err))
            }
            else {
                await AsyncStorage.setItem(string.ASYNC_USERNAME, userData.username)
                await AsyncStorage.setItem(string.ASYNC_PWD, userData.password)
                await AsyncStorage.setItem(string.ASYNC_USERTOKEN, JSON.stringify(LoginData)).then(() => {
                    navigation.navigate('Detail');
                    setUserData({
                        username: '',
                        password: '',
                    })
                    return;
                }).catch(err => console.log(err))
            }


        }, 1000)

    };

    return (
        <View style={styles.contianer}>
            <KeyboardAwareScrollView
                bounces={false}
                enableOnAndroid={true}
                extraScrollHeight={extraScrollHeight}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                <View style={CommonStyle.Logincontainer}>
                    <View style={styles.InputTextContainer}>
                        <TextInputControl
                            ref={Name}
                            value={userData.username}
                            onChangeText={(text) => setUserData({ ...userData, username: text })}
                            placeholder={string.EMAIL_PLACEHOLDER}
                            keyboardType={'email-address'}
                            underlineColorAndroid='transparent'
                            HeaderTxt={string.EMAIL}
                            returnKeyLabel="next"
                            returnKeyType="next"
                            onSubmitEditing={() => Pwd.current.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInputControl
                            value={userData.password}
                            ref={Pwd}
                            returnKeyLabel="done"
                            returnKeyType="done"
                            onChangeText={(text) => setUserData({ ...userData, password: text })}
                            placeholder={string.PASSSWORD_PLACEHOLDER}
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            HeaderTxt={string.PASSSWORD}
                            onFocus={(event) => { setExtraScrollHeight(hp('20')) }}

                        />
                        <ButtonControl
                            ButtonTitle='Log In'
                            ButtonPress={() => _onPressSignIN()}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            {
                isLoader
                &&
                <View style={CommonStyle.loginLoader}>
                    <ActivityIndicator style={CommonStyle.LoginIndicator} color='white' size='large' />
                </View>
            }
        </View>
    )
}

const styles=StyleSheet.create({
    contianer:{
        flex:1
    },
    InputTextContainer:{
        flex: 1,
        flexDirection: 'column',
        borderColor: 'blue', 
        borderWidth: 0 
    }
})

export default Login

