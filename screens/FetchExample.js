import React from 'react';
import { FlatList, ActivityIndicator, Text, View } from 'react-native';
import * as data from '../public/test.json'

export default function FetchExample(props) {
    // componentDidMount() {
    //     return fetch('api/test.json')
    //         .then(response => response.json())
    //         .then(responseJson => {
    //             this.setState(
    //                 {
    //                     isLoading: false,
    //                     dataSource: responseJson.movies,
    //                 },
    //                 function() {}
    //             );
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }


    return (
        <View style={{ flex: 1, paddingTop: 20 }}>
            <Text>{data.title}</Text>
            {/*<FlatList*/}
            {/*    data={customData}*/}
            {/*    renderItem={({ item }) => (*/}
            {/*        <Text>*/}
            {/*            {item.title}, {item.releaseYear}*/}
            {/*        </Text>*/}
            {/*    )}*/}
            {/*    keyExtractor={({ id }, index) => id}*/}
            {/*/>*/}
        </View>
    );

}
