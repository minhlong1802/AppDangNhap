import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, Alert, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (password === '1') {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('username', username);
      navigation.replace('Profile');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems:'center', marginBottom:20}}><Text style={{fontSize:20, fontWeight:'bold'}}>Login</Text></View>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '100%' }}>
        <Text style={{ color: 'orange' }} onPress={() => navigation.navigate('ForgotPasswordScreen')}>Forgot Password?</Text>
      </View>
      <TouchableOpacity style={styles.buttonlogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={{alignItems:'center', marginTop:20}}><Text style={{fontWeight:'bold'}}>Or login with</Text></View>
      <View style={styles.iconContainer}>
        <IconButton name="google" />
        <IconButton name="facebook" />
      </View>
      <View style={{justifyContent:'center', marginTop:20, flexDirection:'row'}}>
        <Text>Not yet a member?</Text>
        <Text style={{color:'orange', marginLeft:10}} onPress={() => navigation.navigate('SignUpScreen')}>SignUp</Text>  
      </View>
    </SafeAreaView>
  );
};

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
    };
    getUsername();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('username');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container1}>
      <Text style={styles.hellotext}>Hello {username}</Text>
      <Text>This is profile about {username}.</Text>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const IconButton = ({ name }) => {
  const iconMap = {
    google: 'google',
    facebook: 'facebook'
  };
  const colorMap = {
    google: '#DB4437',
    facebook: '#3b5998'
  };

  return (
    <TouchableOpacity style={[styles.iconButton, { backgroundColor: colorMap[name] }]}>
      <MaterialCommunityIcons name={iconMap[name]} size={24} color="white" />
      <Text style={styles.iconButtonText}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem('isLoggedIn');
      setIsLoggedIn(loginStatus === 'true');
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // or a loading screen if needed
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Profile' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }}/>      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    padding: 16,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    marginTop: 12,
    borderRadius: 5,
  },
  buttonlogin: {
    width: '100%',
    height: 40,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 12,
  },
  buttonLogout: {
    width: 100,
    height: 40,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hellotext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%'
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    width: '45%',
  },
  iconButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  }
});

export default App;
