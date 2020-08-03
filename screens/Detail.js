// src/screens/Home.js

import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import {parse} from "react-native-svg";

const gpas = [
        {name: "A+", nums: 40},
        {name: "A", nums: 50},
        {name: "A-", nums: 20},
        {name: "B+", nums: 35}
    ]

class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: '',
        }
    }

    getGPA = (subject,id) => {
        if(this.state.data.length === 0) {
            axios
                .post('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/gpa/raw', {
                    term: 120198,
                    subject: subject,
                    course_id: parseInt(JSON.stringify(id)),
                    //course_name: name,
                    // crn: parseInt(JSON.stringify(crn)),
                    // instructor: instructor,
                })
                .then(response => {
                    console.log(JSON.stringify(response.data.data));
                    this.setState({data:response.data.data});

                }).catch(error => {console.log(error)});
        }
    }

    getRes = (data, res) => {
        for(let i = 0; i < data.length; i++) {
            res.push(
                {name: "A+", nums: data[i].Ap},
                {name: "A", nums: data[i].A},
                {name: "A-", nums: data[i].Am},
                {name: "B+", nums: data[i].Bp},
                {name: "B", nums: data[i].B},
                {name: "B-", nums: data[i].Bm},
                {name: "C+", nums: data[i].Cp},
                {name: "C", nums: data[i].C},
                {name: "C-", nums: data[i].Cm},
                {name: "D+", nums: data[i].Dp},
                {name: "D", nums: data[i].D},
                {name: "D-", nums: data[i].Dm},
                {name: "F", nums: data[i].F},
                {name: "W", nums: data[i].W}
                )
        }
        console.log(res);
    }

    getName = (data, name) => {
        for(let i = 0; i < data.length; i++) {
            name.push(data[i].course_name);
            name.push(data[i].course_id);
            name.push(data[i].primary_instructor);
        }

    }

    render() {
        const {route, navigation} = this.props
        // console.log(route.params);
        const subject = route.params.subject;
        const id = route.params.id;

        let res = [];
        let name = [];

        this.getGPA(subject,id);
        this.getRes(this.state.data, res);
        this.getName(this.state.data, name);

        console.log(name);


        return (
            <View style={styles.container}>
                <Text style={styles.text}>{subject} {name[1]}</Text>
                <Text style={styles.text}>{name[0]}</Text>
                <VictoryChart
                    domainPadding={20}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        tickValues={["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "W"]}
                        tickFormat={["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F", "W"]}
                    />
                    <VictoryAxis
                        dependentAxis
                        // tickFormat specifies how ticks should be displayed
                        tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryBar
                        data={res}
                        x="name"
                        y="nums"
                    />

                </VictoryChart>

            </View>
        )
    }

    // const { route } = props
    // const { temp } = route.params
    // const {crn, subject, id, name, instructor} = temp;
    // const [data, setData] = useState([]);
    // const [res, setRes] = useState([]);
    // const gpas = [
    //     {name: "A+", nums: 40},
    //     {name: "A", nums: 50},
    //     {name: "A-", nums: 20},
    //     {name: "B+", nums: 35}
    // ]


    // addItem = (input) => {
    //     setData([
    //         ...data,
    //         input
    //     ])
    //     console.log(data);
    // }

    // useEffect(() => {
    //     if(data.length === 0) {
    //         axios
    //             .post('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/gpa/raw', {
    //                 term: 120198,
    //                 subject: subject,
    //                 course_id: parseInt(JSON.stringify(id)),
    //                 //course_name: name,
    //                 // crn: parseInt(JSON.stringify(crn)),
    //                 // instructor: instructor,
    //             })
    //             .then(response => {
    //                 console.log(JSON.stringify(response.data.data));
    //                 setData([...data, (response.data.data)]);
    //                 getRes();
    //             }).catch(error => {console.log(error)});
    //     }
    //
    // })

    // function getRes() {
    //     for(let i = 0; i < data.length; i++) {
    //         setRes([...res,
    //             {name: "A+", nums: data[i].Ap},
    //             // {name: "A", nums: data[i].A},
    //             // {name: "A-", nums: data[i].Am},
    //             // {name: "B+", nums: data[i].Bp},
    //             // {name: "B", nums: data[i].B},
    //             // {name: "B-", nums: data[i].Bm}
    //         ])
    //         // res.push({
    //         //     "Ap": JSON.stringify(data[i].Ap),
    //         //     // "A": data[i].A,
    //         //     // "Am": data[i].Am,
    //         //     // "Bp": data[i].Bp,
    //         //     // "B": data[i].B,
    //         //     // "Bm": data[i].Bm,
    //         //     // "Cp": data[i].Cp,
    //         //     // "C": data[i].C,
    //         //     // "Cm": data[i].Cm,
    //         //     // "Dp": data[i].Dp,
    //         //     // "D": data[i].D,
    //         //     // "Dm": data[i].Dm,
    //         //     // "F": data[i].F,
    //         //     // "W": data[i].W,
    //         // })
    //     }
    //
    // }





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

