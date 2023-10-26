import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
const UserProfile = () => {
  const [profileImage, setProfileImage] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eo_circle_blue_letter-j.svg/1024px-Eo_circle_blue_letter-j.svg.png?20200417110859');
  const [selectedButton, setSelectedButton] = useState('likedPosts'); // Set 'likedPosts' as the default selected button
  
  const iconImages = {
    liked: require('./assets/likedIcon.png'),
    disliked: require('./assets/dislikedIcon.png'),
    commented: require('./assets/commentedIcon.png'),
  };
  
  const user = {
    name: 'John Doe',
    phone: '+1234567890',
    email: 'john@example.com',
    dob: '13th Aug 1995',
  };
  const handleSettingsPress = () => {
  };

  const handleLogoutPress = () => {
  };
  const handleProfileImageChange = () => {

    };

  const handleButtonSelect = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const getContentForSelectedButton = () => {
    if (selectedButton === 'likedPosts') {
      return (
        <View>
          <Text style={styles.contentText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula ipsum quis lacinia.
          </Text>
          <Text style={styles.contentText}>
            Integer nec justo vel dui euismod fermentum. Proin eu orci non est varius ultrices.
          </Text>
        </View>
      );
    } else if (selectedButton === 'dislikedPosts') {
      return (
        <View>
          <Text style={styles.contentText}>
            Cras convallis, arcu id interdum bibendum, nulla est lacinia mi, eget sollicitudin justo odio et dui.
          </Text>
          <Text style={styles.contentText}>
            Vestibulum tincidunt mi sit amet justo euismod, non tincidunt ante iaculis.
          </Text>
        </View>
      );
    } else if (selectedButton === 'commentedPosts') {
      return (
        <View>
          <Text style={styles.contentText}>
            Nunc vestibulum augue et sem fermentum, ac fermentum sapien lacinia.
          </Text>
          <Text style={styles.contentText}>
            Fusce at est in nulla fermentum accumsan eget ut velit.
          </Text>
        </View>
      );
    } else {
      return null; // No content to display when no button is selected.
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity onPress={handleProfileImageChange}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.changeProfileImageText}>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>{user.name}</Text>

      <View style={styles.userDetails}>
        <Text style={styles.detailLabel}>Phone Number:</Text>
        <Text style={styles.detailText}>{user.phone}</Text>
        <Text style={styles.detailLabel}>Email:</Text>
        <Text style={styles.detailText}>{user.email}</Text>
        <Text style={styles.detailLabel}>Date of Birth:</Text>
        <Text style={styles.detailText}>{user.dob}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => handleButtonSelect('likedPosts')}
          style={[
            styles.actionButton,
            selectedButton === 'likedPosts' ? styles.selectedButton : null,
          ]}
        >
          <Image source={iconImages.liked} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonSelect('dislikedPosts')}
          style={[
            styles.actionButton,
            selectedButton === 'dislikedPosts' ? styles.selectedButton : null,
          ]}
        >
          <Image source={iconImages.disliked} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleButtonSelect('commentedPosts')}
          style={[
            styles.actionButton,
            selectedButton === 'commentedPosts' ? styles.selectedButton : null,
          ]}
        >
          <Image source={iconImages.commented} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>{getContentForSelectedButton()}</View>
      <View style={styles.horizontalButtonContainer}>
        <TouchableOpacity onPress={handleSettingsPress} style={styles.horizontalButton}>
          <Text style={styles.horizontalButtonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogoutPress} style={styles.horizontalButton}>
          <Text style={styles.horizontalButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },  
  changeProfileImageText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#3498db',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userDetails: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3498db',
    color: 'black',
    borderRadius: 5,
    margin: 5,
  },
  // buttonText: {
  //   textAlign: 'center',
  //   color: 'black',
  //   fontWeight: 'bold',
  // },
  // buttonTextForLike: {
  //   textAlign: 'center',
  //   marginTop:8,
  //   color: 'black',
  //   fontWeight: 'bold',
  // },
  selectedButton: {
    backgroundColor: '#b2b8c2', // Highlight color for selected button
  },
  contentContainer: {
    backgroundColor: '#d0d4db',
    padding: 20,
    borderRadius: 10,
    borderColor:'black',
    margin: 10,
  },
  contentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // contentText: {
  //   color:'black',
  //   fontSize: 16,
  //   marginBottom: 10,
  // },
  likedPosts: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 10,
  },
  icon: {
    marginLeft:27,
    width: 30, // Adjust the width and height to fit icons
    height: 32,
  },
  horizontalButtonContainer: {
    flexDirection: 'row', // Display buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
    marginTop: 10,
  },
  horizontalButton: {
    flex: 1, // Each button takes equal space
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  horizontalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;

