import React, { Component } from 'react'
import { View, TextInput, StyleSheet, } from 'react-native'
const styles = StyleSheet.create({
    Container: { marginTop: 10, backgroundColor:'white', height: 45, borderColor: 'rgba(0,0,0,0.5)', borderWidth: 1, borderRadius: 5 },
    TextInputControl: {
        fontSize: 18,
        height: 45,
        marginHorizontal: 10,
    }
})

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (
            <View style={styles.Container}>
                <TextInput
                    placeholderTextColor = 'rgba(0,0,0,0.4)'
                    value={this.props.value}
                    returnKeyType={this.props.returnKeyType}
                    onChangeText={this.props.onChangeText}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.props.secureTextEntry}
                    underlineColorAndroid={this.props.underlineColorAndroid}
                    style={styles.TextInputControl}
                    keyboardType={this.props.keyboardType}
                    maxLength={this.props.maxLength}
                >
                </TextInput>
            </View>
        )
    }
}
