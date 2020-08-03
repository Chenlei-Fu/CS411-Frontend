import React from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Text, ImageBackground} from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';
import { AntDesign } from '@expo/vector-icons';
function HomeScreen(props) {
  const {navigation} = props;
  useStatusBar('dark-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <ImageBackground
          source={require('../assets/home/Slide1.png')}
          style={styles.background}

      >
        <View style={styles.container}>
          <TouchableOpacity
              style={{backgroundColor: '#80A1B1', margin: 20, padding:6, borderRadius: 5}}
              onPress={handleSignOut}

          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <AntDesign name="logout" size={18} color="black" />
              <Text style={{marginLeft: 20}}>Sign Out</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Welcome to Ultimate Illini!</Text>
          <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('Timer')}>
            <Text style={styles.buttonText}>Incoming Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('Scheduler')}>
            <Text style={styles.buttonText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ebebeb'
  },
  text: {
    color: '#80A1B1',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:20,
    marginBottom: 40

  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  background: {
    width: '100%',
    height: '100%'
  },
})

export default HomeScreen;
