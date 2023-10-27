import {View, Text, StyleSheet, Image, Button} from 'react-native';
import React from 'react';
import Close from '../../assets/close.svg';
import {TextInput} from 'react-native-gesture-handler';
import AddFolder from '../../assets/folder-add.svg';
import AddPhoto from '../../assets/Gallary.svg';
import ArrowNext from '../../assets/ArrowNext.svg';
import axios from 'axios';
import {useState} from 'react'; // Import useState from React
// import { Picker } from '@react-native-picker/picker'; // Import the Picker component
import ModalDropdown from 'react-native-modal-dropdown'; // Import the ModalDropdown component

const AddPost = () => {
  const categories = ['Category 1', 'Category 2', 'Category 3']; // Define your categories

  const [cust_id, setTitle] = useState('');
  const [title, setBody] = useState('');
  const [description, setAuthor] = useState('mario');

  const formData = new FormData();
  formData.append('cust_id', '5');
  formData.append('title', 'title'); // Assuming title is a variable holding the title value
  formData.append('description', 'body'); // Assuming body is a variable holding the body value
  formData.append('categories', '2,3');

  const handlePostRequest = (user) => {
    try {
      console.log('fsdncjdsbnic');
      // Define the data you want to send in the request body
      const postData = {
        cust_id: '5',
        title: 'Child Care Policy',
        description: 'Child Care Policy',
        categories: '2,3'
      };

      fetch('https://ce8b-137-207-232-159.ngrok-free.app/post-management/post',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: postData,
      }).then(response=>{
        console.log(response);
        console.log('Response data:', response.data);
      })
      // Make a POST request using Axios

      // Handle the response data here
    } catch (error) {
      // Handle errors here
      console.error('POST request failed:', error);
    }
  };
  // const handleSubmit = e => {
  //   e.preventDefault();

  //   fetch(
  //     'https://a6b9-2605-8d80-6a1-e59-700e-d4a6-818f-7642.ngrok-free.app/post-management/post',
  //     {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         cust_id: '123',
  //         title: 'yourOtherValue',
  //         description: 'sd',
  //         categories: '2,3',
  //       }),
  //     },
  //   );
  // };

  return (
    <View style={localStyles.root}>
      <View style={localStyles.createPostContainer}>
        <View style={localStyles.headerContainer}>
          <View style={{flexDirection: 'row', gap: 15}}>
            <View style={localStyles.greenBox} />
            <Text style={localStyles.headerStyle}>Create Post</Text>
          </View>
          {/* <View style={localStyles.closeButtonStyle}>
            <Close width={20} height={20} />
          </View> */}
        </View>
        <View style={localStyles.postContainer}>
          <Image
            source={{uri: 'https://i.pravatar.cc/300'}}
            style={{width: 50, height: 50, borderRadius: 50}}
          />
          {/* <ModalDropdown
          options={categories}
          defaultValue={selectedCategory}
          textStyle={localStyles.categoryText}
          dropdownTextStyle={localStyles.dropdownTextStyle}
          onSelect={(index, value) => setSelectedCategory(value)}
        /> */}
          <TextInput
            placeholderTextColor={'#CCCCCC'}
            placeholder="   Policy Title"
            style={localStyles.titleInput}
          />
        </View>
        <TextInput
          placeholderTextColor={'#CCCCCC'}
          placeholder="Policy description"
          style={localStyles.descriptionInput}
        />

        <View style={localStyles.footer}>
          <View style={{flexDirection: 'row', gap: 15}}>
            {/* <AddFolder width={25} height={25} />
            <AddPhoto width={25} height={25} /> */}
          </View>
          <View style={localStyles.postBtnStyle}>
            <Button title="Post" onPress={handlePostRequest("vsdvdsv")} />
            <ArrowNext width={20} height={20} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddPost;

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  createPostContainer: {
    marginHorizontal: 20,
    backgroundColor: '#FBE8E8',
    borderRadius: 16,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  greenBox: {
    width: 20,
    height: 30,
    backgroundColor: '#B5E4CA',
    borderRadius: 5,
  },
  headerStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1D1F',
  },
  closeButtonStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  titleInput: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    lineHeight: 26.21,
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  descriptionInput: {
    marginTop: 15,
    marginLeft: 35,
    fontSize: 16,
    color: 'black',
    lineHeight: 26.21,
    borderRadius: 16,
    backgroundColor: 'white',
    height: 100,
    textAlignVertical: 'top',
    padding: 10,
    paddingHorizontal: 20,
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  postBtnStyle: {
    backgroundColor: '#2a85ff80',
    borderRadius: 16,
    padding: 15,
    gap: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
