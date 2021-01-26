
import React, { Component } from 'react'
import { View, Text,BackHandler, Keyboard, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import ButtonControl from '../Controls/ButtonControl'
import TextInputControl from '../Controls/TextInputControl'
import {LoginManager,AccessToken,} from 'react-native-fbsdk';
import {font,colors,icon,string} from '../Constant';
import Header from '../Controls/Headercontrol';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonStyle from './Style'
let Name=React.createRef();
let Pwd=React.createRef();
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoader: false,
            user:''
        }
    }
   
    componentDidMount(){
        this.props.navigation.setOptions({
            headerShown:true,
            header: () => (
                <Header Headertxt={string.LOGIN} SerchView={false} />
            ),
        })

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    _onPressFBLogin = function () {
        Keyboard.dismiss()
        LoginManager.logInWithPermissions(['email','public_profile']).then(result => {
            if (result.isCancelled) {
                console.log('loginCanceled')
            } else {
                console.log('loginSuceessful')
                AccessToken.getCurrentAccessToken().then((data) => {
                    AsyncStorage.setItem(string.ASYNC_USERTOKEN, data.accessToken.toString()).then(() => {
                    this.props.navigation.navigate('Detail');
                    return;
                }).catch(err => console.log(err))
                });
            }
        }).catch(err => console.log(err))
    }

    _onPressSignIN = function () {
        Keyboard.dismiss()
        const { username, password } = this.state;
        if (username == '') {
            Alert.alert('Please enter email');
            return;
        }
        else if (!this.validateEmail(this.state.username)) {
            Alert.alert('Please enter valid email');
            return;
        }
        else if (password == '') {
            Alert.alert('Please enter password');
            return;
        }
        this.setState({ isLoader: true })
        setTimeout(async() => {
            this.setState({ isLoader: false })
            var LoginData = {
                'type': 0,
                "Email": this.state.username,
                "Name": this.state.password,
            }
            let username=await AsyncStorage.getItem(string.ASYNC_USERNAME)
            let pwd=await AsyncStorage.getItem(string.ASYNC_PWD)
            console.log(username);
            console.log(this.state.username);
            console.log(pwd);
            console.log(this.state.password);
            if(username!=this.state.username || pwd!=this.state.password)
            {
                await AsyncStorage.removeItem(string.ASYNC_DATA)
                await AsyncStorage.setItem(string.ASYNC_USERNAME,this.state.username)
                await AsyncStorage.setItem(string.ASYNC_PWD,this.state.password)
                await AsyncStorage.setItem(string.ASYNC_USERTOKEN, JSON.stringify(LoginData)).then(() => {
                    this.props.navigation.navigate('Detail');
                    this.setState({
                        username: '',
                        password: '',
                    })
                    return;
                }).catch(err => console.log(err))
            }
            else{
                await AsyncStorage.setItem(string.ASYNC_USERNAME,this.state.username)
                await AsyncStorage.setItem(string.ASYNC_PWD,this.state.password)
                await AsyncStorage.setItem(string.ASYNC_USERTOKEN, JSON.stringify(LoginData)).then(() => {
                    this.props.navigation.navigate('Detail');
                    this.setState({
                        username: '',
                        password: '',
                    })
                    return;
                }).catch(err => console.log(err))
            }
            
           
        }, 1000)

    };
  
    render() {
        return (
            <View style={{ flex: 1,backgroundColor:colors.WHITE}}>
                <KeyboardAwareScrollView
                    bounces={false}
                    enableOnAndroid={true}
                    extraScrollHeight={this.state.extraScrollHeight}
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}>
                    <View style={CommonStyle.Logincontainer}>
                            <View style={{ flex: 1, flexDirection: 'column',  borderColor: 'blue', borderWidth: 0 }}>
                                <TextInputControl
                                    ref={Name}
                                    value={this.state.username}
                                    onChangeText={(text) => this.setState({ username: text })}
                                    placeholder={string.EMAIL_PLACEHOLDER}
                                    keyboardType={'email-address'}
                                    underlineColorAndroid='transparent'
                                    HeaderTxt={string.EMAIL}
                                    returnKeyLabel="next"
                                    returnKeyType="next"
                                    onSubmitEditing={()=> Pwd.current.focus()}
                                    blurOnSubmit={false}
                                />
                                <TextInputControl
                                    value={this.state.password}
                                    ref={Pwd}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholder={string.PASSSWORD_PLACEHOLDER}
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    HeaderTxt={string.PASSSWORD}
                                    onFocus={(event) => {this.setState({extraScrollHeight:font.ISIOS? 150:150}) }}
                                />
                                <ButtonControl
                                    ButtonTitle='Log In'
                                    ButtonPress={() => this._onPressSignIN()}
                                />
                                <Text style={CommonStyle.OrTxt}>Or</Text>
                                
                                
                            <View style={CommonStyle.FBView}>
                                <Image source={icon.FACEBOOK} style={CommonStyle.FbImg}/>
                                <TouchableOpacity style={CommonStyle.FBButtonControl} onPress={() => this._onPressFBLogin()}>
                                <Text style={CommonStyle.FBfont}>{string.FB_LOGIN}</Text>
                                </TouchableOpacity>
                            </View>

                           
                            </View>
                    </View>
                </KeyboardAwareScrollView>
                {
                    this.state.isLoader &&
                    <View style={CommonStyle.loginLoader}>
                        <ActivityIndicator style={CommonStyle.LoginIndicator} color='white' size='large' />
                    </View>
                }
            </View>
        );
    }
}
