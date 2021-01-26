
import React, { Component } from 'react';
import { View,Alert,ActivityIndicator ,Dimensions,BackHandler} from 'react-native'
import ButtonControl from '../Controls/ButtonControl'
import TextInputControl from '../Controls/TextInputControl'
import SwitchControl from '../Controls/SwitchControl'
import { colors,string,font,icon } from '../Constant';
import {LoginManager} from 'react-native-fbsdk'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Controls/Headercontrol';
import CommonStyle from './Style'
const {width,height} = Dimensions.get('window')
let retrivedArray=[]
let Name = React.createRef();
let Email=React.createRef();
let PhoneNo=React.createRef();
export default class AddContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
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
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
 
        this.props.navigation.setOptions({
            headerShown:true,
            header: (props) => (
                <Header 
                    Headertxt={string.DETAIL}
                    LeftImage={icon.BOOK}
                    RightImage={icon.LOGOUT}
                    SerchView={false}
                    LeftImgPress={()=>this.props.navigation.navigate('Detail')}
                    RightImgPress={async() => await AsyncStorage.removeItem(string.ASYNC_USERTOKEN).then(() => {
                        LoginManager.logOut()
                        this.props.navigation.navigate('Login')
                    }).catch(err => console.log(err))}
                   
                />
            ),
        })
        let params= this.props.route.params.item
        let index=this.props.route.params.index
       
        if (params) {
            this.setState({ 
                ContactNumber: params.ContactNumber,
                Email: params.Email,
                Name: params.Name,
                id: params.Id,
                index: index,
                IsActive: params.IsActive
            })
            this.get()
        }

        this.get()
        

    }
    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    toggleswitch = (value) => {
        this.setState({ IsActive: value })
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

        AsyncStorage.getItem(string.ASYNC_DATA).then(data => {
            
            if (data == null || data == undefined || JSON.parse(data).length == 0 ) {
                retrivedArray = [{ 'Id': 1, 'Name': this.state.Name, 'Email': this.state.Email, 'ContactNumber': this.state.ContactNumber, "IsActive": this.state.IsActive }]
            } else {
                retrivedArray = JSON.parse(data)
                const arrLength = retrivedArray.length - 1
                retrivedArray.push({ 'Id':retrivedArray[arrLength].Id + 1, 'Name': this.state.Name, 'Email': this.state.Email, 'ContactNumber': this.state.ContactNumber, "IsActive": this.state.IsActive })
            }

            AsyncStorage.setItem(string.ASYNC_DATA, JSON.stringify(retrivedArray)).then(() => {this.goBack()}).catch(err => console.log(err))
            this.get()
        }).catch(err => console.log(err))
    }

    update =async () => {

        if (this.validationData()) {
            return;
        }
        this.setState({ isLoader: true })
            let data=this.props.route.params.item
            let payload={
                Id:this.state.id,
                Name:this.state.Name, 
                Email:this.state.Email, 
                ContactNumber:this.state.ContactNumber,
                IsActive:this.state.IsActive
            }
            await AsyncStorage.getItem(string.ASYNC_DATA)
            .then(req => JSON.parse(req))
            .then(async json => {
                    let temp = json;
                    temp.map((item,index)=>{
                       
                        if(item.Id==data.Id){
                            var index = temp.indexOf(item)
                            if (index !== -1) {
                                temp.splice(index, 1);
                            }
                        }
                    })
                    temp.push(payload)
                    setTimeout(() => {   
                         this.setState({ isLoader: false })
                         this.goBack()
                     },1000)
                    
                    await AsyncStorage.removeItem(string.ASYNC_DATA)
                    await AsyncStorage.setItem(string.ASYNC_DATA,JSON.stringify(temp))
                 
                })
            .catch(error => console.log(error));    
    }

    delete =async () => {
        this.setState({ isLoader: true })
            await AsyncStorage.getItem(string.ASYNC_DATA)
            .then(req => JSON.parse(req))
            .then(async json => {
                    let temp = json;
                    
                    temp.map((item,index)=>{
                        if(item.Id==this.state.id){
                            var index = temp.indexOf(item)
                            if (index !== -1) {
                                temp.splice(index, 1);
                            }
                        }
                        else{
                        }
                    })
                  
                    setTimeout(() => {   
                        this.setState({ isLoader: false })
                        this.goBack()
                    },1000)
                     
                    await AsyncStorage.removeItem(string.ASYNC_DATA)
                    await AsyncStorage.setItem(string.ASYNC_DATA,JSON.stringify(temp))
                })
            .catch(error => console.log(error));
    }

    get =async () => {
        await AsyncStorage.getItem(string.ASYNC_DATA)
            .then((data) => {
                this.setState({ savedData: JSON.parse(data), isLoader: false })
            })
            .catch((err) => console.log(err))
    }


    goBack = () => {
        this.props.route.params.get()
        this.props.navigation.goBack()
    }
    render() {
        return (

            <KeyboardAwareScrollView
                bounces={false}
                enableOnAndroid={true}
                style={{flex:1,backgroundColor:colors.WHITE}}
                contentContainerStyle={{justifyContent:'center'}}
                extraScrollHeight={this.state.extraScrollHeight}
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}>
                   
                {this.state.isLoader ?
                    <View style={{height:height/1.3,justifyContent:'center',backgroundColor:colors.WHITE}}>
                         <ActivityIndicator size="small" color="#000000" style={{alignSelf:'center',}} />
                    </View>
                    :
                    <View style={CommonStyle.Addcontainer}>
                            <View style={CommonStyle.AddMainView}>
                                
                                <TextInputControl
                                    ref={Name}
                                    value={this.state.Name}
                                    onChangeText={(text) => this.setState({ Name: text })}
                                    placeholder={string.NAME_PLACEHOLDER}
                                    HeaderTxt={string.NAME}
                                    returnKeyLabel="next"
                                    returnKeyType="next"
                                    onSubmitEditing={()=> Email.current.focus()}
                                    blurOnSubmit={false}
                                />
                                <TextInputControl
                                    ref={Email}
                                    value={this.state.Email}
                                    onChangeText={(text) => this.setState({ Email: text })}
                                    placeholder={string.EMAIL_PLACEHOLDER}
                                    keyboardType={'email-address'}
                                    HeaderTxt={string.EMAIL}
                                    returnKeyLabel="next"
                                    returnKeyType="next"
                                    onSubmitEditing={()=> PhoneNo.current.focus()}
                                    blurOnSubmit={false}
                                />
                                <TextInputControl
                                    ref={PhoneNo}
                                    value={this.state.ContactNumber}
                                    keyboardType={'phone-pad'}
                                    maxLength={10}
                                    returnKeyLabel="done"
                                    returnKeyType="done"
                                    onChangeText={(text) => this.setState({ ContactNumber: text })}
                                    placeholder={string.CONTACT_PLACEHOLDER}
                                    HeaderTxt={string.CONTACT_NO}
                                    onFocus={(event) => {this.setState({extraScrollHeight:font.ISIOS? 190:190}) }}
                                />
                                
                               
                                <SwitchControl
                                        HeaderTxt={string.ACTIVE}
                                        toggleswitch={this.toggleswitch}
                                        switchValue={this.state.IsActive} />
                               

                                {this.props.route.params.item ?
                                    <View>
                                        <ButtonControl ButtonPress={this.update}
                                            ButtonTitle={string.UPDATE}
                                        />
                                        <ButtonControl ButtonPress={this.delete}
                                            ButtonTitle={string.DELETE}
                                        />
                                    </View>
                                    :
                                    <View>
                                        <ButtonControl ButtonPress={this.add}
                                            ButtonTitle={string.SAVE}
                                        />
                                        <ButtonControl ButtonPress={() => this.props.navigation.goBack()}
                                            ButtonTitle={string.CANCEL}
                                        />
                                    </View>
                                }
                            </View>
                            
                        
                    </View>
                }
             </KeyboardAwareScrollView>
        );
    }
}
