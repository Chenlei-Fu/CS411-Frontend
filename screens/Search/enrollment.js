import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
class enrollment extends React.Component{
    // const {navigation} = props;

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text>Hi</Text>
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('SearchPage')}>
                    <Text style={styles.buttonText}>Search Courses</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         cartItems: state
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
//     }
// }

export default enrollment;
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

