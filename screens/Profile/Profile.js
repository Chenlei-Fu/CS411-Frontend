import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput,Button} from 'react-native';
import { Formik } from 'formik';
import * as firebase from 'firebase'
const URL = "https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/jyh@zch.com?key=LyIhtO%Gq$fg&crn=10005"
export default class Profile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentEmail: '',
            crn:''
        };
    }
    postData = async(email,crn) => {
        try {
            let res = await fetch('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/${this.email}?key=LyIhtO%Gq$fg&crn=${this.crn}', {
                method: 'PUT',
                headers: {
                    Status: 'Success'
                },
                body: JSON.stringify({
                    email: email,
                    crn: crn
                }),
            });
            res = await res.json();
            console.log(res)
        } catch (e) {
            console.error(e);
        }
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{firebase.auth().currentUser.email}</Text>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('SearchPage')}>
                    <Text style={styles.buttonText}>Search Courses</Text>
                </TouchableOpacity>
                <TextInput
                    value={this.state.crn}
                    onChangeText={(crn) => this.setState({ crn })}
                    placeholder={'Enter Course CRN'}
                    style={styles.input}
                />

                <Button
                    title={'Enroll This Course'}
                    style={styles.input}
                    onPress={()=>{this.postData(this.state.currentEmail, this.state.crn)}}
                />
            </View>
        )
    }

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

