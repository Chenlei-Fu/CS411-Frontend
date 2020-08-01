import React ,{useState}from 'react';
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    Animated,
    Dimensions,
    TouchableHighlight,
    FlatList,
    SafeAreaView,
    ScrollView,
    Image
} from 'react-native';
import { Formik } from 'formik';
import DataStore from '../../expand/dao/DataStore';
import * as firebase from 'firebase'
import axios from 'axios';
import { SwipeListView } from 'react-native-swipe-list-view';
import SearchItem from "../../components/SearchItem";
import SearchIcon from "../Search/searchIcon";
const URL = "https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/"

export default class Profile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentEmail: firebase.auth().currentUser.email,
            crn:'',
            showText: '',
            selectedKey: ''
        };
        this.dataDtore = new DataStore();
    }

    componentDidMount() {
        this.loadData();
    }

    // postData = () => {
    //     let temp = "https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/"+this.state.currentEmail+'?';
    //     axios
    //         .put(temp, {
    //         crn:this.state.crn
    //     })
    //     .then(response => {
    //         if (response.data.status) {
    //             console.log(response);
    //         }
    //     }).catch(error => {console.log(error)});
    // }

    loadData() {
        let temp = "https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/"+this.state.currentEmail+'?';
        axios.get(temp)
            .then(res => {
                this.setState({
                    showText: res.data.data,
                });
            })
    }


    // deleteRow = (rowMap, rowKey) => {
    //     this.closeRow(rowMap, rowKey);
    //     const newData = [...listData];
    //     const prevIndex = listData.findIndex(item => item.key === rowKey);
    //     newData.splice(prevIndex, 1);
    //     setListData(newData);
    // };
    //
    //
    // onLeftAction = rowKey => {
    //     this.deleteRow(rowMap,rowKey)
    // };

    render() {
        const {navigation} = this.props;


        const renderItem = ({item}) => {
            let favoriteIcon =  <TouchableOpacity
                style={{padding: 6}}
                underlayColor='transparent'
                onPress={() => {deleteData()}}
            >
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>;

            const deleteData = ()=>{
                axios
                    .delete('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/123@gmail.com?crn='+JSON.stringify(item.crn), {
                        crn:JSON.stringify(item.crn)
                    })
                    .then(response => {
                        if (response.data.status) {
                            console.log(response);
                        }
                    }).catch(error => {console.log(error)});
            }

            return <TouchableOpacity
                onPress={() => {}}
            >
                <View style={SearchItem.cell_container}>
                    <Text style={SearchItem.title}>
                        {JSON.stringify(item.clsCode)}
                    </Text>
                    <Text style={SearchItem.description}>
                        {JSON.stringify(item.clsType)}
                    </Text>
                    <View style={SearchItem.row}>
                        <View style={SearchItem.row}>
                            <Text>StartTime: {JSON.stringify(item.startTime)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>EndTime: </Text>
                            <Text>{JSON.stringify(item.endTime)}</Text>
                        </View>
                        {favoriteIcon}
                    </View>
                </View>

            </TouchableOpacity>
        }

        return (
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titleBar}>
                            <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                            <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
                        </View>

                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileImage}>
                                <Image source={require("../../assets/github.jpg")} style={styles.image} resizeMode="center"></Image>
                            </View>
                            <View style={styles.dm}>
                                <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                            </View>
                            <View style={styles.active}></View>
                            <View style={styles.add}>
                                <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                            </View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Gitty</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{firebase.auth().currentUser.email}</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>GPA</Text>
                                <Text style={[styles.text, styles.subText]}>4.0</Text>
                            </View>
                            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                <Text style={[styles.text, { fontSize: 24 }]}>Credits</Text>
                                <Text style={[styles.text, styles.subText]}>94</Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 24 }]}>Term</Text>
                                <Text style={[styles.text, styles.subText]}>Summer 2020</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 32 }}>
                            <View>
                                <TouchableOpacity
                                    style={styles.buttonContainer}
                                    onPress={() => navigation.navigate('SearchPage')}>
                                    <Text style={styles.buttonText}>Search More Courses</Text>
                                </TouchableOpacity>
                            </View>

                            {/*<View style={{ alignItems: "center" }}>*/}
                            {/*    <TextInput*/}
                            {/*        value={this.state.crn}*/}
                            {/*        onChangeText={(crn) => this.setState({ crn })}*/}
                            {/*        placeholder={'Enter Course CRN'}*/}
                            {/*        style={styles.input}*/}
                            {/*    />*/}
                            {/*    <TouchableOpacity*/}
                            {/*        style={styles.buttonContainer}*/}
                            {/*        onPress={() => this.postData()}>*/}
                            {/*        <Text style={styles.buttonText}>Enroll Courses</Text>*/}
                            {/*    </TouchableOpacity>*/}

                            {/*</View>*/}
                            {/*<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>*/}
                            {/*    <View style={styles.mediaImageContainer}>*/}
                            {/*        <Image source={require("../../assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>*/}
                            {/*    </View>*/}
                            {/*    <View style={styles.mediaImageContainer}>*/}
                            {/*        <Image source={require("../../assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>*/}
                            {/*    </View>*/}
                            {/*    <View style={styles.mediaImageContainer}>*/}
                            {/*        <Image source={require("../../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>*/}
                            {/*    </View>*/}
                            {/*</ScrollView>*/}
                            {/*<View style={styles.mediaCount}>*/}
                            {/*    <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>*/}
                            {/*    <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>*/}
                            {/*</View>*/}
                        </View>
                        <Text style={[styles.subText, styles.recent]}>Enrolled courses</Text>
                        <FlatList
                            data={this.state.showText}
                            renderItem={renderItem}
                            keyExtractor={item => '' + item.crn}
                        />

                    </ScrollView>

                {/*<FlatList*/}
                {/*    data={this.state.data} // Assuming this is `this.state.data`*/}
                {/*    keyExtractor={({item}) => item.crn}*/}
                {/*    renderItem={({item}) => (*/}
                {/*        <View style={styles.container}>*/}
                {/*            <SwipeView*/}
                {/*            onSwipedLeft={() => this.deleteItemById(item.id)}*/}
                {/*        />*/}
                {/*        </View>*/}
                {/*        )}*/}
                {/*/>*/}
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
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
    enrollButton: {
        backgroundColor: '#222',
        borderRadius: 5,
        padding: 10,
        margin: 20
    }
});
