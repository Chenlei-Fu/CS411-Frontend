import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert, Text, TouchableOpacity,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import axios from "axios";
import * as firebase from 'firebase'
const email = firebase.auth().currentUser.email;
let parsed_data = [];

export default class App extends Component {

    constructor(props) {
        super(props);
        this.numOfDays = 5;
        this.pivotDate = genTimeBlock('mon');
        this.state = {
            events: '',
            user: '',
        }
    }

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
        this.loadData();
    }

    scrollViewRef = (ref) => {
        this.timetableRef = ref;
    };

    onEventPress = (evt) => {
        Alert.alert("onEventPress", JSON.stringify(evt));
    };

    loadData() {
        let temp = "https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/"+email+'?';
        axios.get(temp)
            .then(res => {
                this.setState({
                    events: res.data.data,
                });
            })
    }



    parseArray = (data) => {
        /*
          DayOfWeekString : SUN, MON, TUE, WED, THU, FRI, SAT
            type : string
         */
        for(let i = 0; i < data.length; i++) {
            if(data[i].meetDay == null || data[i].startTime == null || data[i].endTime == null) continue;
            let meets = (data[i].meetDay).split('');
            let startTimes = (data[i].startTime).split(':');
            let endTimes = (data[i].endTime).split(':');
            for(let j = 0; j < meets.length; j++) {
                let temp = "";
                switch (meets[j]) {
                    case "M":
                        temp="MON";
                        break;
                    case "T":
                        temp="TUE";
                        break;
                    case "W":
                        temp="WED";
                        break;
                    case "R":
                        temp="THU";
                        break;
                    case "F":
                        temp="TRI";
                        break;
                }
                parsed_data.push({
                    title: data[i].clsCode,
                    startTime: genTimeBlock(temp, startTimes[0],startTimes[1]),
                    endTime: genTimeBlock(temp, endTimes[0], endTimes[1]),
                    location: data[i].building + data[i].room === 0 ? 'Online': data[i].building + data[i].room,
                });


            }

        }
        // console.log(this.parsed_data);
    }

    render() {
        const {navigation} = this.props;
        this.parseArray(this.state.events);
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <TimeTableView
                        scrollViewRef={this.scrollViewRef}
                        events={parsed_data}
                        pivotTime={8}
                        pivotEndTime={22}
                        pivotDate={this.pivotDate}
                        numberOfDays={this.numOfDays}
                        onEventPress={this.onEventPress}
                        headerStyle={styles.headerStyle}
                        formatDateHeader="dddd"
                        locale="en"
                    />
                </View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('newWindow')}>
                    <Text style={styles.buttonText}>new Window</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#7c7575'
    },
    container: {
        flex: 1,
        backgroundColor: '#fbf0f0',
    },
});
