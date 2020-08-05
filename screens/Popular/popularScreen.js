import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, TouchableHighlight,View, Modal} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../action/index';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NavigationUtil from '../../navigation/NavigationUtil';
import PopularItem from '../../components/PopularItem'
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import {addFavorite} from "../../action/favorite";
import axios from "axios";
import SearchItem from '../../components/SearchItem'
import {sub} from "react-native-reanimated";
const URL = 'https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/search?subject=';
const Tab = createMaterialTopTabNavigator();
export default class PopularScreen extends Component{
    constructor(props) {
        super(props);
        console.log(NavigationUtil.navigation);
        this.tabNames = ['CS', 'Math', 'ECE', 'STAT', 'ECON']
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }

    render() {
        const TabNavigator = this.tabNames.length ? <NavigationContainer
            independent={true}
        >
            <Tab.Navigator
                lazy={true}
                tabBarOptions={
                    {
                        tabStyle: styles.tabStyle,
                        // upperCaseLabel: false,//5x 暂不支持标签大写控制
                        scrollEnabled: true,//是否支持 选项卡滚动，默认false
                        activeTintColor: 'white',
                        style: {
                            backgroundColor: '#222',//TabBar 的背景颜色
                            // 移除以适配react-navigation4x
                            // height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
                        },
                        indicatorStyle: styles.indicatorStyle,//标签指示器的样式
                        labelStyle: styles.labelStyle,//文字的样式
                    }
                }
            >
                {
                    Object.entries(this._genTabs()).map(item => {
                        return <Tab.Screen
                            name={item[0]}
                            component={item[1].screen}
                            options={item[1].navigationOptions}
                        />;
                    })
                }
            </Tab.Navigator>
        </NavigationContainer> : null;


        return <View style={styles.container}>
            {TabNavigator}
        </View>;
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
        this.state = {
            comment: [],
            modalVisible: false
        }
    }
    componentDidMount() {
        this.loadData();

    }

    setModalVisible = (visible, subject, id) => {
        this.getCourseComment(subject,id)
        this.setState({ modalVisible: visible });
    }
    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url);
    }
    genFetchUrl(key) {
        return URL + key + '&isCurrentTerm=false';
    }

    getCourseComment(subject,id) {

        axios
            .get('https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/comment/class/'+subject+id + '?limit=10', {
            })
            .then(response => {
                console.log(response);
                this.setState({comment: response.data.data});
            }).catch(error => {console.log(error)});


    }


    render(){
        const {popular} = this.props;
        let store=popular[this.storeName]; //动态获取state
        if (!store) {
            store={
                response: [],
                isLoading: false,
            }

        }
        const { modalVisible } = this.state;

        const renderItem = ({item}) => {
            let favoriteIcon =  <TouchableOpacity
                style={{padding: 6}}
                underlayColor='transparent'
                onPress={() => {this.setModalVisible(true, item.subject, item.course_id)}}
            >
                <MaterialIcons name="details" size={24} color="black" />
            </TouchableOpacity>

            return (
                <TouchableOpacity
                    onPress={() => this.props.onSelect}
                >
                    <View style={SearchItem.cell_container}>
                        <Text style={SearchItem.title}>
                            {item.subject} {item.course_id}
                        </Text>
                        <Text style={SearchItem.description}>
                            {item.course_name}
                        </Text>
                        <View style={SearchItem.row}>
                            <View style={SearchItem.row}>
                                <Text>Instructor: {item.full_name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text>Start:</Text>
                                <Text>{item.term_name}</Text>
                            </View>
                            {favoriteIcon}
                        </View>
                    </View>

                </TouchableOpacity>);
        }

        const renderComment = ({item}) => {
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

            return <View><TouchableOpacity
                onPress={() => {}}
            >
                <View style={styles.cell_container}>
                    <Text style={{

                    }}>
                        {(item._source.comment)}
                    </Text>
                    <View
                        style={styles.row}
                    >
                        <Text style={{
                            fontWeight:"bold",
                            marginTop:5
                        }}>
                            Got Grade:
                        </Text>
                        <Text style={{
                            marginTop:5
                        }}>
                            {'  '}{(item._source.grade)}
                        </Text>
                    </View>
                    <View
                        style={styles.row}
                    >
                        <Text style={{
                            fontWeight:"bold"
                        }}>
                            difficultyRating:
                        </Text>
                        <Text style={{

                        }}>
                            {'  '}{(item._source.difficultyRating)}
                        </Text>
                    </View>

                </View>

            </TouchableOpacity></View>
        }


        return (
            <View style={styles.container}>
                <FlatList
                    data={store.response}
                    renderItem={data => renderItem(data)}
                    keyExtractor={item => '' + item.crn + item.term_id + item.full_name}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor= {'#faa'}
                            colors={'#faa'}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={'#faa'}
                        />
                    }
                />

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

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#80A1B1" }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Comments</Text>
                            </TouchableHighlight>
                            <Text style={{
                                color: '#101010',
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginTop:20,
                                marginBottom:20
                            }}
                            >Professor Comments</Text>
                            <View>
                                <FlatList
                                    data={this.state.comment}
                                    renderItem={renderComment}
                                    keyExtractor={item => ''+item._id}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        popular: state.popular,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName,url)),

    }

};
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        marginTop: 50,
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
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121',
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575',
    }
});
