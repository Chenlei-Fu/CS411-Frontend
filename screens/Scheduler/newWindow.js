import React from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import axios from "axios";

export default class newWindow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            remark: '',
            crn: ''
        }
    }


    render() {
        const addRemark = () => {
            let temp = 'https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/remark/modify/jyh@zch.com?rid=6&crn=10005&term=120205&';
            axios
                .put(temp+this.state.remark, {
                    remark: this.state.remark
                })
                .then(response => {
                    if (response.data.status) {
                        console.log(response);
                    }
                }).catch(error => {console.log(error)});
        }

        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.crn}
                    onChangeText={(remark) => this.setState({ remark })}
                    placeholder={'Your remark'}
                    style={styles.input}
                />
                {/*<TextInput*/}
                {/*    value={this.state.crn}*/}
                {/*    onChangeText={(crn) => this.setState({ crn })}*/}
                {/*    placeholder={'Your remark'}*/}
                {/*    style={styles.input}*/}
                {/*/>*/}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => addRemark()}>
                    <Text style={styles.buttonText}>Submit remark</Text>
                </TouchableOpacity>
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
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    enrollButton: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    }
})
