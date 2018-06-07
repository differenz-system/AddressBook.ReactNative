
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Button, Switch, Alert, AsyncStorage, ActivityIndicator } from 'react-native'

import ButtonControl from '../Controls/ButtonControl'
import TextInputControl from '../Controls/TextInputControl'
import SwitchControl from '../Controls/SwitchControl'

class AddContact extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Detail",
        headerTitleStyle: {
            alignSelf:'center',
            textAlign: 'center',
            color:'white',
            //width: '100%',
            flex:1
        },
        headerLeft:(
            <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('Detail')}>
            <Text style={{ fontSize: 16, color: '#fff' }}>Address Book</Text>
        </TouchableOpacity>
       ),
        headerRight:(
            <TouchableOpacity style={{ padding: 10 }} onPress={() => 
                AsyncStorage.removeItem('userToken').then(() => navigation.navigate('Auth')).catch(err => console.log(err))
            // navigation.navigate('Login')
            }>
            <Text style={{ fontSize: 16, color: '#fff' }}>Logout</Text>
        </TouchableOpacity>
    )
    });

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            Name: '',
            Email: '',
            ContactNumber: '',
            IsActive: false,
            switchValue: false,
            savedData: '',
            navigation: this.props.navigation,
            index: 0,
            isLoader: false
        };
        this.add.bind(this);
        this.get.bind(this);
        this.update.bind(this);
        this.delete.bind(this);
        this.goBack.bind(this);
    }

    componentDidMount() {
        console.log('cdm')
        var { params } = this.props.navigation.state
        console.log(params)
        if (params && params.item) {
            this.setState({ 
                ContactNumber: params.item.ContactNumber,
                Email: params.item.Email,
                Name: params.item.Name,
                id: params.item.Id,
                index: params.index,
                IsActive: params.item.IsActive
            }, () => console.log(this.state.index))
            this.get()
        }

        this.get()
        

    }
    toggleswitch = (value) => {
        this.setState({ IsActive: value })
        console.log('Switch is: ' + value)
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    validationData = () => {
        const { Name, Email, ContactNumber } = this.state;

        if (Name == '') {
            Alert.alert('Please enter name');
            return 1;
        }
        else if (Email == '') {
            Alert.alert('Please enter email');
            return 1;
        }
        else if (!this.validateEmail(Email)) {
            Alert.alert('Please enter valid email');
            return 1;
        }
        else if (ContactNumber == '') {
            Alert.alert('Please enter contact number');
            return 1;
        }

        return 0;
    }



    add = () => {
        if (this.validationData()) {
            return;
        }

        //this.setState({ isLoader: true })
        AsyncStorage.getItem('Data').then(data => {
            console.log(data)
            if (data == null || data == undefined || JSON.parse(data).length == 0 ) {
                retrivedArray = [{ 'Id': 1, 'Name': this.state.Name, 'Email': this.state.Email, 'ContactNumber': this.state.ContactNumber, "IsActive": this.state.IsActive }]
            } else {
                retrivedArray = JSON.parse(data)
                console.log(retrivedArray.length)
                const arrLength = retrivedArray.length - 1
                retrivedArray.push({ 'Id': retrivedArray[arrLength].Id + 1, 'Name': this.state.Name, 'Email': this.state.Email, 'ContactNumber': this.state.ContactNumber, "IsActive": this.state.IsActive  })
            }

            AsyncStorage.setItem('Data', JSON.stringify(retrivedArray)).then(() => {this.goBack()}).catch(err => console.log(err))
            console.log(retrivedArray)
            this.get()
        }).catch(err => console.log(err))
    }

    update = () => {

        if (this.validationData()) {
            return;
        }

        var AddressBook = {
            "AddressBookId": this.state.id,
            "Name": this.state.Name,
            "Email": this.state.Email,
            "ContactNumber": this.state.ContactNumber
        }

        this.setState({ isLoader: true })

        AsyncStorage.getItem('Data')
            .then((data) => {

                let userData = JSON.parse(data);
                userData[this.state.index] = { 'Name': this.state.Name, 'Email': this.state.Email, 'ContactNumber': this.state.ContactNumber,"IsActive": this.state.IsActive  }

                AsyncStorage.setItem('Data', JSON.stringify(userData)).
                    then(() => this.goBack()
                    ).
                    catch(err => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    delete = () => {
        AsyncStorage.getItem('Data')
            .then((data) => {
                let userData = JSON.parse(data);
                if (this.state.index > -1) {
                    userData.splice(this.state.index, 1);
                }
                AsyncStorage.setItem('Data', JSON.stringify(userData)).
                    then(
                    this.goBack()
                    ).
                    catch(err => console.log(err))
            })
            .catch((err) => console.log(err))


    }

    get = () => {
        AsyncStorage.getItem('Data')
            .then((data) => {
                // console.log('get')
                this.setState({ savedData: JSON.parse(data), isLoader: false })
            })
            .catch((err) => console.log(err))
    }


    goBack = () => {
        console.log('inside go back')
        this.props.navigation.state.params.get()
        this.props.navigation.goBack()
    }
    render() {
        return (
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: '#EEEEEE', }}>
                {this.state.isLoader ?
                    <ActivityIndicator size="small" color="#000000" />
                    :
                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'row', borderColor: 'red', borderWidth: 0 }}>
                            <View style={{ flexGrow: 1 }}></View>
                            <View style={{ flexGrow: 8, flex: 1, flexDirection: 'column', marginTop: 60, borderColor: 'blue', borderWidth: 0 }}>
        
                                <Text style={{ marginTop: 10, fontSize: 20  }}>Name</Text>
                                <TextInputControl
                                    value={this.state.Name}
                                    returnKeyType={"next"}
                                    onChangeText={(text) => this.setState({ Name: text })}
                                    placeholder="User name goes here"
                                    style={{ height: 45, color: '#FFF', marginHorizontal: 10 }}
                                    underlineColorAndroid='transparent'>
                                </TextInputControl>
                                <Text style={{ marginTop: 10, fontSize: 20  }}>Email</Text>
                                <TextInputControl
                                    returnKeyType={"next"}
                                    value={this.state.Email}
                                    onChangeText={(text) => this.setState({ Email: text })}
                                    placeholder="Email address goes here"
                                    keyboardType={'email-address'}
                                    style={{ height: 45, color: '#FFF', marginHorizontal: 10 }}
                                    underlineColorAndroid='transparent'>
                                </TextInputControl>
                                <Text style={{ marginTop: 10, fontSize: 20  }}>Contact Number</Text>
                                <TextInputControl
                                    value={this.state.ContactNumber}
                                    keyboardType={'numeric'}
                                    maxLength={10}
                                    returnKeyType={"next"}
                                    onChangeText={(text) => this.setState({ ContactNumber: text })}
                                    placeholder="Contact number goes here"
                                    keyboardType={'numeric'}
                                    style={{ height: 45, color: '#FFF', marginHorizontal: 10 }}
                                    underlineColorAndroid='transparent'>
                                </TextInputControl>
                                <Text style={{ marginTop: 10, fontSize: 20  }}>Active</Text>
                                <View style={{ marginTop: 10, height: 45, }}>
                                    <SwitchControl
                                        toggleswitch={this.toggleswitch}
                                        switchValue={this.state.IsActive} />
                                </View>

                                {this.props.navigation.state.params && this.props.navigation.state.params.item ?
                                    <View>
                                        <ButtonControl ButtonPress={this.update}
                                            ButtonTitle='UPDATE'
                                        />
                                        <ButtonControl ButtonPress={this.delete}
                                            ButtonTitle='DELETE'
                                        />
                                    </View>
                                    :
                                    <View>
                                        <ButtonControl ButtonPress={this.add}
                                            ButtonTitle='Save'
                                        />
                                        <ButtonControl ButtonPress={() => this.props.navigation.goBack()}
                                            ButtonTitle='Cancel'
                                        />
                                    </View>
                                }
                            </View>
                            <View style={{ flexGrow: 1 }}></View>
                        </View>
                    </View>
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
    },
});


export default AddContact;