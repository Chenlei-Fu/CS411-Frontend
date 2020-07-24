import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import actions from '../../action/index';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NavigationUtil from '../../navigation/NavigationUtil';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const Tab = createMaterialTopTabNavigator();
export default class PopularScreen extends Component{
    constructor(props) {
        super(props);
        console.log(NavigationUtil.navigation);
        this.tabNames = ['java', 'Android', 'iOS', 'React', 'PHP']
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
                            backgroundColor: '#ffa',//TabBar 的背景颜色
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
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url);
    }
    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }
    renderItem(data) {
        const item=data.item;

        return <View style={{marginBottom: 10}}>
            <Text style={{backgroundColor: '#faa'}}>
                {JSON.stringify(item)}
            </Text>
        </View>
    }

    render(){
        const {popular} = this.props;
        let store=popular[this.storeName]; //动态获取state
        if (!store) {
            store={
                items: [],
                isLoading: false,
            }

        }
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => '' + item.id}
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
            </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName,url)),
});
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
});
