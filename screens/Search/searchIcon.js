import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import { withNavigation } from 'react-navigation'

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import * as RootNavigation from '../../navigation/RootNavigation';
import {useNavigation} from '@react-navigation/native';

import NavigationUtil from '../../navigation/NavigationUtil'
function SearchIcon (props) {
    return(
        <View style={[{padding: 5}, Platform.OS == 'android' ? styles.iconContainer : null]}>
        <View style={{
            position: 'absolute',
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: 'rgba(95,197,123,0.8)',
            right: 15,
            bottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,

        }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{props.cartItems.length}</Text>
        </View>
        <Icon onPress={() => RootNavigation.navigate('Enrollment')} name="ios-cart" size={30}/>
    </View>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

export default connect(mapStateToProps, null)(SearchIcon);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        paddingLeft: 20, paddingTop: 10, marginRight: 5
    }
});
