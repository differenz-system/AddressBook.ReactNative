import React, { Component } from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList,Dimensions,RefreshControl,BackHandler
} from 'react-native';
const { height, width } = Dimensions.get("window")
import AsyncStorage from '@react-native-async-storage/async-storage'
import { colors,string,icon } from '../Constant';
import Header from '../Controls/Headercontrol';
import LinearGradient from 'react-native-linear-gradient';
import {LoginManager} from 'react-native-fbsdk';
import CommonStyle from './Style';
var globalThis
export default class Detail extends Component {
    
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
            savedData:[],
            masterData:[],
            FinalArray:[],
            NameArray:[],
            isLoader: true,
            newData:[],
            DisplayContactList:[],
            refreshing:false
        };
        this.get.bind(this);
    
    }
  
    componentDidMount() {
        globalThis = this
        this.get()
       
        this.props.navigation.setOptions({
            headerShown:true,
            header: () => (
                <Header 
                    Headertxt={string.ADDRESS_BOOK}
                    LeftImage={icon.LOGOUT}
                    LeftImgPress={async()=>await AsyncStorage.removeItem(string.ASYNC_USERTOKEN).then(() => {
                        LoginManager.logOut()
                        this.props.navigation.navigate('Login')
                    }).catch(err => console.log(err))}
                    RightImgPress={() => this.props.navigation.navigate('AddContact', { get: globalThis.get })}
                    RightImage={icon.ADD}
                    SerchView={true}
                    value={this.state.Searchstring}
                    onChangeText={(val)=>{
                        this.filterData(val)
                    }}
                    returnKeyLabel={'done'}
                    returnKeyType={'done'}
                />
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

    filterData(text){
        this.setState({Searchstring:text})

        if(text==''){
            this.get()
        } 
        
        let arr1=[],CharTitle
        this.state.masterData.filter(
            function (item,index) {
                if(item.title.toUpperCase()==text.charAt(0).toUpperCase())
                {
                    CharTitle=text.charAt(0).toUpperCase()
                    arr1=item.data
                }
        });
          
        const SubData=arr1.filter(
          function (item,index) {
              const itemData = item.Name
                  ? item.Name.toUpperCase()
                  : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          })
        
        if(SubData.length==0)
        {
            this.setState({status:'No data found',savedData:[]})
        }
        else{
            const NewArr=[{ title: CharTitle, data: SubData }]
            let NameArr=[],FilterNameArr=[]
            NewArr.map((item,index)=>{
                NameArr.push({Alpha:item.title.toUpperCase()})
            })
            FilterNameArr= NameArr.filter( (ele, ind) => ind === NameArr.findIndex( elem => elem.Alpha === ele.Alpha ))
            this.setState({
                DisplayContactList:FilterNameArr
            })
            this.setState({
                savedData:NewArr
            })
        }
    }

    get = async () => {
       
        await AsyncStorage.getItem(string.ASYNC_DATA)
            .then((data) => {
                if(JSON.parse(data)==null || JSON.parse(data).length==0)
                {
                    this.setState({
                        status: 'No Data', 
                        savedData:[],
                        masterData:[],
                        isLoader:false
                    })
                }else{
                  
                    let FinalArr=JSON.parse(data)
                    let SortArr = FinalArr.sort((a, b) => {
                        return a.Name.localeCompare(b.Name)
                    })
                    
                    let NameArr=[],FilterNameArr=[],newData = []
                    SortArr.map((item,index)=>{
                        NameArr.push({Alpha:item.Name.charAt(0)})
                    })
                  
                    FilterNameArr= NameArr.filter( (ele, ind) => ind === NameArr.findIndex( elem => elem.Alpha === ele.Alpha ))
                    this.setState({
                        DisplayContactList:FilterNameArr
                    })
                    let TitleArr = []
                    FilterNameArr.map((item, index) => {
                        TitleArr.push({ title: item.Alpha })
                    })

                    let duplicateArr=TitleArr
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
                   let  myArray = [];
                    for (var groupName in groups) {
                        myArray.push({title: groupName, data: groups[groupName]});
                    }
                    this.setState({
                        savedData: myArray,
                        masterData: myArray,
                        isLoader:false
                    })
                }
                
            })
            .catch((err) => console.log(err))
    }

    refreshControl(){
        this.setState({
            refreshing : true,
            Searchstring:''
        })
        setTimeout(()=>{
            this.get()
            this.setState({
                refreshing : false
            })
        },1500)
    }

    searchContact(text){
        const newData = this.state.masterData.filter(
            function (item,index) {
              const itemData = item.title
                ? item.title.toUpperCase()
                : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
          });
  
          this.setState({
              savedData:newData
          })
    }
    subrenderItem= ({ item, index }) => {
        return(
            <View style={CommonStyle.DSubMainView}>
                 <View style={CommonStyle.DSubsubView}>
                    <View style={CommonStyle.DSubView1}>
                        <LinearGradient
                            useAngle={true}
                            angle={150}
                            colors={[colors.LIGHT_GREEN,colors.DARK_GREEN,colors.DDARK_GREEN]} 
                            style={CommonStyle.DGradView}/>
                    </View>
                 <View style={{borderTopLeftRadius:15,flex:1}}>
                    <TouchableOpacity activeOpacity={0.8} style={CommonStyle.DPressItem} onPress={() => { this.props.navigation.navigate('AddContact', { item: item, index: index, get: this.get }) }}>
                        <Text style={CommonStyle.DMainView}>{item.Name}</Text>
                        <Text style={CommonStyle.DsubText}>{item.Email}</Text>
                        <Text style={CommonStyle.DsubText}>{item.ContactNumber}</Text>
                    </TouchableOpacity>
                 </View>
            </View>
        </View>
        )
    }
    renderItem = ({ item, index }) => {
        let DataArr=item.data
        return (
            <View style={{flex:1}}>
               <LinearGradient 
                   useAngle={true}
                   angle={90}
                   colors={[colors.LIGHT_GREEN,colors.DARK_GREEN,colors.DDARK_GREEN]} 
                   style={CommonStyle.DGradHorizontalView}>
                       <Text style={CommonStyle.DContactChar}>{item.title.toUpperCase()}</Text>
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
       
        return (
            <View style={CommonStyle.DMainRenderView}>
                { this.state.savedData.length==0 ?
                    <View style={CommonStyle.DStatusView}>
                        <Text style={CommonStyle.DStatusTxt}>{this.state.status}</Text>
                    </View>
                    :
                    <View style={{flex:1}}>
                        <View style={CommonStyle.DContactList}>
                            {this.state.DisplayContactList.length!=0
                            ?
                                this.state.DisplayContactList.map((item,index)=>{
                                    return(
                                        <View style={CommonStyle.DContctView}>
                                            <TouchableOpacity style={CommonStyle.DtouchList} activeOpacity={0.5} onPress={()=>this.searchContact(item.Alpha)}>
                                                    <Text style={CommonStyle.DChar}>{item.Alpha}</Text> 
                                            </TouchableOpacity> 
                                        </View>
                                    )
                                })
                            :undefined}
                        </View>
                        
                        <ScrollView   
                            style={CommonStyle.DlistScroll} 
                            showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.refreshControl()} />}>
                            <View style={{flex:1,backgroundColor:colors.WHITE}}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.savedData}
                                    style={{paddingTop:40}}
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
