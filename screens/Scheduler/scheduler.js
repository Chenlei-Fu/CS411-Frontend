import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert, Text, TouchableOpacity,
    Modal,
    TouchableHighlight, TextInput, FlatList
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import axios from "axios";
import * as firebase from 'firebase';
import { AntDesign , EvilIcons} from '@expo/vector-icons';
// const email = firebase.auth().currentUser.email;
let crns = [];


export default class App extends Component {

    constructor(props) {
        super(props);
        this.numOfDays = 5;
        this.pivotDate = genTimeBlock('mon');
        this.state = {
            events: '',
            user: '',
            email: firebase.auth().currentUser.email,
            modalVisible: false,
            currentCRN: '',
            remark: '',
            showText: ''
        }
    }
    //
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }


    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
        fetch("https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/" + this.state.email + '?', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                this.setState({events: json.data});
            })
            .catch((error) => console.error(error))
    }

    scrollViewRef = (ref) => {
        this.timetableRef = ref;
    };

    modifyRemark = () => {
        let temp = 'https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/remark/modify/jyh@zch.com?rid=6&crn=10005&term=120205&';
        axios
            .post(temp+this.state.remark, {
                remark: this.state.remark
            })
            .then(response => {
                if (response.data.status) {
                    console.log(response);
                }
            }).catch(error => {console.log(error)});
    }

    addRemark = () => {
        // jyh@zch.com?rid=6&crn=10005&term=120205&
        console.log(this.state.currentCRN);
        let temp = 'https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/remark/'+this.state.email + '/add';
        axios
            .post(temp, {
                crn: this.state.currentCRN,
                term: 120205,
                remark: this.state.remark
            })
            .then(response => {
                if (response.data.status) {
                    console.log(response);
                }
            }).catch(error => {console.log(error)});
    }

    getRemark = () => {
        let temp = 'https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/remark/'+this.state.email;
        fetch(temp, {
            method: 'POST'
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                this.setState({showText: json.data});
            })
            .catch((error) => console.error(error))
    }

    onEventPress = (evt) => {
        Alert.alert("onEventPress", JSON.stringify(evt));
    };

    // loadData =() => {
    //     fetch("https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/" + this.state.email + '?', {
    //         method: 'GET'
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // console.log(json);
    //             this.setState({events: json.data});
    //         })
    //         .catch((error) => console.error(error))
    // }


    parseArray = (data, parsed_data) => {
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
            crns.push(data[i].crn);
            // console.log(crns);
        }
        // console.log(this.parsed_data);
    }

    render() {
        const {navigation} = this.props;
        const { modalVisible } = this.state;
        let parsed_data = [];

        this.parseArray(this.state.events, parsed_data);
        this.getRemark();

        const renderItem = ({item}) => {
            let icon = <TouchableOpacity
                style={{padding: 6}}
                underlayColor='transparent'
                onPress={() => {this.modifyRemark(item)}}
            >
                <EvilIcons name="check" size={24} color="black" />
            </TouchableOpacity>;

            return <View>
                {icon}
                <Text style={styles.modalText}>{JSON.stringify(item.remark)}</Text>
            </View>


            // return <View>
            //     <TouchableOpacity
            //         onPress={(item) => this.modifyRemark(item)
            //         }
            //     >
            //         <Text style={styles.modalText}>{JSON.stringify(item.remark)}</Text>
            //
            //     </TouchableOpacity>
            //
            // </View>
        }


        return (
            <SafeAreaView style={{flex: 1}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {/*<Text style={styles.modalText}>{JSON.stringify(this.state.showText)}</Text>*/}
                            <FlatList
                                data={this.state.showText}
                                renderItem={renderItem}
                                keyExtractor={item => '' + item.rid}
                            />
                            <TextInput
                                value={this.state.crn}
                                onChangeText={(input) => this.setState({ remark: input })}
                                placeholder={'Add your remark'}
                                style={styles.input}
                            />

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                    this.addRemark();
                                }}
                            >
                                <Text style={styles.textStyle}>Submit your remark</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

                <View style={styles.container}>
                    <TimeTableView
                        scrollViewRef={this.scrollViewRef}
                        events={parsed_data}
                        pivotTime={8}
                        pivotEndTime={22}
                        pivotDate={this.pivotDate}
                        numberOfDays={this.numOfDays}
                        onEventPress={(evt) => {
                            // this.onEventPress(evt);
                            this.setModalVisible(true);
                            this.setState({currentCRN: JSON.stringify(crns[evt.id])});
                            console.log(crns[evt.id]);
                        }}
                        headerStyle={styles.headerStyle}
                        formatDateHeader="dddd"
                        locale="en"
                    />
                </View>
                {/*<TouchableOpacity*/}
                {/*    style={styles.buttonContainer}*/}
                {/*    onPress={() => navigation.navigate('newWindow')}>*/}
                {/*    <Text style={styles.buttonText}>new Window</Text>*/}
                {/*</TouchableOpacity>*/}

            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#1A3259'
    },
    container: {
        flex: 1,
        backgroundColor: '#80A1B1',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
