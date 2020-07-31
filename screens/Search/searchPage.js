import React, {Component} from 'react';
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
    Button
} from 'react-native';
import DataStore from '../../expand/dao/DataStore';
import GlobalStyles from '../../utils/GlobalStyles';
import SearchItem from '../../components/SearchItem'
import {AntDesign} from "@expo/vector-icons";
import PopularItem from "../../components/PopularItem";
import { connect } from 'react-redux'
const URL = 'https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/search?subject=';
import SearchIcon from "./searchIcon";
import {addFavorite} from "../../action/favorite";
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: '',
            isFavorite: false
        };
        this.dataDtore = new DataStore();
    }

    loadData() {
        let url = `https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/clsSchedule/${this.value}`;
        this.dataDtore.fetchData(url)
            .then(data => {
                this.setState({
                    showText: data.data.data,
                });
            })
            .catch(error => {
                error && console.log(error.toString());
            });
    }

    render() {
        const { navigation } = this.props;
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
                onPress={()=>{}}
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
            <View style={styles.container}>
                <View style={{
                    backgroundColor: '#222',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
                }}>
                    <TextInput
                        ref="input"
                        placeholder={placeholder}
                        onChangeText={text => this.value = text}
                        style={styles.textInput}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            this.loadData();
                        }}
                    >
                        <View style={{marginRight: 10}}>
                            <Text style={styles.title}>{'Search'}</Text>
                        </View>
                    </TouchableOpacity>
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
                    keyExtractor={item => '' + item.crn}
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
    }
});


