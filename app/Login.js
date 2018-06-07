
import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage, ActivityIndicator } from 'react-native'
//import  {resource} from './constants';
import ButtonControl from '../Controls/ButtonControl'
import TextInputControl from '../Controls/TextInputControl'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoader: false
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'row', borderColor: 'red', borderWidth: 0 }}>
                            <View style={{ flexGrow: 1 }}></View>
                            <View style={{ flexGrow: 8, flex: 1, flexDirection: 'column', marginTop: 60, borderColor: 'blue', borderWidth: 0 }}>
                                <Text style={{ marginTop: 10, fontSize: 20 }}>Email</Text>
                                <TextInputControl
                                    value={this.state.username}
                                    returnKeyType={"next"}
                                    onChangeText={(text) => this.setState({ username: text })}
                                    placeholder="Email goes here"
                                    keyboardType={'email-address'}
                                    // style={{ height: 45, color: '#FFF', marginHorizontal: 10 }}
                                    underlineColorAndroid='transparent'
                                />
                                <Text style={{ marginTop: 10, fontSize: 20 }}>Password</Text>
                                <TextInputControl
                                    value={this.state.password}
                                    // ref='password' 
                                    returnKeyType={"done"}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholder="Password here"
                                    secureTextEntry={true}
                                    // style={{ height: 45, color: '#FFF', marginHorizontal: 10 }}
                                    underlineColorAndroid='transparent'
                                />
                                <ButtonControl
                                    ButtonTitle='Log In'
                                    ButtonPress={() => this._onPressSignIN()}
                                />
                                <View style={{ marginTop: 10, height: 45, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ marginTop: 10, }}>Or</Text>
                                </View>

                                <ButtonControl
                                    ButtonTitle='Login With Facebook'
                                    ButtonPress={() => this._onPressFBLogin()} />
                            </View>
                            <View style={{ flexGrow: 1 }}></View>
                        </View>
                    </View>

                </ScrollView>
                {
                    this.state.isLoader &&
                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        position: 'absolute', flex: 1, left: 0, top: 0, right: 0, bottom: 0,
                    }}>
                        <ActivityIndicator style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 25, padding: 50 }} color='white' size='large' />
                    </View>
                }
            </View>
        );
    }


    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    _onPressFBLogin = function () {
        console.log('loginInProgress')
        LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {
            if (result.isCancelled) {
                console.log('loginCanceled')
            } else {
                console.log('loginSuceessful')
                console.log(result)

                AsyncStorage.setItem('userToken', JSON.stringify(LoginData)).then(() => {
                    console.log('added loginToken')
                    this.props.navigation.navigate('Detail');
                    return;
                }).catch(err => console.log(err))

                //need to use GraphApi for user data
            }
        }).catch(err => console.log(err))
    }

    _onPressSignIN = function () {

        console.log('asdds')
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
        setTimeout(() => {
            this.setState({ isLoader: false })
            var LoginData = {
                'type': 0,
                "Email": this.state.username,
                "Name": this.state.password,
            }
            AsyncStorage.setItem('userToken', JSON.stringify(LoginData)).then(() => {
                console.log('added loginToken')
                this.props.navigation.navigate('Detail');
                return;
            }).catch(err => console.log(err))
        }, 1000)

    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
        backgroundColor: '#EEEEEE',
    },
    Logo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 66
    },
});

export default Login;