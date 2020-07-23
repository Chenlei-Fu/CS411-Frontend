import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';

const events_data = [
    {
        title: "Math347",
        startTime: genTimeBlock("MON", 8),
        endTime: genTimeBlock("MON", 8, 50),
        location: "140 HAB",
    },
    {
        title: "Math347",
        startTime: genTimeBlock("WED", 8),
        endTime: genTimeBlock("WED", 8, 50),
        location: "140 HAB",
    },
    {
        title: "Math347",
        startTime: genTimeBlock("FRI", 8),
        endTime: genTimeBlock("FRI", 8, 50),
        location: "140 HAB",
    },
    {
        title: "CS225 Lec",
        startTime: genTimeBlock("MON", 11),
        endTime: genTimeBlock("MON", 11, 50),
        location: "1002 ECEB",
    },
    {
        title: "CS225 Lec",
        startTime: genTimeBlock("WED", 11),
        endTime: genTimeBlock("WED", 11, 50),
        location: "1002 ECEB",
    },
    {
        title: "CS225 Lec",
        startTime: genTimeBlock("FRI", 11),
        endTime: genTimeBlock("FRI", 11, 50),
        location: "1002 ECEB",
    },
    {
        title: "CS233 Lec",
        startTime: genTimeBlock("MON", 9),
        endTime: genTimeBlock("MON", 9, 50),
        location: "1320 DCL",
    },
    {
        title: "CS233 Lec",
        startTime: genTimeBlock("WED", 9),
        endTime: genTimeBlock("WED", 9, 50),
        location: "1320 DCL",
    },
    {
        title: "CS233 Lec",
        startTime: genTimeBlock("FRI", 9),
        endTime: genTimeBlock("FRI", 9, 50),
        location: "1320 DCL",
    },
    {
        title: "CS357 Lec",
        startTime: genTimeBlock("TUE", 15, 20),
        endTime: genTimeBlock("TUE", 16, 40),
        location: "1404 Siebel",
    },
    {
        title: "CS357 Lec",
        startTime: genTimeBlock("THU", 15, 20),
        endTime: genTimeBlock("THU", 16, 40),
        location: "1404 Siebel",
    },
    {
        title: "CS225 Lab",
        startTime: genTimeBlock("WED", 18, 30),
        endTime: genTimeBlock("WED", 21),
        location: "Activity Center",
    },
    {
        title: "Club Activity",
        startTime: genTimeBlock("FRI", 13, 30),
        endTime: genTimeBlock("FRI", 14, 50),
        location: "Activity Center",
    },
];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.numOfDays = 5;
        this.pivotDate = genTimeBlock('mon');
    }

    scrollViewRef = (ref) => {
        this.timetableRef = ref;
    };

    onEventPress = (evt) => {
        Alert.alert("onEventPress", JSON.stringify(evt));
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <TimeTableView
                        scrollViewRef={this.scrollViewRef}
                        events={events_data}
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
