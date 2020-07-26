import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';



const events_data = [{
    "crn":12345,
    "clsCode":"cs666",
    "clsType":"Online",
    "startTime":"08:30:00", //Note this is a string
    "endTime":"10:30:00", //nullable
    "meetday":"MTW", //nullable
    "building":"Siebel", //nullable
    "room":"1111", //nullable
}];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.numOfDays = 5;
        this.pivotDate = genTimeBlock('mon');
        this.parsed_array = [];
    }

    scrollViewRef = (ref) => {
        this.timetableRef = ref;
    };

    onEventPress = (evt) => {
        Alert.alert("onEventPress", JSON.stringify(evt));
    };

    parseArray = (data) => {
        for(let i = 0; i < data.length; i++) {
            let meets = (data[i].meetday).split('');
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
                        temp="TUR";
                        break;
                    case "F":
                        temp="TRI";
                        break;
                }
                this.parsed_array.push({
                    title: data[i].clsCode,
                    startTime: genTimeBlock(temp, startTimes[0],startTimes[1]),
                    endTime: genTimeBlock(temp, endTimes[0], endTimes[1]),
                    location: data[i].building + data[i].room,
                });


            }

        }
    }

    render() {
        this.parseArray(events_data);
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <TimeTableView
                        scrollViewRef={this.scrollViewRef}
                        events={this.parsed_array}
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
