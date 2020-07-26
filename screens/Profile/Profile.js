import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

function Profile(props) {
    const {navigation} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Tab</Text>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('SearchPage')}>
                <Text style={styles.buttonText}>Search Courses</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default Profile
