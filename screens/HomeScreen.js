import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text} from 'react-native';

import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

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
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Timer')}>
        <Text style={styles.buttonText}>Go to Fetch Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
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

export default HomeScreen;
