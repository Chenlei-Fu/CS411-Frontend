import React, {Component,useRef} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Platform,
    RefreshControl,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    DeviceInfo,
    Button,
    Modal
} from 'react-native';
import DataStore from '../../expand/dao/DataStore';
import GlobalStyles from '../../utils/GlobalStyles';
import SearchItem from '../../components/SearchItem'
import {AntDesign} from "@expo/vector-icons";
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PopularItem from "../../components/PopularItem";
import { connect } from 'react-redux'
const URL = 'https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/search?subject=';
import SearchIcon from "./searchIcon";
import { Modalize } from 'react-native-modalize';
import {addFavorite} from "../../action/favorite";

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: '',
            isFavorite: false,
            name: '',
            subject: '',
            id: '',
            crn: '',
            limit: '',
            modalVisible: false
        };
        this.dataDtore = new DataStore();
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    loadData() {
        let url = `https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/search?`;
        let temp1 = this.state.subject != ''?'subject='+this.state.subject:'';
        let temp2 = this.state.id != ''?'id='+this.state.id:'';
        let temp3 = this.state.crn != ''? 'crn=' + this.state.crn:'';
        let temp4 = this.state.name!= ''? 'name=' + this.state.name: '';
        let temp5 = this.state.limit != ''?'limit=' + this.state.limit:'';
        let u = url+temp1+'&'+temp4+'&'+temp2+'&'+temp5+'&'+temp3+'&isCurrentTerm=true';
        console.log(u);
        this.dataDtore.fetchData(u)
            .then(data => {
                console.log(data.data.response);
                this.setState({
                    showText: data.data.response,
                });
            })
            .catch(error => {
                error && console.log(error.toString());
            });
    }

    render() {
        const { navigation } = this.props;
        const { modalVisible } = this.state;


        const tempRender = (item) => (
            <View>
                <Text>{item.heading}</Text>
            </View>
        );

        const placeholder = this.state.storeName || 'Enter your course Name';

        const renderItem = ({item}) => {
            let favoriteIcon =  <TouchableOpacity
                style={{padding: 6}}
                underlayColor={this.state.isFavorite? 'transparent': 'black'}
                onPress={() => this.props.addFavorite(item)}
            >
                <AntDesign name="staro" size={24} color="black" />
            </TouchableOpacity>;

            return <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('Detail', {
                        temp:
                            {   crn: item.crn,
                                subject: item.subject,
                                id: item.course_id,
                                name: item.course_name,
                                instructor: item.full_name
                            }})
                }}
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



                <View style={{
                    backgroundColor: '#c9d6df',
                    marginBottom: 30
                }}
                >
                    <View style={{
                        marginTop: 10,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 30
                    }}>
                    {/*<TextInput*/}
                    {/*    ref="input"*/}
                    {/*    placeholder={placeholder}*/}
                    {/*    onChangeText={text => this.value = text}*/}
                    {/*    style={styles.textInput}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Fumi
                        label={'Course Name'}
                        iconClass={FontAwesomeIcon}
                        iconName={'university'}
                        iconColor={'#ffe2e2'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        onChangeText={(text) => { this.setState({name: text}) }}
                    />
                    <Fumi
                        label={'Subject'}
                        iconClass={FontAwesomeIcon}
                        iconName={'graduation-cap'}
                        iconColor={'#8785a2'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        onChangeText={(text) => { this.setState({subject: text}) }}
                    />
                    <Fumi
                        label={'Course Id'}
                        iconClass={FontAwesomeIcon}
                        iconName={'code'}
                        iconColor={'#ffc7c7'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        onChangeText={(text) => { this.setState({id: text}) }}
                    />
                    <Fumi
                        label={'Output Limits'}
                        iconClass={FontAwesomeIcon}
                        iconName={'lock'}
                        iconColor={'#ffc7c7'}
                        iconSize={20}
                        iconWidth={40}
                        inputPadding={16}
                        onChangeText={(text) => { this.setState({limit: text}) }}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#52616b',
                            alignItems: "center",
                            padding: 10
                        }}
                        onPress={() => {
                            this.loadData();
                        }}
                    >
                        <View style={{marginRight: 10}}>
                            <Text style={styles.title}>{'Search'}</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    onChangeText={text => {*/}
                {/*        this.value = text;*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<Text onPress={() => {*/}
                {/*    this.loadData();*/}
                {/*}}>*/}
                {/*    获取*/}
                {/*</Text>*/}
                {/*<Text>{this.state.showText}</Text>*/}
                <FlatList
                    data={this.state.showText}
                    renderItem={renderItem}
                    keyExtractor={item => '' + item.crn+item.term_id+item.start}
                />
                {/*<SearchIcon/>*/}
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => navigation.navigate('Favorite')}>
                    <Text style={styles.buttonText}>Go to Favorites</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        favorites: state.favorite
    }
}
const mapDispatchToProps =  dispatch => {
    return{
        addFavorite : item => {
            dispatch(addFavorite(item))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchPage);

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
        color: '#fff'
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


