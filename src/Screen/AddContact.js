import React, { useContext, useEffect, useState } from 'react';
import { View, Alert, ActivityIndicator, Dimensions, BackHandler,StyleSheet } from 'react-native'
import ButtonControl from '../Controls/ButtonControl'
import TextInputControl from '../Controls/TextInputControl'
import SwitchControl from '../Controls/SwitchControl'
import { AppColors, string, font, icon } from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Controls/Headercontrol';
import CommonStyle from './Style';
import { heightPercentageToDP as hp } from '../Utils/LayoutMeasurement';
import AuthContext from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')
let retrivedArray = []
let Name = React.createRef();
let Email = React.createRef();
let PhoneNo = React.createRef();

const AddContact = ({ route }) => {
    const { isScheme } = useContext(AuthContext)
    const navigation = useNavigation()
    const [contact, setContact] = useState({
        ContactNumber: '',
        Email: '',
        Name: '',
        id: '',
        index: 0,
        IsActive: false
    })
    const [isLoader, setIsLoader] = useState(false)
    const [savedData, setSaveData] = useState('')
    const [extraScrollHeight, setExtraScrollHeight] = useState(0)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        navigation.setOptions({
            headerShown: true,
            header: (props) => (
                <Header
                    Headertxt={string.DETAIL}
                    LeftImage={icon.BOOK}
                    RightImage={icon.LOGOUT}
                    SearchView={false}
                    LeftImgPress={() => navigation.navigate('Detail')}
                    RightImgPress={async () => await AsyncStorage.removeItem(string.ASYNC_USERTOKEN).then(() => {
                        navigation.navigate('Login')
                    }).catch(err => console.log(err))}
                />
            ),
        })
        let params = route.params.item
        let index = route.params.index

        if (params) {
            setContact({
                ContactNumber: params.ContactNumber,
                Email: params.Email,
                Name: params.Name,
                id: params.Id,
                index: index,
                IsActive: params.IsActive
            })
            get()
        }
        get()

        return () => backHandler.remove()
    }, [])

    const handleBackButtonClick = () => {
        navigation.goBack();
        return true;
    }

    const toggleswitch = (value) => {
        setContact({ ...contact, IsActive: value })
    }

    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const validationData = () => {
        const { Name, Email, ContactNumber } = contact;

        if (Name == '') {
            Alert.alert('Please enter name');
            return 1;
        }
        else if (Email == '') {
            Alert.alert('Please enter email');
            return 1;
        }
        else if (!validateEmail(Email)) {
            Alert.alert('Please enter valid email');
            return 1;
        }
        else if (ContactNumber == '') {
            Alert.alert('Please enter contact number');
            return 1;
        }

        return 0;
    }

    const add = () => {
        if (validationData()) {
            return;
        }

        AsyncStorage.getItem(string.ASYNC_DATA).then(data => {

            if (data == null || data == undefined || JSON.parse(data).length == 0) {
                retrivedArray = [{ 'Id': 1, 'Name': contact.Name, 'Email': contact.Email, 'ContactNumber': contact.ContactNumber, "IsActive": contact.IsActive }]
            } else {
                retrivedArray = JSON.parse(data)
                const arrLength = retrivedArray.length - 1
                retrivedArray.push({ 'Id': retrivedArray[arrLength].Id + 1, 'Name': contact.Name, 'Email': contact.Email, 'ContactNumber': contact.ContactNumber, "IsActive": contact.IsActive })
            }

            AsyncStorage.setItem(string.ASYNC_DATA, JSON.stringify(retrivedArray)).then(() => { goBack() }).catch(err => console.log(err))
            get()
        }).catch(err => console.log(err))
    }

    const update = async () => {

        if (validationData()) {
            return;
        }
        setIsLoader(true)
        let data = route.params.item
        let payload = {
            Id: contact.id,
            Name: contact.Name,
            Email: contact.Email,
            ContactNumber: contact.ContactNumber,
            IsActive: contact.IsActive
        }
        await AsyncStorage.getItem(string.ASYNC_DATA)
            .then(req => JSON.parse(req))
            .then(async json => {
                let temp = json;
                temp.map((item, index) => {

                    if (item.Id == data.Id) {
                        var index = temp.indexOf(item)
                        if (index !== -1) {
                            temp.splice(index, 1);
                        }
                    }
                })
                temp.push(payload)
                setTimeout(() => {
                    setIsLoader(false)
                    goBack()
                }, 1000)

                await AsyncStorage.removeItem(string.ASYNC_DATA)
                await AsyncStorage.setItem(string.ASYNC_DATA, JSON.stringify(temp))

            })
            .catch(error => console.log(error));
    }

    const delet = async () => {
        setIsLoader(true)
        await AsyncStorage.getItem(string.ASYNC_DATA)
            .then(req => JSON.parse(req))
            .then(async json => {
                let temp = json;

                temp.map((item, index) => {
                    if (item.Id == contact.id) {
                        var index = temp.indexOf(item)
                        if (index !== -1) {
                            temp.splice(index, 1);
                        }
                    }
                    else {
                    }
                })

                setTimeout(() => {
                    setIsLoader(false)
                    goBack()
                }, 1000)

                await AsyncStorage.removeItem(string.ASYNC_DATA)
                await AsyncStorage.setItem(string.ASYNC_DATA, JSON.stringify(temp))
            })
            .catch(error => console.log(error));
    }

    const get = async () => {
        await AsyncStorage.getItem(string.ASYNC_DATA)
            .then((data) => {
                setSaveData(JSON.parse(data))
                setIsLoader(false)
            })
            .catch((err) => console.log(err))
    }

    const goBack = () => {
        route.params.get()
        navigation.goBack()
    }

    return (

        <KeyboardAwareScrollView
            bounces={false}
            enableOnAndroid={true}
            style={styles.keybordavoiding}
            contentContainerStyle={{ justifyContent: 'center' }}
            extraScrollHeight={extraScrollHeight}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>

            {isLoader ?
                <View style={styles.conatiner}>
                    <ActivityIndicator size="large" color={isScheme == 'dark' ? AppColors.WHITE : AppColors.DARK_GREEN} style={styles.activityIndicator} />
                </View>
                :
                <View style={CommonStyle.Addcontainer}>
                    <View style={CommonStyle.AddMainView}>

                        <TextInputControl
                            ref={Name}
                            value={contact.Name}
                            onChangeText={(text) => setContact({ ...contact, Name: text })}
                            placeholder={string.NAME_PLACEHOLDER}
                            HeaderTxt={string.NAME}
                            returnKeyLabel="next"
                            returnKeyType="next"
                            onSubmitEditing={() => Email.current.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInputControl
                            ref={Email}
                            value={contact.Email}
                            onChangeText={(text) => setContact({ ...contact, Email: text })}
                            placeholder={string.EMAIL_PLACEHOLDER}
                            keyboardType={'email-address'}
                            HeaderTxt={string.EMAIL}
                            returnKeyLabel="next"
                            returnKeyType="next"
                            onSubmitEditing={() => PhoneNo.current.focus()}
                            blurOnSubmit={false}
                        />
                        <TextInputControl
                            ref={PhoneNo}
                            value={contact.ContactNumber}
                            keyboardType={'phone-pad'}
                            maxLength={10}
                            returnKeyLabel="done"
                            returnKeyType="done"
                            onChangeText={(text) => setContact({ ...contact, ContactNumber: text })}
                            placeholder={string.CONTACT_PLACEHOLDER}
                            HeaderTxt={string.CONTACT_NO}
                            onFocus={(event) => { setExtraScrollHeight(font.IS_IOS ? 190 : 190) }}
                        />


                        <SwitchControl
                            HeaderTxt={string.ACTIVE}
                            toggleswitch={toggleswitch}
                            switchValue={contact.IsActive} />


                        {route.params.item ?
                            <View>
                                <ButtonControl ButtonPress={update}
                                    ButtonTitle={string.UPDATE}
                                />
                                <ButtonControl ButtonPress={delet}
                                    ButtonTitle={string.DELETE}
                                />
                            </View>
                            :
                            <View>
                                <ButtonControl ButtonPress={add}
                                    ButtonTitle={string.SAVE}
                                />
                                <ButtonControl ButtonPress={() => navigation.goBack()}
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

const styles=StyleSheet.create({
    container:{
        Height: hp('60'), 
        justifyContent: 'center'
    },
    activityIndicator:{
        alignSelf: 'center',
    },
    keybordavoiding:{
        flex:1
    }
})
export default AddContact
