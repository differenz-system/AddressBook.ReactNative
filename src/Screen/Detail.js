import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, RefreshControl, BackHandler, TextInput, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppColors, string, icon } from '../Constant';
import LinearGradient from 'react-native-linear-gradient';
import CommonStyle from './Style';
import { DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import AuthContext from '../AuthContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../Utils/LayoutMeasurement';

const { height, width } = Dimensions.get("window")

const Detail = () => {

    const { isScheme } = useContext(AuthContext);
    const [searchString, setSearchString] = useState('');
    const [masterData, setMasterData] = useState([]);
    const [status, setStatus] = useState('Loading...');
    const [savedData, setSaveData] = useState([]);
    const [DisplayContactList, setDisplayContactList] = useState([])
    const [isLoader, setIsLoader] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        get()
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        return () => {
            backHandler.remove()
        }
    }, [])

    handleBackButtonClick=()=> {
        BackHandler.exitApp();
        return true;
    }

    const filterData = (text) => {

        if (text == '') {
            get()
        }

        let arr1 = [], CharTitle
        masterData.filter(
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
            setStatus('No data found')
            setSaveData([])
        }
        else {
            const NewArr = [{ title: CharTitle, data: SubData }]
            let NameArr = [], FilterNameArr = []
            NewArr.map((item, index) => {
                NameArr.push({ Alpha: item.title.toUpperCase() })
            })
            FilterNameArr = NameArr.filter((ele, ind) => ind === NameArr.findIndex(elem => elem.Alpha === ele.Alpha))
            setDisplayContactList(FilterNameArr)
            setSaveData(NewArr)
        }
    }

    const get = async () => {

        await AsyncStorage.getItem(string.ASYNC_DATA)
            .then((data) => {
                if (JSON.parse(data) == null || JSON.parse(data).length == 0) {
                    setStatus('No Data')
                    setSaveData([])
                    setMasterData([])
                    setIsLoader(false)

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
                    setDisplayContactList(FilterNameArr)
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
                    setSaveData(myArray)
                    setMasterData(myArray)
                    setIsLoader(false)
                }

            })
            .catch((err) => console.log(err))
    }

    const refreshControl = () => {
        setSearchString('')
        setRefreshing(true)
        setTimeout(() => {
            get()
            setRefreshing(false)
        }, 1500)
    }

    const searchContact = (text) => {
        const newData = masterData.filter(
            function (item, index) {
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });

        setSaveData(newData)
    }

    const subrenderItem = ({ item, index }) => {
        return (
            <View style={[CommonStyle.DSubsubView, { shadowColor: isScheme == 'dark' ? AppColors.WHITE : AppColors.BLACK, backgroundColor: isScheme == 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }]}>
                <LinearGradient
                    useAngle={true}
                    angle={150}
                    colors={[AppColors.LIGHT_GREEN, AppColors.DARK_GREEN, AppColors.DDARK_GREEN]}
                    style={CommonStyle.DGradView} >
                    <View style={styles.contianer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[CommonStyle.DPressItem, {
                                backgroundColor: isScheme == 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background,

                            }]}
                            onPress={() => { navigation.navigate('AddContact', { item: item, index: index, get: get }) }}>
                            <Text style={[CommonStyle.DMainView, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{item.Name}</Text>
                            <Text style={[CommonStyle.DsubText, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{item.Email}</Text>
                            <Text style={[CommonStyle.DsubText, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{item.ContactNumber}</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        )
    }

    const renderItem = ({ item, index }) => {
        let DataArr = item.data
        return (
            <View style={styles.contianer}>
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
                    renderItem={subrenderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    return (
        <View style={[CommonStyle.DMainRenderView, { backgroundColor: isScheme == 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }]}>
            <View>
                <Image source={icon.BACKGROUND} style={CommonStyle.BGImg} />
                <TouchableOpacity
                    onPress={async () => await AsyncStorage.removeItem(string.ASYNC_USERTOKEN).then(() => {
                        navigation.navigate('Login')
                    }).catch(err => console.log(err))} style={CommonStyle.LImgTouch}>
                    <Image source={icon.LOGOUT} style={CommonStyle.LImg} resizeMode={'contain'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setSearchString('')
                    get()
                    navigation.navigate('AddContact'
                        , { get: get })
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
                            setSearchString(val)
                            filterData(val)
                        }}
                        returnKeyLabel={'done'}
                        returnKeyType={'done'}
                        style={CommonStyle.TextInputTxt}
                    />
                </View>
            </View>

            {savedData.length == 0 ?
                <View style={CommonStyle.DStatusView}>
                    <Text style={[CommonStyle.DStatusTxt, { color: isScheme == 'dark' ? DarkTheme.colors.text : DefaultTheme.colors.text }]}>{status}</Text>
                </View>
                :
                <View style={styles.contianer}>
                    <View style={CommonStyle.DContactList}>
                        {DisplayContactList.length != 0
                            ?
                            DisplayContactList.map((item, index) => {
                                return (
                                    <View style={CommonStyle.DContctView} key={index}>
                                        <TouchableOpacity style={CommonStyle.DtouchList} activeOpacity={0.5} onPress={() => searchContact(item.Alpha)}>
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
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refreshControl()} />}>
                        <View style={styles.contianer}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={savedData}
                                style={styles.ContactStyle}
                                renderItem={renderItem}
                                scrollEnabled={false}
                            />
                        </View>
                    </ScrollView>
                </View>
            }
        </View>

    )
}

const styles=StyleSheet.create({
    contianer:{
        flex:1
    },
    ContactStyle:{
        paddingTop: hp('4')
    }
})

export default Detail
