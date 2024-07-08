import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const SignUpScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SignUp Screen</Text>
      {/* Add your signup form or content here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default SignUpScreen;
