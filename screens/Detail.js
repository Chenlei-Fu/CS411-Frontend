// src/screens/Home.js

import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native'
import axios from 'axios';
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import {parse} from "react-native-svg";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import CustomRow from '../components/CustomRow';

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
            rating: ''
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

    getRating = (instructor) => {
        console.log(instructor);
        if(this.state.rating === '') {
            axios
                .get('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/rating?name='+instructor, {
                })
                .then(response => {
                    console.log(response.data.data);
                    this.setState({rating: response.data.data});
                }).catch(error => {console.log(error)});
        }
    }



    render() {
        const {route, navigation} = this.props
        // console.log(route.params);
        const subject = route.params.subject;
        const id = route.params.id;
        const instructor = route.params.instructor;
        console.log(instructor);

        let res = [];
        let name = [];

        this.getGPA(subject,id);
        this.getRes(this.state.data, res);
        this.getName(this.state.data, name);
        this.getRating(instructor);

        console.log(this.state.rating);

        const renderItem = ({item}) => {
            console.log(item);
            // const deleteData = ()=>{
            //     this.setModalVisible(true);
            //     axios
            //         .delete('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/'+this.state.currentEmail+'?crn='+JSON.stringify(item.crn), {
            //             crn:JSON.stringify(item.crn)
            //         })
            //         .then(response => {
            //             if (response.data.status) {
            //                 console.log(response);
            //             }
            //         }).catch(error => {console.log(error)});
            // }

            return <View
                style={{
                    backgroundColor: '#bad7df',
                    borderRadius: 5,
                    margin: 10
                }}
            ><TouchableOpacity
                onPress={() => {}}
            >
                <View style={{
                    padding: 10,
                    margin:5,
                    borderRadius: 5,
                    backgroundColor: '#80A1B1',
                    alignItems: 'flex-end',
                    // height: 60,
                    width: 250
                }}>
                    <Text style={{
                        fontSize: 16,
                        color: '#000',
                        justifyContent: 'center',
                        flex: 1,
                        fontWeight: "bold"
                    }}>
                        {(item._source.fullName)}
                    </Text>
                    <Text style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginLeft: 12,
                        justifyContent: 'center',
                    }}>
                        AvgRating: {(item._source.avgRating)}
                    </Text>
                </View>

            </TouchableOpacity></View>
        }

        return (
            <View style={styles.container}>
                <View style={{marginTop:20}}>
                <AntDesign name="barschart" size={24} color="black" />
                </View>
                <Text style={{
                    color: '#101010',
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop:10,
                    marginBottom:10
                    }}
                >{subject} {name[1]}</Text>

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
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        alignSelf:'stretch',
                        marginLeft: 80,
                        marginRight: 80,
                        marginTop: 30,
                        marginBottom:20
                    }}
                />
                <View style={{marginTop:20}}>
                    <AntDesign name="heart" size={20} color="black" />
                </View>
                <Text style={{
                    color: '#101010',
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginTop:20,
                    marginBottom:20
                }}
                >Related Professor Ratings</Text>

                <FlatList
                    data={this.state.rating}
                    renderItem={renderItem}
                    keyExtractor={item => '' + item._id + item._source.fullName}
                    // numColumns={2}
                />

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
        backgroundColor: '#ebebeb',
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold',
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
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
    }
})

export default Detail

