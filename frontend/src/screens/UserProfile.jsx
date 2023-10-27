import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const UserProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.editProfileText}>Profile</Text>
      </View>
      <View style={styles.profileInfo}>
      <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eo_circle_blue_letter-j.svg/1024px-Eo_circle_blue_letter-j.svg.png?20200417110859',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelText}>Name</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>Edit your name</TextInput>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelText}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>example@xyz.com</TextInput>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelText}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>************</TextInput>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelText}>Date of Birth</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>23/05/1995</TextInput>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.labelText}>Country/Region</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputText}>Nigeria</TextInput>
          </View>
        </View>
        <View>
          <Button Text="Save Changes"></Button>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fieldContainer: {
    height: 40,
    marginTop: 50,
  },
  header: {
    width: '100%',
    height: 54.42,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editProfileText: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: 'black',
  },
  profileInfo: {
    position: 'relative',
    top: 54.42,
    paddingLeft: 20,
    paddingRight: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 9999,
    borderWidth: 5,
    borderColor: 'white',
  },
  nameInfo: {
    marginTop: 19.72,
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '700',
    color: 'black',
  },
  inputContainer: {
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(83.94, 76.01, 76.01, 0.14)',
    justifyContent: 'center',
    paddingLeft: 16.88,
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#544C4C',
  },
  // Define styles for Email, Password, Date of Birth, and Country/Region similarly
  inputContainer: {
    width: '100%',
    height: 39,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(83.94, 76.01, 76.01, 0.14)',
    marginTop: 19.72,
    justifyContent: 'center',
    paddingLeft: 16.88,
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    color: '#544C4C',
  },
  profileImageContainer: {
    flex: 1, // Center content vertically and horizontally
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  }
});

export default UserProfileScreen;
