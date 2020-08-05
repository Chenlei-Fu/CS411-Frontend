
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList, DeviceInfo, Platform} from 'react-native'
import { connect } from 'react-redux'
import {removeFavorite} from "../../action/favorite";
import {AntDesign} from "@expo/vector-icons";
import SearchItem from "../../components/SearchItem";
import GlobalStyles from "../../utils/GlobalStyles";
import axios from "axios";
import * as firebase from 'firebase'
// const email = firebase.auth().currentUser.email;
class Favorite extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: firebase.auth().currentUser.email
        }
    }
    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    postData = () => {
        let temp = "https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/"+this.state.email+'?';
        let data = [];
        // console.log(this.props.favorites[0].crn);
        for(let i = 0; i < this.props.favorites.length; i++) {
            data.push(JSON.stringify(this.props.favorites[i].crn));
            console.log(data[i]);
        }
        for(let i = 0; i < data.length; i++) {
            axios
                .put(temp, {
                    crn: data[i]
                })
                .then(response => {
                    if (response.data.status) {
                        console.log(response);
                    }
                }).catch(error => {console.log(error)});
        }
    }

    render() {
        const renderItem = ({item}) => {
            let favoriteIcon =  <TouchableOpacity
                style={{padding: 6}}
                underlayColor='transparent'
                onPress={() => this.props.removeFavorite(item)}
            >
                <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>;

            return <TouchableOpacity
                onPress={()=>{}}
            >
                <View style={SearchItem.cell_container}>
                    <Text style={SearchItem.title}>
                        {JSON.stringify(item.subject) + JSON.stringify(item.course_id) + JSON.stringify(item.course_name)}
                    </Text>
                    <Text style={SearchItem.description}>
                        {JSON.stringify(item.type_name)}
                    </Text>
                    <View style={SearchItem.row}>
                        <View style={SearchItem.row}>
                            <Text>CRN: {JSON.stringify(item.crn)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Term: </Text>
                            <Text>{JSON.stringify(item.term_name)}</Text>
                        </View>
                        {favoriteIcon}
                    </View>
                    <View style={SearchItem.row}>
                        <View style={SearchItem.row}>
                            <Text>start: {JSON.stringify(item.start)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>end: </Text>
                            <Text>{JSON.stringify(item.end)}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>days of week: </Text>
                            <Text>{JSON.stringify(item.days_of_week)}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        }
        return (
            <View style={styles.container}>
                {/*<Text>{JSON.stringify(this.props.favorites)}</Text>*/}
                <FlatList
                    data={this.props.favorites}
                    renderItem={renderItem}
                    keyExtractor={item => '' + item.crn}
                />
                <TouchableOpacity
                    style={{backgroundColor: '#1A3259', marginTop: 20,marginBottom: 50,marginLeft: 100, marginRight: 100, padding:6, borderRadius: 5, alignItems: 'center'}}
                    onPress={() => this.postData()}>
                    <Text style={styles.buttonText}>Enroll Courses</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

const mapStateToProps = state => {
    return{
        favorites : state.favorite
    }
}

const mapDispatchToProps =  dispatch => {
    return{
        removeFavorite : item => {
            dispatch(removeFavorite(item))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        margin: 0,
    },
    indicatorContainer: {
        alignItems: 'center',
    },
    indicator: {
        color: 'red',
        margin: 10,
    },
    statusBar: {
        height: 20,
    },
    bottomButton: {
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        height: 40,
        position: 'absolute',
        left: 10,
        top: GlobalStyles.window_height - 45 - (DeviceInfo.isIPhoneX_deprecated ? 34 : 0),
        right: 10,
        borderRadius: 3,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 26 : 36,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: 'white',
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white',
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
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
        color: '#fff',
        alignItems: 'center'
    }
})


