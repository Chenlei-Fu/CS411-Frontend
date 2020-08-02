// src/screens/Home.js

import React, {useState} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { VictoryBar, VictoryChart } from "victory-native";
import {parse} from "react-native-svg";
function Detail(props){
    const { route } = props
    const { temp } = route.params
    const {crn, subject, id, name, instructor} = temp;
    // const {data, setData} = useState([]);

    // addItem = (input) => {
    //     setData([
    //         ...data,
    //         input
    //     ])
    //     console.log(data);
    // }


    // const getGPA = () => {
    //     axios
    //         .post('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/gpa/raw', {
    //             term: 120198,
    //             subject: subject,
    //             course_id: parseInt(JSON.stringify(id)),
    //             //course_name: name,
    //             // crn: parseInt(JSON.stringify(crn)),
    //             // instructor: instructor,
    //         })
    //         .then(response => {
    //             console.log(response.data);
    //         }).catch(error => {console.log(error)});
    //
    // }

    return (
        <View style={styles.container}>

            <Text style={styles.text}>Hello</Text>

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
    },
    card: {
        width: 350,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#101010',
        margin: 10,
        padding: 10,
        alignItems: 'center'
    },
    cardText: {
        fontSize: 18,
        color: '#ffd700',
        marginBottom: 5
    },
    buttonContainer: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    }
})

export default Detail

