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
    Platform,
    Button
} from "react-native";

import {
    Container, Title, Progress,
} from './styles';



import {getCountdownParts} from './helper';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import * as firebase from 'firebase'
// const email = firebase.auth().currentUser.email;
import {createOpenLink} from 'react-native-open-maps';
const yosemite = { latitude: 37.4847, longitude: 122.1477 };
const openYosemiteZoomedOut = createOpenLink({ ...yosemite, zoom: 30, provider: 'google' });
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curTime: null,
            courseTime: '2020/08/3 20:40:06',
            email: firebase.auth().currentUser.email
        };
    }

    _goToYosemite() {
        openMap({ latitude: 40.1150, longitude: 88.2282 });
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                curTime : new Date().toLocaleString()
            })
        }, 1000)
    }

    // loadData =() => {
    //     fetch("https://58cemmiu9d.execute-api.us-west-1.amazonaws.com/dev/usrSchedule/" + this.state.email + '?', {
    //         method: 'GET'
    //     })
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // console.log(json);
    //             this.setState({showText: json.data});
    //             console.log(this.state.showText);
    //         })
    //         .catch((error) => console.error(error))
    // }

    render() {
        const{days,hours,minutes,seconds} = getCountdownParts(this.state.courseTime);

        return (
            <Container>
                <Title>{'CS225'}</Title>
                <AnimatedCircularProgress
                    size={300}
                    width={10}
                    fill={(minutes + hours * 60)*100 / 60}
                    tintColor="#6286A5"
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
                        marginTop: 80,
                        marginBottom: 20
                    }}
                >Address: {'ECEB'}</Text>
                <Button
                    color={'#1A3259'}
                    onPress={openYosemiteZoomedOut}
                    title="Click To Open Maps 🏃🏻‍♂️" />
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
