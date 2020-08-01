import React from 'react';
import {DangerZone, Svg} from "expo";
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    Picker,
    Platform
} from "react-native";

import {
    Container, Title, Progress,
} from './styles';



import {getCountdownParts} from './helper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import * as firebase from 'firebase'
const email = firebase.auth().currentUser.email;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: null,
            courseTime: '2020/07/26 20:40:06'
        };
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
        }, 1000)
    }

    render() {
        const{days,hours,minutes,seconds} = getCountdownParts(this.state.courseTime);

        return (
            <Container>
                <Title>{CS225}</Title>
                <AnimatedCircularProgress
                    size={300}
                    width={10}
                    fill={(minutes + hours * 60)*100 / 60}
                    tintColor="#ea8a8a"
                    backgroundColor="#fff"
                    rotation={0}
                >
                    {() =>
                        <View>
                            <Progress>Before Class:</Progress>
                            <Progress>{hours}:{minutes}:{seconds}</Progress>
                        </View>
                    }
                </AnimatedCircularProgress>
                <Text
                    style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 100
                    }}
                >Address: {ECEB}</Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    outerCircle: {
        backgroundColor: 'blue',
        width: 200,
        height: 200,
        borderRadius: 200/2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle: {
        backgroundColor: 'green',
        width: 100,
        height: 100,
        borderRadius: 100/2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
