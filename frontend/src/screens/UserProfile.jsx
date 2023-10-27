import React from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const UserProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.editProfileText}>User Profile</Text>
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
        <View style={styles.buttonContainer}>
          <Button title="Save Changes" onPress={() => {/* Add your save function here */}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fieldContainer: {
    marginTop: 20,
  },
  header: {
    width: '100%',
    height: 60,
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 9999,
    borderWidth: 5,
    borderColor: 'white',
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
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default UserProfileScreen;
