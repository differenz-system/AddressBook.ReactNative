import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
}
    from 'react-native'

const styles = StyleSheet.create({
    ButtonControl: {
        marginTop: 20,
        height: 45,
        backgroundColor: '#008277',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
})

export default class ButtonControl extends React.Component {
    
    render = () => {
        return (
            <TouchableOpacity onPress={this.props.ButtonPress} style={styles.ButtonControl} >
                <Text style={{ fontSize: 16, color: '#FFF' }}>{this.props.ButtonTitle}</Text>
            </TouchableOpacity>
        )
    }
}
