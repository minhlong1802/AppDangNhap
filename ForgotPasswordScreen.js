import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Forgot Password Screen</Text>
      {/* Add your forgot password form or content here */}
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

export default ForgotPasswordScreen;
