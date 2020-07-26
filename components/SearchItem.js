import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import BaseItem from "./BaseItem";
// export default class SearchItem extends Component{
//     render() {
//         const {item} = this.props;
//         if (!item) {
//             return null;
//         }
//         let favoriteIcon =  <TouchableOpacity
//             style={{padding: 6}}
//             underlayColor='transparent'
//             onPress={() => {}}
//         >
//             <AntDesign name="staro" size={24} color="black" />
//         </TouchableOpacity>
//
//         return (
//             <TouchableOpacity
//                 onPress={() => this.props.onSelect}
//             >
//                 <View style={styles.cell_container}>
//                     <Text style={styles.title}>
//                         {JSON.stringify(item.crn)}
//                     </Text>
//                     <Text style={styles.description}>
//                         {/*{item.item.course_name}*/}
//                     </Text>
//                     <View style={styles.row}>
//                         <View style={styles.row}>
//                             <Text>Instructor: </Text>
//                         </View>
//                         <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//                             <Text>Start:</Text>
//                             <Text></Text>
//                         </View>
//                         {favoriteIcon}
//                     </View>
//                 </View>
//
//             </TouchableOpacity>
//         );
//     }
// }

export default {
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
            justifyContent: 'space-between',
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
}

