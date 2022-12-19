import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, RefreshControl, BackHandler, TextInput, Image } from 'react-native';
const { height, width } = Dimensions.get("window")
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppColors, string, icon, font } from '../Constant';
import Header from '../Controls/Headercontrol';
import LinearGradient from 'react-native-linear-gradient';
import { LoginManager } from 'react-native-fbsdk-next';
import CommonStyle from './Style';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import AuthContext from '../AuthContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';

var globalThis
var searchString = ''
export default class Detail extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Email: '',
            ContactNumber: '',
            IsActive: false,
            switchValue: false,
            selected: false,
            status: 'Loading...',
            savedData: [],
            masterData: [],
            FinalArray: [],
            NameArray: [],
            isLoader: true,
            newData: [],
            DisplayContactList: [],
            refreshing: false,
        };
        this.get.bind(this);

    }

    componentDidMount() {
        globalThis = this
        this.get()
        console.log('mount call');
        // this.props.navigation.setOptions({
        //     headerShown: true,
        //     header: () => (
        //         <Header
        //             Headertxt={string.ADDRESS_BOOK}
        //             LeftImage={icon.LOGOUT}
        //             LeftImgPress={async () => await AsyncStorage.removeItem(string.ASYNC_USERTOKEN).then(() => {
        //                 LoginManager.logOut()
        //                 this.props.navigation.navigate('Login')
        //             }).catch(err => console.log(err))}
        //             RightImgPress={() => {
        //                 searchString = ''
        //                 this.get()
        //                 this.props.navigation.navigate('AddContact', { get: globalThis.get })
        //             }}
        //             RightImage={icon.ADD}

        //         />

        //     ),
        // })

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

    filterData(text) {

        if (text == '') {
            this.get()
        }

        let arr1 = [], CharTitle
        this.state.masterData.filter(
            function (item, index) {
                if (item.title.toUpperCase() == text.charAt(0).toUpperCase()) {
                    CharTitle = text.charAt(0).toUpperCase()
                    arr1 = item.data
                }
            });

        const SubData = arr1.filter(
            function (item, index) {
                const itemData = item.Name
                    ? item.Name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            })

        if (SubData.length == 0) {
            this.setState({ status: 'No data found', savedData: [] })
        }
        else {
            const NewArr = [{ title: CharTitle, data: SubData }]
            let NameArr = [], FilterNameArr = []
            NewArr.map((item, index) => {
                NameArr.push({ Alpha: item.title.toUpperCase() })
            })
            FilterNameArr = NameArr.filter((ele, ind) => ind === NameArr.findIndex(elem => elem.Alpha === ele.Alpha))
            this.setState({
                DisplayContactList: FilterNameArr
            })
            this.setState({
                savedData: NewArr
            })
        }
    }

    get = async () => {

        await AsyncStorage.getItem(string.ASYNC_DATA)
            .then((data) => {
                if (JSON.parse(data) == null || JSON.parse(data).length == 0) {
                    this.setState({
                        status: 'No Data',
                        savedData: [],
                        masterData: [],
                        isLoader: false
                    })
                } else {

                    let FinalArr = JSON.parse(data)
                    let SortArr = FinalArr.sort((a, b) => {
                        return a.Name.localeCompare(b.Name)
                    })

                    let NameArr = [], FilterNameArr = [], newData = []
                    SortArr.map((item, index) => {
                        NameArr.push({ Alpha: item.Name.charAt(0) })
                    })

                    FilterNameArr = NameArr.filter((ele, ind) => ind === NameArr.findIndex(elem => elem.Alpha === ele.Alpha))
                    this.setState({
                        DisplayContactList: FilterNameArr
                    })
                    let TitleArr = []
                    FilterNameArr.map((item, index) => {
                        TitleArr.push({ title: item.Alpha })
                    })

                    let duplicateArr = TitleArr
                    duplicateArr.map((item, key) => {
                        SortArr.map((item1, key1) => {
                            if (item.title === item1.Name.charAt(0)) {
                                newData.push({ title: item.title, data: item1 })
                            }
                        })
                    })

                    var groups = {};
                    for (var i = 0; i < newData.length; i++) {
                        var groupName = newData[i].title;
                        if (!groups[groupName]) {
                            groups[groupName] = [];
                        }
                        groups[groupName].push(newData[i].data);
                    }
                    let myArray = [];
                    for (var groupName in groups) {
                        myArray.push({ title: groupName, data: groups[groupName] });
                    }
                    this.setState({
                        savedData: myArray,
                        masterData: myArray,
                        isLoader: false
                    })
                }

            })
            .catch((err) => console.log(err))
    }

    refreshControl() {
        searchString = ''
        this.setState({ refreshing: true, })
        setTimeout(() => {
            this.get()
            this.setState({
                refreshing: false
            })
        }, 1500)
    }

    searchContact(text) {
        const newData = this.state.masterData.filter(
            function (item, index) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

        this.setState({
            savedData: newData
        })
    }
    subrenderItem = ({ item, index }) => {
        const { isScheme, } = this.context;
        return (
            <View style={[CommonStyle.DSubsubView, { shadowColor: isScheme == 'dark' ? AppColors.WHITE : AppColors.BLACK, backgroundColor: isScheme == 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }]}>
                <LinearGradient
                    useAngle={true}
                    angle={150}
                    colors={[AppColors.LIGHT_GREEN, AppColors.DARK_GREEN, AppColors.DDARK_GREEN]}
                    style={CommonStyle.DGradView} >
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[CommonStyle.DPressItem, {
                                backgroundColor: isScheme == 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,

                            }]}
                            onPress={() => { this.props.navigation.navigate('AddContact', { item: item, index: index, get: this.get }) }}>
                            <Text style={[CommonStyle.DMainView, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{item.Name}</Text>
                            <Text style={[CommonStyle.DsubText, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{item.Email}</Text>
                            <Text style={[CommonStyle.DsubText, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{item.ContactNumber}</Text>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </View>
        )
    }
    renderItem = ({ item, index }) => {
        let DataArr = item.data
        return (
            <View style={{ flex: 1 }}>
                <LinearGradient
                    useAngle={true}
                    angle={90}
                    colors={[AppColors.LIGHT_GREEN, AppColors.DARK_GREEN, AppColors.DDARK_GREEN]}
                    style={CommonStyle.DGradHorizontalView}>
                    <Text style={CommonStyle.DContactChar}>{item.title?.toUpperCase()}</Text>
                </LinearGradient>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={DataArr}
                    renderItem={this.subrenderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    render() {
        const { isScheme } = this.context;
        
        return (
            <View style={[CommonStyle.DMainRenderView, { backgroundColor: isScheme == 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }]}>
                <View style={{}}>
                    <Image source={icon.BACKGROUND} style={CommonStyle.BGImg} />
                    <TouchableOpacity onPress={async () => await AsyncStorage.removeItem(string.ASYNC_USERTOKEN).then(() => {
                        LoginManager.logOut()
                        this.props.navigation.navigate('Login')
                    }).catch(err => console.log(err))} style={CommonStyle.LImgTouch}>
                        <Image source={icon.LOGOUT} style={CommonStyle.LImg} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        searchString = ''
                        this.get()
                        this.props.navigation.navigate('AddContact', { get: globalThis.get })
                    }} style={CommonStyle.RImgTouch}>
                        <Image source={icon.ADD} style={CommonStyle.RImg} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <Text style={CommonStyle.HeaderTxt}>{string.ADDRESS_BOOK}</Text>
                    <View style={CommonStyle.SearchView}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder={string.SEARCH}
                            placeholderTextColor={AppColors.DARK_GRAY}
                            value={searchString}
                            onChangeText={(val) => {
                                searchString = val
                                this.filterData(val)
                            }}
                            returnKeyLabel={'done'}
                            returnKeyType={'done'}
                            style={CommonStyle.TextInputTxt}
                        />
                    </View>
                </View>

                {this.state.savedData.length == 0 ?
                    <View style={CommonStyle.DStatusView}>
                        <Text style={[CommonStyle.DStatusTxt, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{this.state.status}</Text>
                    </View>
                    :
                    <View style={{ flex: 1 }}>


                        <View style={CommonStyle.DContactList}>
                            {this.state.DisplayContactList.length != 0
                                ?
                                this.state.DisplayContactList.map((item, index) => {
                                    return (
                                        <View style={CommonStyle.DContctView}>
                                            <TouchableOpacity style={CommonStyle.DtouchList} activeOpacity={0.5} onPress={() => this.searchContact(item.Alpha)}>
                                                <Text style={CommonStyle.DChar}>{item.Alpha}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                                : undefined}
                        </View>
                        <ScrollView
                            style={CommonStyle.DlistScroll}
                            showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refreshControl()} />}>
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.savedData}
                                    style={{ paddingTop: hp('4') }}
                                    renderItem={this.renderItem}
                                    scrollEnabled={false}
                                />
                            </View>
                        </ScrollView>

                    </View>
                }
            </View>

        )
    }
}
