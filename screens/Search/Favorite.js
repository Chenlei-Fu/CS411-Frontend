
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList, DeviceInfo, Platform} from 'react-native'
import { connect } from 'react-redux'
import {removeFavorite} from "../../action/favorite";
import {AntDesign} from "@expo/vector-icons";
import SearchItem from "../../components/SearchItem";
import GlobalStyles from "../../utils/GlobalStyles";

class Favorite extends React.Component{

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
                {/*<Text>{JSON.stringify(this.props.favorites)}</Text>*/}
                <FlatList
                    data={this.props.favorites}
                    renderItem={renderItem}
                    keyExtractor={item => '' + item.crn}
                />
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
        color: '#fff'
    }
})


