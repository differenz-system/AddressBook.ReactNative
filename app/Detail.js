import React, { Component } from 'react';
import {
    View, Text, ScrollView, StyleSheet,
    TextInput, TouchableOpacity, FlatList, Button,
    Switch,
    Alert,
    AsyncStorage, ActivityIndicator
} from 'react-native'
import ButtonControl from '../Controls/ButtonControl'
import TextInputControl from '../Controls/TextInputControl'
import SwitchControl from '../Controls/SwitchControl'
var globalThis
class Detail extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Address Book",
        headerTitleStyle: {
            alignSelf: 'center',
            textAlign: 'center',
            color:'white',
            //   width: '100%',
            flex: 1
        },
        headerLeft: (
            <TouchableOpacity onPress={() => 
                AsyncStorage.removeItem('userToken').then(() => navigation.navigate('Auth')).catch(err => console.log(err))
            }>
                <Text style={{ padding: 10, fontSize: 16, color: '#fff' }}>Logout</Text>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity onPress={() => navigation.navigate('Add', { get: globalThis.get })}>
                <Text style={{ padding: 10, fontSize: 16, color: '#fff' }}>Add</Text>
            </TouchableOpacity>
        )

    });

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
            savedData: '',
            isLoader: true
        };
        this.get.bind(this);
        this.remove.bind(this);

    }

    componentDidMount() {
        globalThis = this
        this.get()

    }

    get = () => {
        AsyncStorage.getItem('Data')
            .then((data) => {
                console.log(data)
                if(!data)
                    this.setState({status: 'No Data'})
                this.setState({ savedData: JSON.parse(data), isLoader: false })
            })
            .catch((err) => console.log(err))
    }

    remove = () => {
        AsyncStorage.removeItem('Data')
            .then((data) => {
                this.setState({ savedData: data })
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <View style={{ backgroundColor: '#EEEEEE', flex: 1, justifyContent: 'center' }}>
                { !this.state.savedData ?
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.state.status}</Text>
                    </View>
                    :
                    <FlatList
                        data={this.state.savedData}
                        renderItem={({ item, index }) => <ItemList data={item}
                            onPress={() => { this.props.navigation.navigate('Add', { item: item, index: index, get: this.get }) }}
                            Name={item.Name}
                            Email={item.Email} ContactNumber={item.ContactNumber} />}
                    />
                }
            </View>

        )
    }

}

class ItemList extends React.Component {
    componentDidMount = () => {
        console.log(this.props.data)
    }

    render() {
        return (
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: 'white',
                padding: 2,
                margin: 5,
                borderRadius: 5
            }} onPress={this.props.onPress}>
                <Text style={{ padding: 2, color: '#070707', fontWeight: 'bold' }}>{this.props.Name}</Text>
                <Text style={{ padding: 2, color: '#070707' }}>{this.props.Email}</Text>
                <Text style={{ padding: 2, color: '#070707' }}>{this.props.ContactNumber}</Text>
            </TouchableOpacity>
        )
    }

}

export default Detail;